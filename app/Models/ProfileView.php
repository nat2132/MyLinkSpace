<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class ProfileView extends Model
{
    use HasFactory;

    protected $fillable = [

        'profile_id',
        'ip_address',
        'user_agent',
        'referrer',
        'user_id',
        'viewed_at',
    ];


        
    // Relationship to User model
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Relationship to Profile model

    public function profile()
    {
        return $this->belongsTo(Profile::class);
    }


    // Scope to get views within a specific date range
    public function scopeWithinDateRange($query, $startDate, $endDate)
    {
        return $query->whereBetween('created_at', [$startDate, $endDate]);
    }

    // Scope to get unique views (by IP address)
    public function scopeUnique($query)
    {
        return $query->groupBy('ip_address');
    }

    // Get view count for a specific profile
    public static function getViewCount($profileId)
    {
        return static::where('profile_id', $profileId)->count();
    }

    // Get unique view count for a specific profile
    public static function getUniqueViewCount($profileId)
    {
        return static::where('profile_id', $profileId)->distinct('ip_address')->count('ip_address');
    }

    // Get daily view counts for a specific profile within a date range
    public static function getDailyViewCounts($profileId, $startDate, $endDate)
    {
        return static::where('profile_id', $profileId)
            ->whereBetween('created_at', [$startDate, $endDate])
            ->groupBy(DB::raw('DATE(created_at)'))
            ->select(DB::raw('DATE(created_at) as date'), DB::raw('COUNT(*) as count'))
            ->get();
    }

    // Record a new profile view
    public static function recordView($profileId, $ipAddress, $userAgent, $referrer)
    {
        return static::create([
            'profile_id' => $profileId,
            'ip_address' => $ipAddress,
            'user_agent' => $userAgent,
            'referrer' => $referrer,
        ]);
    }
}



