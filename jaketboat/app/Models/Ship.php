<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Ship extends Model
{
    //
    protected $table = "tb_ship";

    protected $fillable = [
        "name",
        "capacity",
        "type",
        "year",
        "registration_no",
        "engine",
        "length",        
        "last_maintenance",
        "next_maintenance",
    ];

    protected $casts = [
        "last_maintenance" => "date",
        "next_maintenance" => "date",
    ];
}
