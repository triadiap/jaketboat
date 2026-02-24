<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Ticket extends Model
{
    //
    protected $table = 'tb_ticket';
    protected $fillable = [
        'id_schedule',
        'id_customer',
        'total_passenger',
        'payment_code',
        'total_payment',
        'status',
    ];

    public function schedule()
    {
        return $this->belongsTo(Schedule::class, 'id_schedule');
    }
    
    public function passengers()
    {
        return $this->hasMany(Passenger::class, 'id_request');
    }
}
