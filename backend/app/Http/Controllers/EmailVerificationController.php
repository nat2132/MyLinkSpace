<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redis;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use App\Mail\VerificationCode;
use App\Models\User;
use Carbon\Carbon;

class EmailVerificationController extends Controller
{
    public function sendVerification(Request $request)
    {
        try {
            $request->validate([
                'email' => 'required|email',
            ]);

            $email = $request->input('email');
            $code = Str::random(6);

            // Store the code in Redis with a 15-minute expiration
            Redis::setex("verification:{$email}", 900, $code);

            // Send the code via email using the VerificationCode Mailable
            Mail::to($email)->send(new VerificationCode($code));

            return response()->json(['message' => 'Verification code sent successfully']);
        } catch (\Exception $e) {
            \Log::error('Error in sendVerification: ' . $e->getMessage());
            return response()->json(['error' => 'An error occurred'], 500);
        }
    }

    public function verifyCode(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'code' => 'required|string',
        ]);

        $email = $request->input('email');
        $code = $request->input('code');

        $storedCode = Redis::get("verification:{$email}");

        if ($storedCode && $storedCode === $code) {
            Redis::del("verification:{$email}");
            return response()->json(['message' => 'Email verified successfully']);
        }

        return response()->json(['message' => 'Invalid verification code'], 400);
    }

    public function verifyEmail(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'code' => 'required|string|size:6',
        ]);

        $email = $request->input('email');
        $code = $request->input('code');

        $storedCode = Redis::get("verification:{$email}");

        if ($storedCode && $storedCode === $code) {
            // Code is valid, update the user's email_verified_at
            $user = User::where('email', $email)->first();
            
            if ($user) {
                $user->email_verified_at = Carbon::now();
                $user->save();

                // Delete the verification code from Redis
                Redis::del("verification:{$email}");

                return response()->json(['message' => 'Email verified successfully']);
            }

            return response()->json(['error' => 'User not found'], 404);
        }

        return response()->json(['error' => 'Invalid verification code'], 400);
    }
}
