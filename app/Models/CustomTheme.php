<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CustomTheme extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'background_color',
        'text_color',
        'button_color',
        'button_text_color',
        'font_family',
        'custom_css',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function profile()
    {
        return $this->hasOne(Profile::class);
    }

    public function scopeRecent($query, $limit = 10)
    {
        return $query->orderBy('created_at', 'desc')->limit($limit);
    }

    public function applyToProfile(Profile $profile)
    {
        $profile->update(['custom_theme_id' => $this->id]);
    }

    public function getPreviewData()
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'background_color' => $this->background_color,
            'text_color' => $this->text_color,
            'button_color' => $this->button_color,
            'button_text_color' => $this->button_text_color,
            'font_family' => $this->font_family,
        ];
    }

    public function generateCSS()
    {
        $css = "
            body {
                background-color: {$this->background_color};
                color: {$this->text_color};
                font-family: {$this->font_family}, sans-serif;
            }
            .button {
                background-color: {$this->button_color};
                color: {$this->button_text_color};
            }
        ";

        return $css . $this->custom_css;
    }
}
