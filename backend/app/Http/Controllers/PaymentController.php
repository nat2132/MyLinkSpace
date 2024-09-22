<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use GuzzleHttp\Client;
use Illuminate\Support\Facades\DB;

class PaymentController extends Controller
{
    //
    public function subscribe(Request $request)
    {
        $user = auth()->user();
        $subscriptionFee = $request->input('subscription_fee'); // e.g., 0, 99, 199
        $subscriptionType = $request->input('subscription_type'); // e.g., 'basic', 'premium'

        // Update user's subscription status
        DB::table('users')
        ->where('id', $user->id)
        ->update([
            'is_subscribed' => $subscriptionFee > 0,
            'subscription_fee' => $subscriptionFee,
            'subscription_type' => $subscriptionType,
        ]);

        // Prepare Chapa payment request if the user is subscribing for premium
        if ($subscriptionFee > 0) {
            return $this->initiatePayment($user, $subscriptionFee);
        }

        return response()->json(['message' => 'Subscribed for free successfully.']);
    }

    private function initiatePayment($user, $amount)
    {
        $client = new Client();
        $response = $client->post('https://api.chapa.co/charge', [
            'json' => [
                'amount' => $amount * 100, // Amount in cents
                'currency' => 'ETB',
                'email' => $user->email,
                'user_id' => $user->id,
                'callback_url' => route('payment.callback'), // Adjust as necessary
            ],
        ]);

        return json_decode($response->getBody()->getContents(), true);
    }

    public function paymentCallback(Request $request)
    {
        // Validate payment with Chapa and update user status
        // Handle logic based on Chapa's response

        if ($request->input('status') === 'successful') {
            $userId = $request->input('user_id');
            $user = User::find($userId);

            // Update user's subscription status
            $user->is_subscribed = true;
            $user->subscription_fee = $request->input('amount') / 100; // Convert back to original amount
            $user->subscription_type = $request->input('subscription_type'); // e.g., 'premium'
            $user->save();

            return response()->json(['message' => 'Subscription activated successfully.']);
        }

        return response()->json(['message' => 'Payment failed.'], 400);
    }
}
