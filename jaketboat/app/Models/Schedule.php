<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Schedule extends Model
{
    protected $table = 'tb_schedule';
    protected $fillable = [
        'tanggal',
        'jam_berangkat',
        'id_route',
        'id_ship',
        'price',
        'flag',
    ];

    public function route()
    {
        return $this->belongsTo(Route::class, 'id_route');
    }

    public function ship()
    {
        return $this->belongsTo(Ship::class, 'id_ship');
    }

    public function slot(){
        return $this->hasMany(ScheduleSlot::class, 'id_schedule');
    }
}
