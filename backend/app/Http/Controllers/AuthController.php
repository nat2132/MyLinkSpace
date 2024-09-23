<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\Log;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Validator;
use App\Models\Theme;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        $defaultTheme = Theme::firstOrCreate(['name' => 'Default Theme']);

        $profile = Profile::create([
            'user_id' => $user->id,
            'theme_id' => $defaultTheme->id,
            'title' => 'Default Title',
            'bio' => 'Default Bio',
            'avatar_url' => 'https://example.com/default-avatar.png',
            'is_public' => true,
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'user' => $user,
            'token' => $token
        ], 201);
    }

    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        Log::info('Login attempt', ['email' => $request->email]);
        if (Auth::attempt($credentials)) {
            Log::info('Login successful', ['email' => $request->email]);
            $user = Auth::user();
            $token = $user->createToken('auth_token')->plainTextToken;

            return response()->json([
                'status' => 'success',
                'user' => $user,
                'token' => $token,
            ]);
        } else {
            Log::info('Login failed', ['email' => $request->email]);
            return response()->json([
                'status' => 'error',
                'message' => 'The provided credentials are incorrect.',
            ], 401);
        }
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'Logged out successfully']);
    }

    public function signup(Request $request)
    {
        try {
            $request->validate([
                'username' => 'required|string|max:255|unique:users',
                'email' => 'required|string|email|max:255|unique:users',
                'password' => 'required|string|min:8',
            ]);

            $user = User::create([
                'username' => $request->username,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'is_premium' => false,
                'max_links' => 10,
            ]);

            $token = $user->createToken('auth_token')->plainTextToken;

            return response()->json([
                'user' => $user,
                'token' => $token,
            ], 201);
        } catch (ValidationException $e) {
            return response()->json(['errors' => $e->errors()], 422);
        } catch (\Exception $e) {
            Log::error('Signup error: ' . $e->getMessage());
            return response()->json(['error' => 'An error occurred during signup.'], 500);
        }
    }

    public function googleSignup(Request $request)
    {
        try {
            Log::info('Google signup attempt', ['credential' => $request->input('credential')]);
            
            $googleUser = Socialite::driver('google')->userFromToken($request->input('credential'));
            
            Log::info('Google user retrieved', ['user' => $googleUser]);

            $username = explode('@', $googleUser->email)[0];

            $user = User::updateOrCreate(
                ['email' => $googleUser->email],
                [
                    'username' => $username,
                    'google_id' => $googleUser->id,
                    'password' => bcrypt(Str::random(16)),
                    'email_verified_at' => now(), // Set email as verified
                    'is_premium' => false, 
                    'max_links' => 10, 
                ]
            );

            Log::info('User created or updated', ['user' => $user]);

            $token = $user->createToken('google-token')->plainTextToken;

            return response()->json([
                'user' => $user,
                'token' => $token
            ], 201);
        } catch (QueryException $e) {
            Log::error('Database error during Google signup', [
                'message' => $e->getMessage(),
                'sql' => $e->getSql(),
                'bindings' => $e->getBindings()
            ]);
            return response()->json(['error' => 'A database error occurred during signup. Please try again.'], 500);
        } catch (\Exception $e) {
            Log::error('Google signup error', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            return response()->json(['error' => 'An error occurred during Google signup: ' . $e->getMessage()], 500);
        }
    }

    public function facebookSignup(Request $request)
    {
        try {
            Log::info('Facebook signup attempt', ['request' => $request->all()]);
            
            $accessToken = $request->input('accessToken');
            if (!$accessToken) {
                Log::warning('Access token not provided');
                throw new \Exception('Access token not provided');
            }

            Log::info('Retrieving Facebook user');
            $facebookUser = Socialite::driver('facebook')->userFromToken($accessToken);
            
            Log::info('Facebook user retrieved', ['user' => $facebookUser]);

            if (!$facebookUser->getEmail()) {
                Log::warning('Email not provided by Facebook');
                throw new \Exception('Email not provided by Facebook');
            }

            Log::info('Creating or updating user');
            $user = User::updateOrCreate(
                ['email' => $facebookUser->getEmail()],
                [
                    'username' => $facebookUser->getName() ?? explode('@', $facebookUser->getEmail())[0],
                    'facebook_id' => $facebookUser->getId(),
                    'password' => bcrypt(Str::random(16)),
                    'email_verified_at' => now(), // Set email as verified
                    'is_premium' => false,
                    'max_links' => 10,
                ]
            );

            Log::info('User created or updated', ['user' => $user]);

            $token = $user->createToken('facebook-token')->plainTextToken;

            return response()->json([
                'user' => $user,
                'token' => $token
            ], 201);
        } catch (\Exception $e) {
            Log::error('Facebook signup error', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
                'request' => $request->all()
            ]);
            return response()->json(['error' => 'An error occurred during Facebook signup: ' . $e->getMessage()], 500);
        }
    }

    public function googleSignin(Request $request)
    {
        try {
            $access_token = $request->input('access_token');
            
            if (!$access_token) {
                throw new \Exception('No access token provided');
            }

            Log::info('Received access token: ' . $access_token);

            $googleUser = Socialite::driver('google')->userFromToken($access_token);
            
            Log::info('Google user data:', ['user' => $googleUser]);

            $user = User::updateOrCreate(
                ['email' => $googleUser->email],
                [
                    'name' => $googleUser->name,
                    'google_id' => $googleUser->id,
                    'username' => $googleUser->email, // Set email as username if needed
                    'email_verified_at' => now(), // Set email as verified
                ]
            );

            $authToken = $user->createToken('auth-token')->plainTextToken;

            return response()->json([
                'user' => $user,
                'token' => $authToken
            ]);

        } catch (\Exception $e) {
            Log::error('Google signin error: ' . $e->getMessage());
            return response()->json([
                'error' => 'An error occurred during sign-in',
                'details' => $e->getMessage()
            ], 500);
        }
    }

    public function facebookSignIn(Request $request)
    {
        try {
            Log::info('Facebook signin attempt', ['request' => $request->all()]);

            $access_token = $request->input('accessToken');
            
            if (!$access_token) {
                throw new \Exception('No access token provided');
            }

            Log::info('Received Facebook access token: ' . $access_token);

            $facebookUser = Socialite::driver('facebook')->userFromToken($access_token);
            
            Log::info('Facebook user data:', ['user' => $facebookUser]);

            $user = User::updateOrCreate(
                ['email' => $facebookUser->getEmail()],
                [
                    'name' => $facebookUser->getName(),
                    'facebook_id' => $facebookUser->getId(),
                    'username' => $facebookUser->getEmail(), // Set email as username if needed
                    'email_verified_at' => now(), // Set email as verified
                ]
            );

            Log::info('User created or updated:', ['user' => $user]);

            $authToken = $user->createToken('facebook-token')->plainTextToken;

            return response()->json([
                'user' => $user,
                'token' => $authToken
            ]);

        } catch (\Exception $e) {
            Log::error('Facebook signin error', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
                'request' => $request->all()
            ]);
            return response()->json([
                'error' => 'An error occurred during sign-in',
                'details' => $e->getMessage()
            ], 500);
        }
    }

    public function checkUsername(Request $request)
    {
        $request->validate([
            'username' => 'required|string',
        ]);

        $exists = User::where('username', $request->username)->exists();

        return response()->json([
            'available' => !$exists,
        ]);
    }

    public function checkEmail(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
        ]);

        $exists = User::where('email', $request->email)->exists();

        return response()->json([
            'available' => !$exists,
        ]);
    }
}
