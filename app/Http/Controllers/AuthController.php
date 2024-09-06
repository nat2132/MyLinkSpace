<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    //

    public function register(Request $request)
{
    $request->validate([
        'email' => 'required|email|unique:users',
        'username' => 'required|string|unique:users',
        'password' => 'required|string|min:6',
    ]);

    $user = User::create([
        'email' => $request->email,
        'username' => $request->username,
        'password' => Hash::make($request->password),
    ]);

    return response()->json($user, 201);
}

public function login(Request $request)
{
    $request->validate([
        'username' => 'required|string',
        'password' => 'required|string',
    ]);

    if (Auth::attempt($request->only('username', 'password'))) {
        return response()->json(Auth::user());
    }

    return response()->json(['error' => 'Unauthorized'], 401);
}

public function logout(Request $request)
{
    Auth::logout();
    return response()->json(['message' => 'Successfully logged out.'], 200);
}


}
