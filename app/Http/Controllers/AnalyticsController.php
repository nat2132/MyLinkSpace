<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;use Carbon\Carbon;
use App\Models\LinkClick;
use App\Models\ProfileView;
use Illuminate\Http\Request;

class AnalyticsController extends Controller
{
    // Get total clicks for all links
    public function totalClicks($userId)
    {
        return LinkClick::where('user_id', $userId)->count();
    }

    // Get clicks per link
    public function clicksPerLink($userId)
    {
        return LinkClick::select('link_id', DB::raw('count(*) as total_clicks'))
            ->where('user_id', $userId)
            ->groupBy('link_id')
            ->get();
    }

    // Performance metrics
    public function performance($userId)
    {
        $weeklyClicks = LinkClick::where('user_id', $userId)
            ->where('clicked_at', '>=', Carbon::now()->subWeek())
            ->count();

        $monthlyClicks = LinkClick::where('user_id', $userId)
            ->where('clicked_at', '>=', Carbon::now()->subMonth())
            ->count();

        $dailyClicks = LinkClick::where('user_id', $userId)
            ->where('clicked_at', '>=', Carbon::now()->subDay())
            ->count();

        return response()->json([
            'daily_clicks' => $dailyClicks,
            'weekly_clicks' => $weeklyClicks,
            'monthly_clicks' => $monthlyClicks,
        ]);
    }

    // Top and bottom performing links
    public function topAndBottomLinks($userId)
    {
        $topLinks = LinkClick::select('link_id', DB::raw('count(*) as total_clicks'))
            ->where('user_id', $userId)
            ->groupBy('link_id')
            ->orderBy('total_clicks', 'desc')
            ->take(5)
            ->get();

        $bottomLinks = LinkClick::select('link_id', DB::raw('count(*) as total_clicks'))
            ->where('user_id', $userId)
            ->groupBy('link_id')
            ->orderBy('total_clicks', 'asc')
            ->take(5)
            ->get();

        return response()->json([
            'top_links' => $topLinks,
            'bottom_links' => $bottomLinks,
        ]);
    }

    // Bounce Rate
    public function bounceRate($userId)
    {
        $totalViews = ProfileView::where('user_id', $userId)->count();
        $totalClicks = LinkClick::where('user_id', $userId)->count();
        
        $bounceRate = $totalViews > 0 ? (($totalViews - $totalClicks) / $totalViews) * 100 : 0;

        return response()->json(['bounce_rate' => $bounceRate]);
    }

    // Return Visitors
    public function returnVisitors($userId)
    {
        // Assuming you have a mechanism to identify repeat visits, this is a placeholder
        $totalViews = ProfileView::where('user_id', $userId)
            ->distinct('user_agent')
            ->count();

        return response()->json(['return_visitors' => $totalViews]);
    }

    // Engagement Rate
    public function engagementRate($userId)
    {
        $totalViews = ProfileView::where('user_id', $userId)->count();
        $totalInteractions = LinkClick::where('user_id', $userId)->count() + $totalViews;

        $engagementRate = $totalInteractions > 0 ? ($totalInteractions / $totalViews) * 100 : 0;

        return response()->json(['engagement_rate' => $engagementRate]);
    }
}
