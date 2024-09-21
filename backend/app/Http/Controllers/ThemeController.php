<?php

namespace App\Http\Controllers;

use App\Models\Theme;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ThemeController extends Controller
{
    public function index()
    {
        $themes = Theme::all();
        return response()->json($themes);
    }

    public function show(Theme $theme)
    {
        return response()->json($theme);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'background_color' => 'required|string|max:7',
            'text_color' => 'required|string|max:7',
            'button_color' => 'required|string|max:7',
            'button_text_color' => 'required|string|max:7',
        ]);

        $theme = Theme::create($validatedData + ['created_by' => Auth::id()]);

        return response()->json($theme, 201);
    }

    public function update(Request $request, Theme $theme)
    {
        $this->authorize('update', $theme);

        $validatedData = $request->validate([
            'name' => 'sometimes|string|max:255',
            'description' => 'sometimes|string',
            'background_color' => 'sometimes|string|max:7',
            'text_color' => 'sometimes|string|max:7',
            'button_color' => 'sometimes|string|max:7',
            'button_text_color' => 'sometimes|string|max:7',
        ]);

        $theme->update($validatedData);

        return response()->json($theme);
    }

    public function destroy(Theme $theme)
    {
        $this->authorize('delete', $theme);

        $theme->delete();

        return response()->json(null, 204);
    }

    public function getPopular(Request $request)
    {
        $limit = $request->input('limit', 10);
        $popularThemes = Theme::popular($limit)->get();
        return response()->json($popularThemes);
    }

    public function getPreviewData(Theme $theme)
    {
        return response()->json($theme->getPreviewData());
    }

    public function getProfilesUsingTheme(Theme $theme)
    {
        $profiles = $theme->profiles;
        return response()->json($profiles);
    }

    public function getCreator(Theme $theme)
    {
        $creator = $theme->creator;
        return response()->json($creator);
    }
}
