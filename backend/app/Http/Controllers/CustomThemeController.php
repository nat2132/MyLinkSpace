<?php

namespace App\Http\Controllers;

use App\Models\CustomTheme;
use App\Models\Profile;
use Illuminate\Http\Request;

class CustomThemeController extends Controller
{
    public function index()
    {
        $themes = CustomTheme::all();
        return response()->json($themes);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'background_color' => 'required|string|max:7',
            'text_color' => 'required|string|max:7',
            'button_color' => 'required|string|max:7',
            'button_text_color' => 'required|string|max:7',
            'font_family' => 'required|string|max:255',
            'custom_css' => 'nullable|string',
        ]);

        $theme = CustomTheme::create($validatedData);
        return response()->json($theme, 201);
    }

    public function show(CustomTheme $customTheme)
    {
        return response()->json($customTheme);
    }

    public function update(Request $request, CustomTheme $customTheme)
    {
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
        return response()->json($customTheme);
    }

    public function destroy(CustomTheme $customTheme)
    {
        $customTheme->delete();
        return response()->json(null, 204);
    }

    public function recent($limit = 10)
    {
        $themes = CustomTheme::recent($limit)->get();
        return response()->json($themes);
    }

    public function applyToProfile(CustomTheme $customTheme, Profile $profile)
    {
        $customTheme->applyToProfile($profile);
        return response()->json(['message' => 'Theme applied successfully']);
    }

    public function getPreviewData(CustomTheme $customTheme)
    {
        return response()->json($customTheme->getPreviewData());
    }

    public function generateCSS(CustomTheme $customTheme)
    {
        return response($customTheme->generateCSS())
            ->header('Content-Type', 'text/css');
    }
}
