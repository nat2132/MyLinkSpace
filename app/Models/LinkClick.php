<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LinkClick extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'link_id',
        'user_agent',
        'clicked_at',
    ];

        // Relationship to User model
        public function user()
        {
            return $this->belongsTo(User::class);
        }
    
        // Relationship to Link model
        public function link()
        {
            return $this->belongsTo(Link::class);
        }
}
