<?php

namespace App\Http\Controllers;

use App\Models\SocialMediaIcon;
use App\Models\Profile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class SocialMediaIconController extends Controller
{
    public function index(Profile $profile)
    {
        $icons = $profile->socialMediaIcons()->ordered()->active()->get();
        return response()->json($icons->map->getIconData());
    }

    public function store(Request $request, Profile $profile)
    {
        $this->authorize('update', $profile);

        $validatedData = $request->validate([
            'platform' => 'required|string|max:255',
            'icon_url' => 'required|url',
            'display_name' => 'required|string|max:255',
            'profile_url' => 'required|url',
            'order' => 'required|integer|min:0',
        ]);

        $icon = $profile->socialMediaIcons()->create($validatedData);

        return response()->json($icon->getIconData(), 201);
    }

    public function update(Request $request, SocialMediaIcon $icon)
    {
        $this->authorize('update', $icon->profile);

        $validatedData = $request->validate([
            'platform' => 'string|max:255',
            'icon_url' => 'url',
            'display_name' => 'string|max:255',
            'profile_url' => 'url',
            'order' => 'integer|min:0',
        ]);

        $icon->update($validatedData);

        return response()->json($icon->getIconData());
    }

    public function destroy(SocialMediaIcon $icon)
    {
        $this->authorize('update', $icon->profile);

        $icon->delete();

        return response()->json(null, 204);
    }

    public function toggleVisibility(SocialMediaIcon $icon)
    {
        $this->authorize('update', $icon->profile);

        $icon->toggleVisibility();

        return response()->json(['is_active' => $icon->is_active]);
    }

    public function updateOrder(Request $request, SocialMediaIcon $icon)
    {
        $this->authorize('update', $icon->profile);

        $validatedData = $request->validate([
            'order' => 'required|integer|min:0',
        ]);

        $icon->updateOrder($validatedData['order']);

        return response()->json($icon->getIconData());
    }

    public function reorderAll(Request $request, Profile $profile)
    {
        $this->authorize('update', $profile);

        $validatedData = $request->validate([
            'orders' => 'required|array',
            'orders.*' => 'required|integer|distinct|min:0',
        ]);

        $icons = $profile->socialMediaIcons;

        foreach ($validatedData['orders'] as $id => $order) {
            $icon = $icons->find($id);
            if ($icon) {
                $icon->updateOrder($order);
            }
        }

        return response()->json($profile->socialMediaIcons()->ordered()->get()->map->getIconData());
    }
}
