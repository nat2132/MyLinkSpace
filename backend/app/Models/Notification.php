<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Notification extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'type',
        'message',
        'data',
        'read_at',
    ];

    protected $casts = [
        'data' => 'array',
        'read_at' => 'datetime',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Scope for unread notifications
    public function scopeUnread($query)
    {
        return $query->whereNull('read_at');
    }

    // Scope for read notifications
    public function scopeRead($query)
    {
        return $query->whereNotNull('read_at');
    }

    // Mark notification as read
    public function markAsRead()
    {
        if (is_null($this->read_at)) {
            $this->read_at = now();
            $this->save();
        }
    }

    // Mark notification as unread
    public function markAsUnread()
    {
        if (!is_null($this->read_at)) {
            $this->read_at = null;
            $this->save();
        }
    }

    // Check if notification is read
    public function isRead()
    {
        return !is_null($this->read_at);
    }

    // Create a new notification
    public static function createNotification($userId, $type, $message, $data = [])
    {
        return static::create([
            'user_id' => $userId,
            'type' => $type,
            'message' => $message,
            'data' => $data,
        ]);
    }

    // Get notifications by type
    public static function getByType($userId, $type)
    {
        return static::where('user_id', $userId)
                     ->where('type', $type)
                     ->orderBy('created_at', 'desc')
                     ->get();
    }

    // Get recent notifications
    public static function getRecent($userId, $limit = 10)
    {
        return static::where('user_id', $userId)
                     ->orderBy('created_at', 'desc')
                     ->limit($limit)
                     ->get();
    }

    // Get notification count by type
    public static function getCountByType($userId)
    {
        return static::where('user_id', $userId)
                     ->select('type', DB::raw('count(*) as total'))
                     ->groupBy('type')
                     ->get()
                     ->pluck('total', 'type')
                     ->toArray();
    }

    // Delete old notifications
    public static function deleteOldNotifications($days = 30)
    {
        return static::where('created_at', '<', now()->subDays($days))->delete();
    }

    // Get notification data
    public function getNotificationData()
    {
        return [
            'id' => $this->id,
            'type' => $this->type,
            'message' => $this->message,
            'data' => $this->data,
            'read' => $this->isRead(),
            'created_at' => $this->created_at->toDateTimeString(),
        ];
    }
}
