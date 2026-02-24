<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Passenger extends Model
{
    //
    protected $table = 'tb_passenger';
    protected $fillable = [
        'id_request',
        'name',
        'nik',
        'code',
        'booking_code',
        'is_check_in',
        'checked_at',
    ];

    public function ticket()
    {
        return $this->belongsTo(Ticket::class, 'id_request');
    }
}
