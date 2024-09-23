<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function show(User $user)
    {
        \Log::info('Attempting to view user: ' . $user->id);
        \Log::info('Authenticated user: ' . (Auth::check() ? Auth::id() : 'Not authenticated'));

        try {
            $this->authorize('view', $user);
            return response()->json($user);
        } catch (\Exception $e) {
            \Log::error('Authorization failed: ' . $e->getMessage());
            throw $e;
        }
    }

    public function update(Request $request, User $user)
    {
        $this->authorize('update', $user);

        $validatedData = $request->validate([
            'username' => 'sometimes|string|max:255|unique:users,username,' . $user->id,
            'email' => 'sometimes|email|max:255|unique:users,email,' . $user->id,
            'name' => 'sometimes|string|max:255',
            'bio' => 'sometimes|string',
            'avatar' => 'sometimes|string',
            'theme_id' => 'sometimes|exists:themes,id',
            'custom_domain' => 'sometimes|string|max:255',
        ]);

        $user->update($validatedData);

        return response()->json($user);
    }

    public function getLinks(User $user)
    {
        $this->authorize('view', $user);
        return response()->json($user->links);
    }

    public function getActiveLinks(User $user)
    {
        $this->authorize('view', $user);
        return response()->json($user->activeLinks);
    }

    public function getProfiles(User $user)
    {
        $this->authorize('view', $user);
        return response()->json($user->profiles);
    }

    public function getSubscriptions(User $user)
    {
        $this->authorize('view', $user);
        return response()->json($user->subscriptions);
    }

    public function getSocialMediaIcons(User $user)
    {
        $this->authorize('view', $user);
        return response()->json($user->socialMediaIcons);
    }

    public function getQRCodes(User $user)
    {
        $this->authorize('view', $user);
        return response()->json($user->qrCodes);
    }

    public function getNotifications(User $user)
    {
        $this->authorize('view', $user);
        return response()->json($user->notifications);
    }

    public function getAnalyticsDashboards(User $user)
    {
        $this->authorize('view', $user);
        return response()->json($user->analyticsDashboards);
    }

    public function getCustomThemes(User $user)
    {
        $this->authorize('view', $user);
        return response()->json($user->customThemes);
    }

    public function getLinkClicks(User $user)
    {
        $this->authorize('view', $user);
        return response()->json($user->linkClicks);
    }

    public function getProfileViews(User $user)
    {
        $this->authorize('view', $user);
        return response()->json($user->profileViews);
    }

    public function getTheme(User $user)
    {
        $this->authorize('view', $user);
        return response()->json($user->theme);
    }

    public function getPublicProfileUrl(User $user)
    {
        return response()->json(['url' => $user->getPublicProfileUrl()]);
    }

    public function canAddMoreLinks(User $user)
    {
        $this->authorize('view', $user);
        return response()->json(['can_add_more_links' => $user->canAddMoreLinks()]);
    }

    public function isSubscribed(User $user)
    {
        $this->authorize('view', $user);
        return response()->json(['is_subscribed' => $user->isSubscribed()]);
    }

    public function getLatestAnalytics(Request $request, User $user)
    {
        $this->authorize('view', $user);
        $days = $request->input('days', 30);
        return response()->json($user->getLatestAnalytics($days));
    }

    public function isGoogleUser(User $user)
    {
        $this->authorize('view', $user);
        return response()->json(['is_google_user' => $user->isGoogleUser()]);
    }

    public function isFacebookUser(User $user)
    {
        $this->authorize('view', $user);
        return response()->json(['is_facebook_user' => $user->isFacebookUser()]);
    }

    public function isSocialUser(User $user)
    {
        $this->authorize('view', $user);
        return response()->json(['is_social_user' => $user->isSocialUser()]);
    }

    public function getAuthProvider(User $user)
    {
        $this->authorize('view', $user);
        return response()->json(['auth_provider' => $user->getAuthProvider()]);
    }

    public function index()
    {
        $users = User::all();
        return response()->json($users);
    }
}
