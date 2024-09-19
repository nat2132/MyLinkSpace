<?php

namespace App\Http\Controllers;

use App\Models\ProfileView;
use App\Models\Profile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProfileViewController extends Controller
{
    public function recordView(Request $request, $username)
    {
        $profile = Profile::where('username', $username)->firstOrFail();
        
        $view = ProfileView::recordView(
            $profile->id,
            $request->ip(),
            $request->userAgent(),
            $request->header('referer')
        );

        return response()->json(['message' => 'View recorded successfully']);
    }

    public function getViewCount($username)
    {
        $profile = Profile::where('username', $username)->firstOrFail();
        $viewCount = ProfileView::getViewCount($profile->id);

        return response()->json(['view_count' => $viewCount]);
    }

    public function getUniqueViewCount($username)
    {
        $profile = Profile::where('username', $username)->firstOrFail();
        $uniqueViewCount = ProfileView::getUniqueViewCount($profile->id);

        return response()->json(['unique_view_count' => $uniqueViewCount]);
    }

    public function getDailyViewCounts(Request $request, $username)
    {
        $profile = Profile::where('username', $username)->firstOrFail();
        
        $request->validate([
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
        ]);

        $dailyViewCounts = ProfileView::getDailyViewCounts(
            $profile->id,
            $request->start_date,
            $request->end_date
        );

        return response()->json($dailyViewCounts);
    }

    public function getViewsWithinDateRange(Request $request, $username)
    {
        $profile = Profile::where('username', $username)->firstOrFail();
        
        $request->validate([
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
        ]);

        $views = ProfileView::where('profile_id', $profile->id)
            ->withinDateRange($request->start_date, $request->end_date)
            ->get();

        return response()->json($views);
    }

    public function getUniqueViewsWithinDateRange(Request $request, $username)
    {
        $profile = Profile::where('username', $username)->firstOrFail();
        
        $request->validate([
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
        ]);

        $uniqueViews = ProfileView::where('profile_id', $profile->id)
            ->withinDateRange($request->start_date, $request->end_date)
            ->unique()
            ->get();

        return response()->json($uniqueViews);
    }
}
