<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Profile;
use Endroid\QrCode\QrCode;
use App\Models\ProfileView;
use Illuminate\Http\Request;
use Endroid\QrCode\Writer\PngWriter;
use App\Models\CustomTheme;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class ProfileController extends Controller
{
    public function show($id)
    {
        \Log::info('Fetching profile with ID: ' . $id);
        try {
            $profile = Profile::findOrFail($id);
            return response()->json($profile);
        } catch (ModelNotFoundException $e) {
            \Log::error('Profile not found with ID: ' . $id);
            throw new NotFoundHttpException('Profile not found');
        }
    }

    public function update(Request $request)
    {
        $user = Auth::user();
        $profile = $user->profile;

        $validatedData = $request->validate([
            'title' => 'nullable|string|max:255',
            'bio' => 'nullable|string|max:1000',
            'avatar_url' => 'nullable|url',
            'theme_id' => 'nullable|exists:themes,id',
            'custom_theme_id' => 'nullable|exists:custom_themes,id',
            'is_public' => 'boolean',
        ]);

        $profile->update($validatedData);

        return response()->json($profile->getProfileData());
    }

    public function incrementViews($username)
    {
        $profile = Profile::where('username', $username)->firstOrFail();
        $profile->incrementViews();
        return response()->json(['views_count' => $profile->views_count]);
    }

    public function generateUniqueUsername(Request $request)
    {
        $name = $request->input('name');
        $profile = new Profile();
        $username = $profile->generateUniqueUsername($name);
        return response()->json(['username' => $username]);
    }

    public function getCustomThemes()
    {
        $user = Auth::user();
        $customThemes = $user->customThemes()->recent()->get();
        return response()->json($customThemes->map->getPreviewData());
    }

    public function createCustomTheme(Request $request)
    {
        $user = Auth::user();

        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'background_color' => 'required|string|max:7',
            'text_color' => 'required|string|max:7',
            'button_color' => 'required|string|max:7',
            'button_text_color' => 'required|string|max:7',
            'font_family' => 'required|string|max:255',
            'custom_css' => 'nullable|string',
        ]);

        $customTheme = $user->customThemes()->create($validatedData);

        return response()->json($customTheme->getPreviewData(), 201);
    }

    public function updateCustomTheme(Request $request, CustomTheme $customTheme)
    {
        $this->authorize('update', $customTheme);

        $validatedData = $request->validate([
            'name' => 'string|max:255',
            'background_color' => 'string|max:7',
            'text_color' => 'string|max:7',
            'button_color' => 'string|max:7',
            'button_text_color' => 'string|max:7',
            'font_family' => 'string|max:255',
            'custom_css' => 'nullable|string',
        ]);

        $customTheme->update($validatedData);

        return response()->json($customTheme->getPreviewData());
    }

    public function deleteCustomTheme(CustomTheme $customTheme)
    {
        $this->authorize('delete', $customTheme);

        $customTheme->delete();

        return response()->json(null, 204);
    }

    public function applyCustomTheme(CustomTheme $customTheme)
    {
        $this->authorize('update', $customTheme);

        $user = Auth::user();
        $profile = $user->profile;

        $customTheme->applyToProfile($profile);

        return response()->json($profile->getProfileData());
    }

    public function getCustomThemeCSS(CustomTheme $customTheme)
    {
        return response($customTheme->generateCSS())
            ->header('Content-Type', 'text/css');

    }

    public function trackView(Request $request, $userId, $profileId)
    {
        $validated = $request->validate([
            'user_agent' => 'string|nullable',
        ]);

        ProfileView::create([
            'user_id' => $userId,
            'profile_id' => $profileId,
            'user_agent' => $validated['user_agent'] ?? $request->header('User-Agent'),
        ]);

        return response()->json(['message' => 'Profile view tracked successfully.']);
    }

    public function generateQRCode($userId)
    {
        // Retrieve the user's profile
        $profile = Profile::where('user_id', $userId)->firstOrFail();

        // Construct the profile link based on your URL structure
        $profileLink = url('/user/' . $profile->user_id); // Adjust as needed

        // Generate the QR code
        $qrCode = new QrCode($profileLink);
        $qrCode->setSize(300);
        $qrCode->setMargin(10);

        // Use PngWriter to create the PNG image
        $writer = new PngWriter();
        $result = $writer->write($qrCode);

        // Return the QR code as a PNG image
        return response($result->getString())
            ->header('Content-Type', 'image/png');
    }

    public function getNotifications($userId)
    {
        $user = User::find($userId);
        return $user->notifications()->latest()->get();

    }
}


