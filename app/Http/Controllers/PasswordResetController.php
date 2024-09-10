<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Notifications\ResetPasswordNotification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Validator;

class PasswordResetController extends Controller
{
    // Send password reset link
    public function sendResetLink(Request $request)
    {
        $request->validate(['email' => 'required|email']);

        $user = User::where('email', $request->email)->first();

        if ($user) {
            $token = Password::createToken($user);
            $user->notify(new ResetPasswordNotification($token));
        }

        return response()->json(['message' => 'If your email is registered, you will receive a password reset link.'], 200);
    }

    // Reset the password
    public function reset(Request $request)
    {
        $request->validate([
            'token' => 'required',
            'email' => 'required|email',
            'password' => 'required|string|confirmed|min:6',
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user || !Password::tokenExists($user, $request->token)) {
            return response()->json(['message' => 'Invalid token or email.'], 400);
        }

        $user->password = Hash::make($request->password);
        $user->save();

        return response()->json(['message' => 'Password has been reset successfully.'], 200);
    }
}