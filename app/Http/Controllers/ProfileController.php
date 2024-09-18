<?php

namespace App\Http\Controllers;
use App\Models\User;
use App\Models\Profile;
use Endroid\QrCode\QrCode;
use App\Models\ProfileView;
use Illuminate\Http\Request;
use Endroid\QrCode\Writer\PngWriter;


class ProfileController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
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
