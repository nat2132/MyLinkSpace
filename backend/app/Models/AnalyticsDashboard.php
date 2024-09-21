<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class AnalyticsDashboard extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'last_updated_at',
    ];

    protected $dates = [
        'last_updated_at',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function reports()
    {
        return $this->hasMany(AnalyticsReport::class);
    }

    // Get total clicks/visits for a given time range
    public function getTotalClicks($startDate, $endDate)
    {
        return $this->reports()
            ->whereBetween('date', [$startDate, $endDate])
            ->sum('total_clicks');
    }

    // Get clicks per link for a given time range
    public function getClicksPerLink($startDate, $endDate)
    {
        return $this->reports()
            ->whereBetween('date', [$startDate, $endDate])
            ->selectRaw('link_id, SUM(clicks) as total_clicks')
            ->groupBy('link_id')
            ->get();
    }

    // Calculate Click-Through Rate (CTR) for a given time range
    public function getCTR($startDate, $endDate)
    {
        $totalClicks = $this->getTotalClicks($startDate, $endDate);
        $totalViews = $this->reports()
            ->whereBetween('date', [$startDate, $endDate])
            ->sum('views');

        return $totalViews > 0 ? ($totalClicks / $totalViews) * 100 : 0;
    }

    // Get most popular link for a given time range
    public function getMostPopularLink($startDate, $endDate)
    {
        return $this->getClicksPerLink($startDate, $endDate)
            ->sortByDesc('total_clicks')
            ->first();
    }

    // Get time of day performance
    public function getTimeOfDayPerformance($startDate, $endDate)
    {
        return $this->reports()
            ->whereBetween('date', [$startDate, $endDate])
            ->selectRaw('HOUR(created_at) as hour, SUM(total_clicks) as clicks')
            ->groupBy('hour')
            ->orderBy('hour')
            ->get();
    }

    // Get daily/weekly/monthly performance
    public function getPerformanceOverTime($startDate, $endDate, $groupBy = 'day')
    {
        $groupByClause = match ($groupBy) {
            'week' => 'YEARWEEK(date)',
            'month' => 'DATE_FORMAT(date, "%Y-%m")',
            default => 'date',
        };

        return $this->reports()
            ->whereBetween('date', [$startDate, $endDate])
            ->selectRaw("$groupByClause as period, SUM(total_clicks) as clicks")
            ->groupBy('period')
            ->orderBy('period')
            ->get();
    }

    // Get real-time clicks (last hour)
    public function getRealTimeClicks()
    {
        $lastHour = Carbon::now()->subHour();
        return $this->reports()
            ->where('created_at', '>=', $lastHour)
            ->sum('total_clicks');
    }

    // Get top performing links
    public function getTopPerformingLinks($limit = 5)
    {
        return $this->getClicksPerLink(Carbon::now()->subMonth(), Carbon::now())
            ->sortByDesc('total_clicks')
            ->take($limit);
    }

    // Get low performing links
    public function getLowPerformingLinks($threshold = 5)
    {
        return $this->getClicksPerLink(Carbon::now()->subMonth(), Carbon::now())
            ->where('total_clicks', '<', $threshold);
    }

    // Calculate bounce rate
    public function getBounceRate($startDate, $endDate)
    {
        $totalSessions = $this->reports()
            ->whereBetween('date', [$startDate, $endDate])
            ->sum('sessions');
        $bouncedSessions = $this->reports()
            ->whereBetween('date', [$startDate, $endDate])
            ->sum('bounced_sessions');

        return $totalSessions > 0 ? ($bouncedSessions / $totalSessions) * 100 : 0;
    }

    // Get return visitors
    public function getReturnVisitors($startDate, $endDate)
    {
        return $this->reports()
            ->whereBetween('date', [$startDate, $endDate])
            ->sum('return_visitors');
    }

    // Calculate engagement rate
    public function getEngagementRate($startDate, $endDate)
    {
        $totalSessions = $this->reports()
            ->whereBetween('date', [$startDate, $endDate])
            ->sum('sessions');
        $engagedSessions = $this->reports()
            ->whereBetween('date', [$startDate, $endDate])
            ->sum('engaged_sessions');

        return $totalSessions > 0 ? ($engagedSessions / $totalSessions) * 100 : 0;
    }

    // Check if a milestone has been reached
    public function checkMilestone($milestone)
    {
        $totalClicks = $this->getTotalClicks(Carbon::now()->subYear(), Carbon::now());
        return $totalClicks >= $milestone;
    }

    // Compare current period with previous period
    public function comparePeriods($currentStart, $currentEnd)
    {
        $currentClicks = $this->getTotalClicks($currentStart, $currentEnd);
        $previousStart = (new Carbon($currentStart))->subDays($currentEnd->diffInDays($currentStart));
        $previousClicks = $this->getTotalClicks($previousStart, $currentStart);

        return [
            'current' => $currentClicks,
            'previous' => $previousClicks,
            'change' => $previousClicks > 0 ? (($currentClicks - $previousClicks) / $previousClicks) * 100 : 0,
        ];
    }
}
