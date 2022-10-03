<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Van extends Model
{
    use HasFactory;

    protected $table = 'van';

    protected $fillable = [
        'brand',
        'model',
        'unique_code',
    ];
}
