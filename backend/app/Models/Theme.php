<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Theme extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'background_color',
        'text_color',
        'button_color',
        'button_text_color',
    ];

    public function profiles()
    {
        return $this->hasMany(Profile::class);
    }

    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    // Scope to get popular themes
    public function scopePopular($query, $limit = 10)
    {
        return $query->withCount('profiles')
                     ->orderBy('profiles_count', 'desc')
                     ->limit($limit);
    }

    // Custom method to get theme preview data
    public function getPreviewData()
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'background_color' => $this->background_color,
            'text_color' => $this->text_color,
            'button_color' => $this->button_color,
            'button_text_color' => $this->button_text_color,
        ];
    }
}