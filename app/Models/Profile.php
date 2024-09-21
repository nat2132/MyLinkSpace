<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Profile extends Model
{
    use HasFactory;

    protected $fillable = [

        'username',
        'title',
        'bio',
        'avatar_url',
        'theme_id',
        'custom_theme_id',
        'is_public',
        'user_id',
        'profile_id',
        'user_agent',
        'viewed_at',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function theme()
    {
        return $this->belongsTo(Theme::class);
    }

    public function customTheme()
    {
        return $this->belongsTo(CustomTheme::class);
    }

    public function profileViews()
    {
        return $this->hasMany(ProfileView::class);
    }

    public function links()
    {
        return $this->hasMany(Link::class)->orderBy('order');
    }

    public function socialMediaIcons()
    {
        return $this->hasMany(SocialMediaIcon::class)->orderBy('order');
    }

    // Generate a unique username
    public function generateUniqueUsername($name)
    {
        $username = Str::slug($name);
        $count = 2;
        while (static::where('username', $username)->exists()) {
            $username = Str::slug($name) . '-' . $count;
            $count++;
        }
        return $username;
    }

    // Get the current theme (custom or default)
    public function getCurrentTheme()
    {
        return $this->customTheme ?? $this->theme;
    }

    // Increment view count
    public function incrementViews()
    {
        $this->views_count++;
        $this->save();
    }

    // Scope to get public profiles
    public function scopePublic($query)
    {
        return $query->where('is_public', true);
    }

    // Get profile data for API
    public function getProfileData()
    {
        return [
            'username' => $this->username,
            'title' => $this->title,
            'bio' => $this->bio,
            'avatar_url' => $this->avatar_url,
            'theme' => $this->getCurrentTheme()->getPreviewData(),
            'links' => $this->links->map->getlinkData(),
            'social_media_icons' => $this->socialMediaIcons->map->getIconData(),
        ];
    }

}
