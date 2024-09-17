<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Link extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'title',
        'url',
        'is_active',
        'start_time',
        'end_time',
    ];


    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function linkClicks()
    {
        return $this->hasMany(LinkClick::class);
    }

}
