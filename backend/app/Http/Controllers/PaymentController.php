<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;


class PaymentController extends Controller
{
    public function subscribe(Request $request)
    {
        $user = auth()->user();
    
        // Validate input
        $request->validate([
            'subscription_fee' => 'required|numeric',
            'subscription_type' => 'required|string|max:255',
        ]);
    
        $subscriptionFee = $request->input('subscription_fee');
        $subscriptionType = $request->input('subscription_type');
    
        // Update using raw SQL
        $affected = DB::table('users')
            ->where('id', $user->id)
            ->update([
                'is_subscribed' => $subscriptionFee > 0,
                'subscription_fee' => $subscriptionFee,
                'subscription_type' => $subscriptionType,
            ]);
    
        if ($affected === 0) {
            return response()->json(['error' => 'Failed to update user data.'], 500);
        }
    
        return response()->json(['message' => 'Subscription updated successfully.']);
    }

    public function paymentSuccess(Request $request)
    {
        // Handle successful payment confirmation here
        // Update user subscription status to premium if needed
        return response()->json(['message' => 'Payment processed successfully.']);
    }

    public function paymentCancel()
    {
        return response()->json(['message' => 'Payment canceled.']);
    }
}