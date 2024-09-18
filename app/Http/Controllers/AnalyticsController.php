<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Models\User;
use App\Models\LinkClick;
use App\Models\ProfileView;
use Illuminate\Http\Request;
use PhpOffice\PhpWord\PhpWord;
use PhpOffice\PhpWord\IOFactory;
use Illuminate\Support\Facades\DB;
use App\Notifications\PerformanceNotification;

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
         
           // Notify the user
        $user = User::find($userId);
        $user->notify(new PerformanceNotification($topLinks, $bottomLinks));    
        
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

    public function exportWordReport(Request $request, $userId)
    {
        // Check if user is premium
        $user = auth()->user(); // Assuming you have user authentication
        if (!$user->is_premium) {
            return response()->json(['message' => 'This feature is available for premium users only.'], 403);
        }

        // Validate date filters
        $request->validate([
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
        ]);

        $startDate = $request->input('start_date');
        $endDate = $request->input('end_date');

        // Gather analytics data
        $clicks = LinkClick::where('user_id', $userId)
            ->whereBetween('clicked_at', [$startDate, $endDate])
            ->get();

        $views = ProfileView::where('user_id', $userId)
            ->whereBetween('viewed_at', [$startDate, $endDate])
            ->get();

        // Create a new Word document
        $phpWord = new PhpWord();
        $section = $phpWord->addSection();

        // Add title
        $section->addTitle('Analytics Report', 1);
        $section->addText('Report Period: ' . $startDate . ' to ' . $endDate);
        $section->addTextBreak(1);

        // Add link clicks section
        $section->addTitle('Link Clicks', 2);
        if ($clicks->isEmpty()) {
            $section->addText('No clicks recorded during this period.');
        } else {
            foreach ($clicks as $click) {
                $section->addText('Link ID: ' . $click->link_id);
                $section->addText('User ID: ' . $click->user_id);
                $section->addText('User Agent: ' . $click->user_agent);
                $section->addText('Clicked At: ' . $click->clicked_at);
                $section->addTextBreak(1);
            }
        }

        // Add profile views section
        $section->addTitle('Profile Views', 2);
        if ($views->isEmpty()) {
            $section->addText('No views recorded during this period.');
        } else {
            foreach ($views as $view) {
                $section->addText('Profile ID: ' . $view->profile_id);
                $section->addText('User ID: ' . $view->user_id);
                $section->addText('User Agent: ' . $view->user_agent);
                $section->addText('Viewed At: ' . $view->viewed_at);
                $section->addTextBreak(1);
            }
        }

        // Save the Word document
        $fileName = 'analytics_report_' . $userId . '_' . date('YmdHis') . '.docx';
        $filePath = storage_path($fileName);

        $phpWord->save($filePath, 'Word2007');

        // Return the file as a response
        return response()->download($filePath)->deleteFileAfterSend(true);
    }
}
