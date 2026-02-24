<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ScheduleSlot extends Model
{
    protected $table = 'tb_slot';
    protected $fillable = [
        'id_schedule',
        'id_destination',
        'code',
        'availability',
    ];

    public function schedule()
    {
        return $this->belongsTo(Schedule::class, 'id_schedule');
    }

    public function destination()
    {
        return $this->belongsTo(MasterDestination::class, 'id_destination');
    }
}
