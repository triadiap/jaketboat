<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RouteSeeder extends Seeder
{
    public function run(): void
    {
        $routes = [
            ['id' => 7,  'name' => 'Jalur I'],
            ['id' => 8,  'name' => 'Jalur II'],
            ['id' => 9,  'name' => 'Jalur III'],
            ['id' => 10, 'name' => 'Jalur IV'],
            ['id' => 11, 'name' => 'Lajur Wisata'],
        ];

        foreach ($routes as $data) {
            DB::table('tb_route')->updateOrInsert(
                ['id' => $data['id']],
                array_merge($data, ['created_at' => now(), 'updated_at' => now()])
            );
        }
    }
}
