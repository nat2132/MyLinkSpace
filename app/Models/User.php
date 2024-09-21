<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'username',
        'email',
        'password',
        'name',
        'google_id',
        'facebook_id', // Add this line
        'is_premium',
        'max_links',
        'bio',
        'avatar',
        'theme_id',
        'custom_domain',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
        'is_premium' => 'boolean',
        'max_links' => 'integer',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function links()
    {
        return $this->hasMany(Link::class);
    }

    public function profiles()
    {
        return $this->hasMany(Profile::class);
    }

    public function subscriptions()
    {
        return $this->hasMany(Subscription::class);
    }

    public function socialMediaIcons()
    {
        return $this->hasMany(SocialMediaIcon::class);
    }

    public function qrCodes()
    {
        return $this->hasMany(QRCode::class);
    }

    public function notifications()
    {
        return $this->hasMany(Notification::class);
    }

    public function analyticsDashboards()
    {
        return $this->hasMany(AnalyticsDashboard::class);
    }

    public function customThemes()
    {
        return $this->hasMany(CustomTheme::class);
    }

    public function linkClicks()
    {
        return $this->hasManyThrough(LinkClick::class, Link::class);
    }

    public function profileViews()
    {
        return $this->hasManyThrough(ProfileView::class, Profile::class);
    }

    public function theme()
    {
        return $this->belongsTo(Theme::class);
    }

    public function activeLinks()
    {
        return $this->links()->where('is_active', true)->orderBy('order');
    }

    public function getPublicProfileUrl()
    {
        return $this->custom_domain ?? route('profile.show', $this->username);
    }

    public function canAddMoreLinks()
    {
        return $this->links()->count() < $this->max_links;
    }

    public function isSubscribed()
    {
        return $this->subscriptions()->where('status', 'active')->exists();
    }

    public function getLatestAnalytics($days = 30)
    {
        $endDate = now();
        $startDate = $endDate->copy()->subDays($days);

        return [
            'profile_views' => $this->profileViews()->whereBetween('created_at', [$startDate, $endDate])->count(),
            'link_clicks' => $this->linkClicks()->whereBetween('created_at', [$startDate, $endDate])->count(),
        ];
    }

    public function isGoogleUser()
    {
        return !is_null($this->google_id);
    }

    public function isFacebookUser()
    {
        return !is_null($this->facebook_id);
    }

    public function isSocialUser()
    {
        return $this->isGoogleUser() || $this->isFacebookUser();
    }

    public function getAuthProvider()
    {
        if ($this->isGoogleUser()) {
            return 'Google';
        } elseif ($this->isFacebookUser()) {
            return 'Facebook';
        } else {
            return 'Email';
        }
    }
}