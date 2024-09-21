<?php

namespace App\Http\Controllers;

use App\Models\Link;
use App\Models\LinkClick;
use Illuminate\Http\Request;


class LinkController extends Controller
{

        // Get all links for a user
        public function index($userId)
        {
            return Link::where('user_id', $userId)->get();
        }
    
        // Create a new link
        public function store(Request $request, $userId)
        {

            $validated = $request->validate([
                'title' => 'required|string',
                'url' => 'required|url',
                'is_active' => 'boolean',
                'start_time' => 'nullable|date',
                'end_time' => 'nullable|date',
            ]);
    
            $validated['user_id'] = $userId;
            $link = Link::create($validated);
    
            return response()->json($link, 201);
        }
    
        // Show a specific link
        public function show($userId, $id)
        {
            $link = Link::where('user_id', $userId)->findOrFail($id);
            return response()->json($link);
        }
    
        // Update a link
        public function update(Request $request, $userId, $id)
        {
            $link = Link::where('user_id', $userId)->findOrFail($id);
    
            $validated = $request->validate([
                'title' => 'sometimes|required|string',
                'url' => 'sometimes|required|url',
                'is_active' => 'sometimes|boolean',
                'start_time' => 'sometimes|nullable|date',
                'end_time' => 'sometimes|nullable|date',

            ]);
    
            $link->update($validated);
            return response()->json($link);
        }
    
        // Delete a link
        public function destroy($userId, $id)
        {
            $link = Link::where('user_id', $userId)->findOrFail($id);
            $link->delete();
            return response()->json(null, 204);
        }

        public function trackClick(Request $request, $userId, $linkId)
        {
            $validated = $request->validate([
                'user_agent' => 'string|nullable',
            ]);

            LinkClick::create([
                'user_id' => $userId,
                'link_id' => $linkId,
                'user_agent' => $validated['user_agent'] ?? $request->header('User-Agent'),
            ]);

            return response()->json(['message' => 'Click tracked successfully.']);
        }
    }
