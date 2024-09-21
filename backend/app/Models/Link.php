<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;


class Link extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',

        'profile_id',
        'title',
        'url',
        'thumbnail_url',
        'is_active',
        'order',
        'click_count',
        'expiration_date',
        
        'start_time',
        'end_time',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'expiration_date' => 'datetime',
    ];

    // Scope for active links
    public function scopeActive($query)
    {
        return $query->where('is_active', true)
                     ->where(function ($q) {
                         $q->whereNull('expiration_date')
                           ->orWhere('expiration_date', '>', now());
                     });
    }

    // Scope for ordered links
    public function scopeOrdered($query)
    {
        return $query->orderBy('order');
    }

    // Generate a short URL
    public function generateShortUrl()
    {
        $this->short_url = Str::random(8);
        $this->save();
    }

    // Increment click count
    public function incrementClickCount()
    {
        $this->increment('click_count');
    }

    // Check if the link is expired
    public function isExpired()
    {
        return $this->expiration_date && $this->expiration_date->isPast();
    }

    // Get click count for a specific date range
    public function getClickCountForDateRange($startDate, $endDate)
    {
        return $this->linkClicks()
                    ->whereBetween('created_at', [$startDate, $endDate])
                    ->count();
    }

    // Get link data for API
    public function getLinkData()
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'url' => $this->url,
            'thumbnail_url' => $this->thumbnail_url,
            'is_active' => $this->is_active,
            'order' => $this->order,
            'click_count' => $this->click_count,
            'short_url' => $this->short_url,
        ];
    }

    // Toggle link active status
    public function toggleActive()
    {
        $this->is_active = !$this->is_active;
        $this->save();
    }

    // Update link order
    public function updateOrder($newOrder)
    {
        $this->order = $newOrder;
        $this->save();
    }

    // Get click-through rate (CTR) for a specific date range
    public function getCTRForDateRange($startDate, $endDate)
    {
        $clicks = $this->getClickCountForDateRange($startDate, $endDate);
        $views = $this->profile->getViewCountForDateRange($startDate, $endDate);
        
        return $views > 0 ? ($clicks / $views) * 100 : 0;
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
    
    public function profile()
    {
        return $this->belongsTo(Profile::class);
    }

    public function linkClicks()
    {
        return $this->hasMany(LinkClick::class);
    }

}
