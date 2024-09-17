<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'profile_id',
        'user_agent',
        'viewed_at',
    ];

    public function profileViews()
    {
        return $this->hasMany(ProfileView::class);
    }
}
