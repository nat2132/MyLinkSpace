<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController
;
use App\Http\Controllers\EmailVerificationController;
use App\Http\Controllers\PasswordResetController;
use App\Http\Controllers\CustomThemeController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SocialMediaIconController;
use App\Http\Controllers\SubscriptionController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\LinkController;
use App\Http\Controllers\AnalyticsController;
use App\Http\Controllers\PaymentController;

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


// Routes for link management
Route::prefix('users/{userId}/links')->group(function () {
    Route::get('/', [LinkController::class, 'index']);
    Route::post('/', [LinkController::class, 'store']);
    Route::get('/{id}', [LinkController::class, 'show']);
    Route::put('/{id}', [LinkController::class, 'update']);
    Route::delete('/{id}', [LinkController::class, 'destroy']);
    Route::put('/reorder', [LinkController::class, 'reorder']);

});



// Route for analytics
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

// track links
Route::post('users/{userId}/links/{linkId}/click', [LinkController::class, 'trackClick']);

// Route for generating QR code
Route::get('users/{userId}/profile/qrcode', [ProfileController::class, 'generateQRCode']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// CORS preflight
Route::options('{any}', function () {
    return response('', 200);
})->where('any', '.*');

// Register and login routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login'])->name('login');

// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    // Add other protected routes here
});

// Google signup route
Route::post('/auth/google-signup', [AuthController::class, 'googleSignup']);

// Facebook signup route
Route::post('/auth/facebook-signup', [AuthController::class, 'facebookSignup']);

// Signup route
Route::post('/api/auth/signup', [AuthController::class, 'signup']);

// Email verification routes
Route::post('/auth/send-verification', function(Request $request) {
    \Log::info('Send verification request method: ' . $request->method());
    return (new EmailVerificationController())->sendVerification($request);
});
Route::post('/auth/verify-code', [EmailVerificationController::class, 'verifyCode']);

// Social sign-in routes
Route::post('/auth/login', [AuthController::class, 'login']);
Route::get('/auth/facebook', [AuthController::class, 'facebookSignIn']);

Route::post('/auth/google/signin', [AuthController::class, 'googleSignin']);

Route::match(['get', 'post'], '/auth/facebook/signin', [AuthController::class, 'facebookSignIn']);

Route::post('/auth/facebook-signin', [AuthController::class, 'facebookSignIn']);

Route::post('/auth/facebook/signin', [AuthController::class, 'facebookSignIn']);

// Forgot password and reset routes
Route::post('/auth/forgot-password', [PasswordResetController::class, 'forgotPassword']);
Route::post('/auth/verify-code-f', [PasswordResetController::class, 'verifycode']);
Route::post('/auth/reset-password', [PasswordResetController::class, 'reset']);

Route::post('/auth/signup', [AuthController::class, 'signup']);

Route::post('/auth/check-username', [AuthController::class, 'checkUsername']);
Route::post('/auth/check-email', [AuthController::class, 'checkEmail']);

// Custom theme routes
Route::apiResource('custom-themes', CustomThemeController::class);
Route::get('custom-themes/recent/{limit?}', [CustomThemeController::class, 'recent']);
Route::post('custom-themes/{customTheme}/apply/{profile}', [CustomThemeController::class, 'applyToProfile']);
Route::get('custom-themes/{customTheme}/preview', [CustomThemeController::class, 'getPreviewData']);
Route::get('custom-themes/{customTheme}/css', [CustomThemeController::class, 'generateCSS']);

// Public routes
Route::get('/profile/{username}', [ProfileController::class, 'show']);

// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/profile/{id}', [ProfileController::class, 'show']);
    Route::put('/profile/{id}', [ProfileController::class, 'update']);
    Route::post('/profile/generate-username', [ProfileController::class, 'generateUniqueUsername']);
    
    // Custom Theme routes
    Route::get('/custom-themes', [ProfileController::class, 'getCustomThemes']);
    Route::post('/custom-themes', [ProfileController::class, 'createCustomTheme']);
    Route::put('/custom-themes/{customTheme}', [ProfileController::class, 'updateCustomTheme']);
    Route::delete('/custom-themes/{customTheme}', [ProfileController::class, 'deleteCustomTheme']);
    Route::post('/custom-themes/{customTheme}/apply', [ProfileController::class, 'applyCustomTheme']);
    Route::get('/custom-themes/{customTheme}/css', [ProfileController::class, 'getCustomThemeCSS']);
});

// Social media icon routes
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/profiles/{profile}/social-icons', [SocialMediaIconController::class, 'index']);
    Route::post('/profiles/{profile}/social-icons', [SocialMediaIconController::class, 'store']);
    Route::put('/social-icons/{icon}', [SocialMediaIconController::class, 'update']);
    Route::delete('/social-icons/{icon}', [SocialMediaIconController::class, 'destroy']);
    Route::post('/social-icons/{icon}/toggle-visibility', [SocialMediaIconController::class, 'toggleVisibility']);
    Route::put('/social-icons/{icon}/order', [SocialMediaIconController::class, 'updateOrder']);
    Route::put('/profiles/{profile}/social-icons/reorder', [SocialMediaIconController::class, 'reorderAll']);
});

// Subscription routes
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/subscriptions', [SubscriptionController::class, 'index']);
    Route::get('/subscriptions/active', [SubscriptionController::class, 'getActiveSubscriptions']);
    Route::get('/subscriptions/{subscription}', [SubscriptionController::class, 'show']);
    Route::post('/subscriptions', [SubscriptionController::class, 'store']);
    Route::post('/subscriptions/{subscription}/cancel', [SubscriptionController::class, 'cancel']);
    Route::post('/subscriptions/{subscription}/renew', [SubscriptionController::class, 'renew']);
    Route::get('/subscriptions/{subscription}/remaining-days', [SubscriptionController::class, 'getRemainingDays']);
});

// User routes
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/users', [UserController::class, 'index']);
    Route::get('/users/{user}', [UserController::class, 'show']);
    Route::put('/users/{user}', [UserController::class, 'update']);
    Route::get('/users/{user}/links', [UserController::class, 'getLinks']);
    Route::get('/users/{user}/active-links', [UserController::class, 'getActiveLinks']);
    Route::get('/users/{user}/profiles', [UserController::class, 'getProfiles']);
    Route::get('/users/{user}/subscriptions', [UserController::class, 'getSubscriptions']);
    Route::get('/users/{user}/social-media-icons', [UserController::class, 'getSocialMediaIcons']);
    Route::get('/users/{user}/qr-codes', [UserController::class, 'getQRCodes']);
    Route::get('/users/{user}/notifications', [UserController::class, 'getNotifications']);
    Route::get('/users/{user}/analytics-dashboards', [UserController::class, 'getAnalyticsDashboards']);
    Route::get('/users/{user}/custom-themes', [UserController::class, 'getCustomThemes']);
    Route::get('/users/{user}/link-clicks', [UserController::class, 'getLinkClicks']);
    Route::get('/users/{user}/profile-views', [UserController::class, 'getProfileViews']);
    Route::get('/users/{user}/theme', [UserController::class, 'getTheme']);
    Route::get('/users/{user}/public-profile-url', [UserController::class, 'getPublicProfileUrl']);
    Route::get('/users/{user}/can-add-more-links', [UserController::class, 'canAddMoreLinks']);
    Route::get('/users/{user}/is-subscribed', [UserController::class, 'isSubscribed']);
    Route::get('/users/{user}/latest-analytics', [UserController::class, 'getLatestAnalytics']);
    Route::get('/users/{user}/is-google-user', [UserController::class, 'isGoogleUser']);
    Route::get('/users/{user}/is-facebook-user', [UserController::class, 'isFacebookUser']);
    Route::get('/users/{user}/is-social-user', [UserController::class, 'isSocialUser']);
    Route::get('/users/{user}/auth-provider', [UserController::class, 'getAuthProvider']);
});

// Route for notification
Route::get('users/{userId}/notifications', [ProfileController::class, 'getNotifications']);

//subscription and payment

Route::post('subscribe', [PaymentController::class, 'subscribe'])->name('subscribe');
Route::get('payment/success', [PaymentController::class, 'paymentSuccess'])->name('payment.success');
Route::get('payment/cancel', [PaymentController::class, 'paymentCancel'])->name('payment.cancel');
