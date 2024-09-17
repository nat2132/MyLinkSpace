<?php

namespace App\Http\Controllers;

use App\Models\ProfileView;
use Illuminate\Http\Request;

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
}
