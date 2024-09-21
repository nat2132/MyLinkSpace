<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;
use SimpleSoftwareIO\QrCode\Facades\QrCode as QrCodeGenerator;

class QRCode extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'profile_id',
        'type',
        'data',
        'size',
        'color',
        'background_color',
        'logo_path',
        'error_correction',
        'unique_id',
    ];

    protected $casts = [
        'data' => 'array',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function profile()
    {
        return $this->belongsTo(Profile::class);
    }

    // Generate a unique ID for the QR code
    public static function generateUniqueId()
    {
        $uniqueId = Str::random(10);
        while (static::where('unique_id', $uniqueId)->exists()) {
            $uniqueId = Str::random(10);
        }
        return $uniqueId;
    }

    // Generate QR code image
    public function generateQrCode()
    {
        $qrCode = QrCodeGenerator::format('png')
            ->size($this->size)
            ->color($this->color)
            ->backgroundColor($this->background_color)
            ->errorCorrection($this->error_correction)
            ->generate($this->getQrCodeData());

        $filename = 'qrcode_' . $this->unique_id . '.png';
        $path = 'qrcodes/' . $filename;

        \Storage::disk('public')->put($path, $qrCode);

        $this->image_path = $path;
        $this->save();

        return $path;
    }

    // Get QR code data based on type
    protected function getQrCodeData()
    {
        switch ($this->type) {
            case 'profile':
                return route('profile.show', $this->profile->username);
            case 'link':
                return $this->data['url'];
            case 'vcard':
                return $this->generateVCardData();
            default:
                return json_encode($this->data);
        }
    }

    // Generate vCard data
    protected function generateVCardData()
    {
        $vcard = "BEGIN:VCARD\nVERSION:3.0\n";
        $vcard .= "N:{$this->data['lastname']};{$this->data['firstname']};;;\n";
        $vcard .= "FN:{$this->data['firstname']} {$this->data['lastname']}\n";
        $vcard .= "TEL;TYPE=CELL:{$this->data['phone']}\n";
        $vcard .= "EMAIL:{$this->data['email']}\n";
        $vcard .= "END:VCARD";
        return $vcard;
    }

    // Get QR code image URL
    public function getImageUrl()
    {
        return $this->image_path ? \Storage::url($this->image_path) : null;
    }

    // Scope for QR codes by type
    public function scopeOfType($query, $type)
    {
        return $query->where('type', $type);
    }

    // Get QR code data for API
    public function getApiData()
    {
        return [
            'id' => $this->id,
            'type' => $this->type,
            'unique_id' => $this->unique_id,
            'image_url' => $this->getImageUrl(),
            'created_at' => $this->created_at->toDateTimeString(),
        ];
    }

    // Regenerate QR code with new settings
    public function regenerate($attributes = [])
    {
        $this->fill($attributes);
        $this->save();
        return $this->generateQrCode();
    }

    // Delete QR code image
    public function deleteImage()
    {
        if ($this->image_path) {
            \Storage::disk('public')->delete($this->image_path);
            $this->image_path = null;
            $this->save();
        }
    }
}
