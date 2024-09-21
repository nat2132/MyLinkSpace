<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class AnalyticsReport extends Model
{
    use HasFactory;

    protected $fillable = [
        'analytics_dashboard_id',
        'date',
        'total_clicks',
        'total_views',
        'unique_visitors',
        'return_visitors',
        'average_session_duration',
        'bounce_rate',
        'top_referrers',
        'top_locations',
        'device_breakdown',
    ];

    protected $casts = [
        'date' => 'date',
        'top_referrers' => 'array',
        'top_locations' => 'array',
        'device_breakdown' => 'array',
    ];

    public function dashboard()
    {
        return $this->belongsTo(AnalyticsDashboard::class, 'analytics_dashboard_id');
    }

    public function linkClicks()
    {
        return $this->hasMany(LinkClick::class);
    }

    // Scope to get reports within a date range
    public function scopeWithinDateRange($query, $startDate, $endDate)
    {
        return $query->whereBetween('date', [$startDate, $endDate]);
    }

    // Get total clicks for a specific date range
    public static function getTotalClicks($dashboardId, $startDate, $endDate)
    {
        return static::where('analytics_dashboard_id', $dashboardId)
            ->withinDateRange($startDate, $endDate)
            ->sum('total_clicks');
    }

    // Get total views for a specific date range
    public static function getTotalViews($dashboardId, $startDate, $endDate)
    {
        return static::where('analytics_dashboard_id', $dashboardId)
            ->withinDateRange($startDate, $endDate)
            ->sum('total_views');
    }

    // Calculate CTR for a specific date range
    public static function getCTR($dashboardId, $startDate, $endDate)
    {
        $totalClicks = static::getTotalClicks($dashboardId, $startDate, $endDate);
        $totalViews = static::getTotalViews($dashboardId, $startDate, $endDate);

        return $totalViews > 0 ? ($totalClicks / $totalViews) * 100 : 0;
    }

    // Get average bounce rate for a specific date range
    public static function getAverageBounceRate($dashboardId, $startDate, $endDate)
    {
        return static::where('analytics_dashboard_id', $dashboardId)
            ->withinDateRange($startDate, $endDate)
            ->avg('bounce_rate');
    }

    // Get top referrers for a specific date range
    public static function getTopReferrers($dashboardId, $startDate, $endDate, $limit = 5)
    {
        return static::where('analytics_dashboard_id', $dashboardId)
            ->withinDateRange($startDate, $endDate)
            ->get()
            ->flatMap(function ($report) {
                return $report->top_referrers;
            })
            ->groupBy('domain')
            ->map(function ($group) {
                return $group->sum('count');
            })
            ->sortDesc()
            ->take($limit);
    }

    // Get device breakdown for a specific date range
    public static function getDeviceBreakdown($dashboardId, $startDate, $endDate)
    {
        return static::where('analytics_dashboard_id', $dashboardId)
            ->withinDateRange($startDate, $endDate)
            ->get()
            ->flatMap(function ($report) {
                return $report->device_breakdown;
            })
            ->groupBy('device')
            ->map(function ($group) {
                return $group->sum('count');
            });
    }

    // Create or update a daily report
    public static function createOrUpdateDailyReport($dashboardId, $date, $data)
    {
        return static::updateOrCreate(
            ['analytics_dashboard_id' => $dashboardId, 'date' => $date],
            $data
        );
    }

    // Get daily performance for a specific date range
    public static function getDailyPerformance($dashboardId, $startDate, $endDate)
    {
        return static::where('analytics_dashboard_id', $dashboardId)
            ->withinDateRange($startDate, $endDate)
            ->orderBy('date')
            ->get(['date', 'total_clicks', 'total_views']);
    }

    // Get unique visitors count for a specific date range
    public static function getUniqueVisitors($dashboardId, $startDate, $endDate)
    {
        return static::where('analytics_dashboard_id', $dashboardId)
            ->withinDateRange($startDate, $endDate)
            ->sum('unique_visitors');
    }

    // Get return visitors count for a specific date range
    public static function getReturnVisitors($dashboardId, $startDate, $endDate)
    {
        return static::where('analytics_dashboard_id', $dashboardId)
            ->withinDateRange($startDate, $endDate)
            ->sum('return_visitors');
    }
}