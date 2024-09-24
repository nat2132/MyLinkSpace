<?php

namespace App\Http\Controllers;

use App\Models\User;
use PayPal\Api\Payer;
use PayPal\Api\Amount;
use PayPal\Api\Payment;
use PayPal\Api\ItemList;
use PayPal\Api\Transaction;
use Illuminate\Http\Request;
use PayPal\Api\RedirectUrls;
use Illuminate\Support\Facades\DB;
use PayPal\Api\Item;
use PayPal\Rest\ApiContext;
use PayPal\Auth\OAuthTokenCredential;


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

    private function apiContext()
    {
        $paypalConfig = config('paypal'); // Load PayPal configuration

        $apiContext = new ApiContext(
            new OAuthTokenCredential(
                $paypalConfig['client_id'], // PayPal client ID
                $paypalConfig['secret']      // PayPal secret
            )
        );

        $apiContext->setConfig([
            'mode' => $paypalConfig['mode'], // 'sandbox' or 'live'
            'log.LogEnabled' => true,
            'log.FileName' => storage_path('logs/paypal.log'),
            'log.LogLevel' => 'DEBUG', // Use 'INFO' in production
            'cache.enabled' => true,
        ]);

        return $apiContext;
    }
    private function initiatePayment($user, $amount, $subscriptionType)
    {
        $payer = new Payer();
        $payer->setPaymentMethod('paypal');

        $itemList = new ItemList();
        $item = (new \PayPal\Api\Item())
            ->setName($subscriptionType)
            ->setCurrency('USD')
            ->setQuantity(1)
            ->setPrice($amount); // Amount in USD

        $itemList->addItem($item);

        $amountDetails = (new Amount())
            ->setCurrency('USD')
            ->setTotal($amount);

        $transaction = (new Transaction())
            ->setAmount($amountDetails)
            ->setItemList($itemList)
            ->setDescription('Subscription for ' . $subscriptionType);

        $redirectUrls = new RedirectUrls();
        $redirectUrls->setReturnUrl(route('payment.success')) // Set up your success URL
            ->setCancelUrl(route('payment.cancel')); // Set up your cancel URL

        $payment = new Payment();
        $payment->setIntent('sale')
            ->setPayer($payer)
            ->setRedirectUrls($redirectUrls)
            ->setTransactions([$transaction]);

        

        try {
            $payment->create($this->apiContext());
            return response()->json(['paymentUrl' => $payment->getApprovalLink()]);
        } catch (\Exception $ex) {
            return response()->json(['error' => $ex->getMessage()], 500);
        }

        
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