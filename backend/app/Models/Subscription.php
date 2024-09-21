<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class Subscription extends Model
{
    use HasFactory;

    protected $fillable = [
        'plan_id',
        'starts_at',
        'ends_at',
        'status',
        'payment_method',
    ];

    protected $dates = [
        'starts_at',
        'ends_at',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function plan()
    {
        return $this->belongsTo(Plan::class);
    }

    // Scope to get active subscriptions
    public function scopeActive($query)
    {
        return $query->where('status', 'active')
                     ->where('ends_at', '>', Carbon::now());
    }

    // Check if subscription is active
    public function isActive()
    {
        return $this->status === 'active' && $this->ends_at > Carbon::now();
    }

    // Check if subscription is canceled
    public function isCanceled()
    {
        return $this->status === 'canceled';
    }

    // Cancel subscription
    public function cancel()
    {
        $this->status = 'canceled';
        $this->save();
    }

    // Renew subscription
    public function renew($duration = 30)
    {
        $this->ends_at = $this->ends_at->addDays($duration);
        $this->status = 'active';
        $this->save();
    }

    // Get remaining days
    public function getRemainingDays()
    {
        return $this->ends_at->diffInDays(Carbon::now());
    }
}