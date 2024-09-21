<?php

namespace App\Http\Controllers;

use App\Models\Subscription;
use App\Models\Plan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;

class SubscriptionController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $subscriptions = $user->subscriptions()->with('plan')->get();
        return response()->json($subscriptions);
    }

    public function show(Subscription $subscription)
    {
        $this->authorize('view', $subscription);
        return response()->json($subscription->load('plan'));
    }

    public function store(Request $request)
    {
        $user = Auth::user();
        
        $validatedData = $request->validate([
            'plan_id' => 'required|exists:plans,id',
            'payment_method' => 'required|string',
        ]);

        $plan = Plan::findOrFail($validatedData['plan_id']);

        $subscription = $user->subscriptions()->create([
            'plan_id' => $plan->id,
            'starts_at' => Carbon::now(),
            'ends_at' => Carbon::now()->addDays($plan->duration),
            'status' => 'active',
            'payment_method' => $validatedData['payment_method'],
        ]);

        return response()->json($subscription->load('plan'), 201);
    }

    public function cancel(Subscription $subscription)
    {
        $this->authorize('update', $subscription);

        if (!$subscription->isActive()) {
            return response()->json(['message' => 'Subscription is not active'], 400);
        }

        $subscription->cancel();

        return response()->json(['message' => 'Subscription canceled successfully']);
    }

    public function renew(Request $request, Subscription $subscription)
    {
        $this->authorize('update', $subscription);

        $validatedData = $request->validate([
            'duration' => 'sometimes|integer|min:1',
        ]);

        $duration = $validatedData['duration'] ?? 30;

        $subscription->renew($duration);

        return response()->json($subscription->fresh());
    }

    public function getRemainingDays(Subscription $subscription)
    {
        $this->authorize('view', $subscription);

        $remainingDays = $subscription->getRemainingDays();

        return response()->json(['remaining_days' => $remainingDays]);
    }

    public function getActiveSubscriptions()
    {
        $user = Auth::user();
        $activeSubscriptions = $user->subscriptions()->active()->with('plan')->get();
        return response()->json($activeSubscriptions);
    }
}
