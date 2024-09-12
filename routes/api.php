<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\LinkController;
use App\Http\Controllers\VisitController;
use App\Http\Controllers\PasswordResetController;
use Illuminate\Support\Facades\Auth;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/


Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::get('/auth/google', [AuthController::class, 'redirectToGoogle']);
Route::get('/auth/google/callback', [AuthController::class, 'handleGoogleCallback']);

Route::get('/auth/facebook', [AuthController::class, 'redirectToFacebook']);
Route::get('/auth/facebook/callback', [AuthController::class, 'handleFacebookCallback']);

Route::get('/auth/linkedin', [AuthController::class, 'redirectToLinkedIn']);
Route::get('/auth/linkedin/callback', [AuthController::class, 'handleLinkedInCallback']);

Route::post('/password/email', [PasswordResetController::class, 'sendResetLink']);
Route::post('/password/reset', [PasswordResetController::class, 'reset']);


Auth::routes(['verify' => true]);

Route::middleware('auth:sanctum','verified')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    
    Route::apiResource('user/links', LinkController::class);

    Route::post('/links/{link}/visit', [VisitController::class, 'store']);
});


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
