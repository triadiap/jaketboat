<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Route extends Model
{
    //
    protected $table = "tb_route";

    protected $fillable = [
        'name',
    ];

    public function routeDetail()
    {
        return $this->hasMany(RouteDetail::class, 'id_route');
    }
}
