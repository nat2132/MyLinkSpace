<?php

namespace App\Http\Controllers;


use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Auth\Events\Registered;
use Laravel\Socialite\Facades\Socialite;

class AuthController extends Controller
{
    //

    public function register(Request $request)
    {
        $request->validate([
            'email' => 'required|email|unique:users',
            'username' => 'required|string|unique:users',
            'password' => 'required|string|min:6|confirmed',
        ]);
    
        $user = User::create([
            'email' => $request->email,
            'username' => $request->username,
            'password' => Hash::make($request->password),
        ]);
    
        // Dispatch the Registered event to send the verification email
        event(new Registered($user));
    
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

    public function redirectToGoogle()
    {
        return Socialite::driver('google')->redirect();
    }

    public function handleGoogleCallback()
    {
        return $this->handleProviderCallback('google');
    }

    public function redirectToFacebook()
    {
        return Socialite::driver('facebook')->redirect();
    }

    public function handleFacebookCallback()
    {
        return $this->handleProviderCallback('facebook');
    }

    public function redirectToLinkedIn()
    {
        return Socialite::driver('linkedin')->redirect();
    }

    public function handleLinkedInCallback()
    {
        return $this->handleProviderCallback('linkedin');
    }

    protected function handleProviderCallback($provider)
    {
        $socialUser = Socialite::driver($provider)->user();
        
        $user = User::where('email', $socialUser->getEmail())->first();

        if (!$user) {
            $user = User::create([
                'email' => $socialUser->getEmail(),
                'username' => $socialUser->getName(),
                'password' => bcrypt(Str::random(8)), // Use Str::random() instead
            ]);
        }

        Auth::login($user, true);

        $token = $user->createToken('YourAppName')->plainTextToken;

        return response()->json(['user' => $user, 'token' => $token]);
    }

}
