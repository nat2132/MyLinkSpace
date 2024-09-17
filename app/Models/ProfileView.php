<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProfileView extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'profile_id',
        'user_agent',
        'viewed_at',
    ];

    // Relationship to User model
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Relationship to Profile model
    public function profile()
    {
        return $this->belongsTo(Profile::class);
    }
}
