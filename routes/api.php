<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LinkController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\AnalyticsController;

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

Route::apiResource('users', UserController::class);

// Routes for link management
Route::prefix('users/{userId}/links')->group(function () {
    Route::get('/', [LinkController::class, 'index']);
    Route::post('/', [LinkController::class, 'store']);
    Route::get('/{id}', [LinkController::class, 'show']);
    Route::put('/{id}', [LinkController::class, 'update']);
    Route::delete('/{id}', [LinkController::class, 'destroy']);
});


Route::prefix('users/{userId}/analytics')->group(function () {
    Route::get('/total-clicks', [AnalyticsController::class, 'totalClicks']);
    Route::get('/clicks-per-link', [AnalyticsController::class, 'clicksPerLink']);
    Route::get('/performance', [AnalyticsController::class, 'performance']);
    Route::get('/top-bottom-links', [AnalyticsController::class, 'topAndBottomLinks']);
    Route::get('/bounce-rate', [AnalyticsController::class, 'bounceRate']);
    Route::get('/return-visitors', [AnalyticsController::class, 'returnVisitors']);
    Route::get('/engagement-rate', [AnalyticsController::class, 'engagementRate']);
    Route::get('/export-word', [AnalyticsController::class, 'exportWordReport']);

});

// Route for generating QR code
Route::get('users/{userId}/profile/qrcode', [ProfileController::class, 'generateQRCode']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
