<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;

class PasswordResetController extends Controller
{
    public function forgotPassword(Request $request)
    {
        $request->validate(['email' => 'required|email']);

        $user = User::where('email', $request->email)->first();

        if (!$user) {
            throw ValidationException::withMessages([
                'email' => ['No user found with this email address.'],
            ]);
        }

        // Generate a random 6-digit code
        $code = str_pad(random_int(0, 999999), 6, '0', STR_PAD_LEFT);

        // Store the code in the password_resets table
        DB::table('password_resets')->updateOrInsert(
            ['email' => $user->email],
            [
                'token' => Hash::make($code),
                'created_at' => Carbon::now()
            ]
        );

        // Send the code via email
        Mail::send('emails.reset_password', ['code' => $code], function($message) use ($user) {
            $message->to($user->email);
            $message->subject('Your Password Reset Code');
        });

        return response()->json(['message' => 'We have emailed your password reset code!']);
    }

    public function verifyCode(Request $request)
    {
        try {
            $request->validate([
                'email' => 'required|email',
                'code' => 'required|string|size:6',
            ]);

            $passwordReset = DB::table('password_resets')
                ->where('email', $request->email)
                ->first();

            if (!$passwordReset || !Hash::check($request->code, $passwordReset->token)) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'The verification code is invalid.',
                ], 400);
            }

            if (Carbon::parse($passwordReset->created_at)->addMinutes(60)->isPast()) {
                DB::table('password_resets')->where('email', $request->email)->delete();
                return response()->json([
                    'status' => 'error',
                    'message' => 'The verification code has expired.',
                ], 400);
            }

            return response()->json([
                'status' => 'success',
                'message' => 'Code verified successfully',
            ]);

        } catch (ValidationException $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Validation failed',
                'errors' => $e->errors(),
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'An error occurred during code verification.',
            ], 500);
        }
    }

    public function reset(Request $request)
    {
        try {
            $validated = $request->validate([
                'email' => 'required|email',
                'code' => 'required|string|size:6',
                'password' => 'required|string|min:8|confirmed',
                'password_confirmation' => 'required|string|min:8',
            ]);

            $passwordReset = DB::table('password_resets')
                ->where('email', $validated['email'])
                ->first();

            if (!$passwordReset || !Hash::check($validated['code'], $passwordReset->token)) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'The reset code is invalid.',
                ], 400);
            }

            $user = User::where('email', $validated['email'])->first();

            if (!$user) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'No user found with this email address.',
                ], 404);
            }

            Log::info('Password reset attempt', ['email' => $validated['email']]);

            $user->password = Hash::make($validated['password']);
            $user->save();

            Log::info('Password reset successful', ['email' => $user->email]);

            DB::table('password_resets')->where('email', $validated['email'])->delete();

            Log::info('New password hash', ['hash' => $user->password]);

            return response()->json([
                'status' => 'success',
                'message' => 'Password has been successfully reset.',
            ]);

        } catch (ValidationException $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Validation failed',
                'errors' => $e->errors(),
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'An error occurred during password reset.',
                'debug' => $e->getMessage(), // Remove this in production
            ], 500);
        }
    }
}
