<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class LinkClick extends Model
{
    use HasFactory;

    protected $fillable = [
        'link_id',
        'ip_address',
        'user_agent',
        'referrer',
        'country',
        'city',
        'device_type',
        'browser',
    ];

    public function link()
    {
        return $this->belongsTo(Link::class);
    }

    // Scope to get clicks within a specific date range
    public function scopeWithinDateRange($query, $startDate, $endDate)
    {
        return $query->whereBetween('created_at', [$startDate, $endDate]);
    }

    // Get total clicks for a specific link
    public static function getTotalClicks($linkId)
    {
        return static::where('link_id', $linkId)->count();
    }

    // Get unique clicks for a specific link
    public static function getUniqueClicks($linkId)
    {
        return static::where('link_id', $linkId)->distinct('ip_address')->count('ip_address');
    }

    // Get clicks by country for a specific link
    public static function getClicksByCountry($linkId)
    {
        return static::where('link_id', $linkId)
            ->select('country', DB::raw('count(*) as total'))
            ->groupBy('country')
            ->orderByDesc('total')
            ->get();
    }

    // Get clicks by device type for a specific link
    public static function getClicksByDeviceType($linkId)
    {
        return static::where('link_id', $linkId)
            ->select('device_type', DB::raw('count(*) as total'))
            ->groupBy('device_type')
            ->orderByDesc('total')
            ->get();
    }

    // Get clicks by browser for a specific link
    public static function getClicksByBrowser($linkId)
    {
        return static::where('link_id', $linkId)
            ->select('browser', DB::raw('count(*) as total'))
            ->groupBy('browser')
            ->orderByDesc('total')
            ->get();
    }

    // Get clicks over time for a specific link
    public static function getClicksOverTime($linkId, $startDate, $endDate, $groupBy = 'day')
    {
        $groupByClause = match ($groupBy) {
            'week' => 'YEARWEEK(created_at)',
            'month' => 'DATE_FORMAT(created_at, "%Y-%m")',
            default => 'DATE(created_at)',
        };

        return static::where('link_id', $linkId)
            ->withinDateRange($startDate, $endDate)
            ->select(DB::raw("$groupByClause as period"), DB::raw('count(*) as total'))
            ->groupBy('period')
            ->orderBy('period')
            ->get();
    }

    // Record a new link click
    public static function recordClick($linkId, $data)
    {
        return static::create(array_merge(['link_id' => $linkId], $data));
    }

    // Get top referrers for a specific link
    public static function getTopReferrers($linkId, $limit = 5)
    {
        return static::where('link_id', $linkId)
            ->select('referrer', DB::raw('count(*) as total'))
            ->groupBy('referrer')
            ->orderByDesc('total')
            ->limit($limit)
            ->get();
    }

    // Get click-through rate (CTR) for a specific link and date range
    public static function getCTR($linkId, $startDate, $endDate)
    {
        $clicks = static::where('link_id', $linkId)
            ->withinDateRange($startDate, $endDate)
            ->count();

        $views = ProfileView::where('profile_id', function ($query) use ($linkId) {
            $query->select('profile_id')
                ->from('links')
                ->where('id', $linkId);
        })->withinDateRange($startDate, $endDate)
          ->count();

        return $views > 0 ? ($clicks / $views) * 100 : 0;
    }
}