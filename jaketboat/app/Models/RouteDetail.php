<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RouteDetail extends Model
{
    //
    protected $table = "tb_route_detail";

    protected $fillable = [
        'id_route',
        'no',
        'id_destination',
    ];

    public function route()
    {
        return $this->belongsTo(Route::class, 'id_route');
    }

    public function destination()
    {
        return $this->belongsTo(MasterDestination::class, 'id_destination');
    }
}
