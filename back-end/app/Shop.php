<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Shop extends Model
{
    protected $fillable = [
        'google_id',
        'name',
        'image',
        'liked',
        'disliked_timeout',
    ];
}
