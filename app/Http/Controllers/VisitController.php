<?php

namespace App\Http\Controllers;
use App\Models\Link;
use App\Models\Visit;
use Illuminate\Http\Request;

class VisitController extends Controller
{
    //
    public function store(Link $link, Request $request)
{
    $visit = new Visit();
    $visit->link_id = $link->id;
    $visit->user_agent = $request->userAgent();
    $visit->save();

    return response()->json($visit, 201);
}
}
