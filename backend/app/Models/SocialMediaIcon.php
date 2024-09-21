<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SocialMediaIcon extends Model
{
    use HasFactory;

    protected $fillable = [
        'platform',
        'icon_url',
        'display_name',
        'profile_url',
        'order',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function profile()
    {
        return $this->belongsTo(Profile::class);
    }

    // Scope to order icons
    public function scopeOrdered($query)
    {
        return $query->orderBy('order');
    }

    // Scope to get active icons
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    // Custom method to get icon data
    public function getIconData()
    {
        return [
            'id' => $this->id,
            'platform' => $this->platform,
            'icon_url' => $this->icon_url,
            'display_name' => $this->display_name,
            'profile_url' => $this->profile_url,
        ];
    }

    // Custom method to toggle icon visibility
    public function toggleVisibility()
    {
        $this->is_active = !$this->is_active;
        $this->save();
    }

    // Custom method to update icon order
    public function updateOrder($newOrder)
    {
        $this->order = $newOrder;
        $this->save();
    }
}