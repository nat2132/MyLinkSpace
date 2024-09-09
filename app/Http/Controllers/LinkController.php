<?php

namespace App\Http\Controllers;
use App\Models\Link;
use App\Models\User;
use Illuminate\Http\Request;


class LinkController extends Controller
{
 
   //
   public function index()
{
    return auth()->user()->links;
}

public function store(Request $request)
{
    $request->validate([
        'name' => 'required|string|max:255',
        'link' => 'required|url',
    ]);

    $link = auth()->user()->links()->create($request->all());
    return response()->json($link, 201);
}

public function update(Request $request, Link $link)
{
    $request->validate([
        'name' => 'sometimes|required|string|max:255',
        'link' => 'sometimes|required|url',
    ]);

    $link->update($request->all());
    return response()->json($link, 200);
}

public function destroy(Link $link)
{
    $link->delete();
    return response()->json(null, 204);
}
}
