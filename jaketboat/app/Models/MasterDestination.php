<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MasterDestination extends Model
{
    protected $table = 'tb_destination';
    protected $fillable = [
        'name',
        'short_name',
    ];
}
