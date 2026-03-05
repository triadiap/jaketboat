<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RouteDetailSeeder extends Seeder
{
    public function run(): void
    {
        $details = [
            // Jalur 1 (id_route=7): MKE → UTJ → LCG → PYG → TDG
            ['id' => 24, 'id_route' => 7,  'no' => 1, 'id_destination' => 9],
            ['id' => 25, 'id_route' => 7,  'no' => 2, 'id_destination' => 10],
            ['id' => 26, 'id_route' => 7,  'no' => 3, 'id_destination' => 11],
            ['id' => 27, 'id_route' => 7,  'no' => 4, 'id_destination' => 12],
            ['id' => 28, 'id_route' => 7,  'no' => 5, 'id_destination' => 13],

            // Jalur II (id_route=8): MKE → UTJ → PRI → PGG → PMK
            ['id' => 29, 'id_route' => 8,  'no' => 1, 'id_destination' => 9],
            ['id' => 30, 'id_route' => 8,  'no' => 2, 'id_destination' => 10],
            ['id' => 31, 'id_route' => 8,  'no' => 3, 'id_destination' => 16],
            ['id' => 32, 'id_route' => 8,  'no' => 4, 'id_destination' => 14],
            ['id' => 33, 'id_route' => 8,  'no' => 5, 'id_destination' => 15],

            // Jalur III (id_route=9): MKE → PRI → PMK → KLP
            ['id' => 34, 'id_route' => 9,  'no' => 1, 'id_destination' => 9],
            ['id' => 35, 'id_route' => 9,  'no' => 2, 'id_destination' => 16],
            ['id' => 36, 'id_route' => 9,  'no' => 3, 'id_destination' => 15],
            ['id' => 37, 'id_route' => 9,  'no' => 4, 'id_destination' => 17],

            // Jalur IV (id_route=10): MKE → KLP → SBR
            ['id' => 38, 'id_route' => 10, 'no' => 1, 'id_destination' => 9],
            ['id' => 39, 'id_route' => 10, 'no' => 2, 'id_destination' => 17],
            ['id' => 40, 'id_route' => 10, 'no' => 3, 'id_destination' => 18],

            // Lajur Wisata (id_route=11): MKE → CPR → ORT → BDR
            ['id' => 41, 'id_route' => 11, 'no' => 1, 'id_destination' => 9],
            ['id' => 42, 'id_route' => 11, 'no' => 2, 'id_destination' => 19],
            ['id' => 43, 'id_route' => 11, 'no' => 3, 'id_destination' => 20],
            ['id' => 44, 'id_route' => 11, 'no' => 4, 'id_destination' => 21],
        ];

        foreach ($details as $data) {
            DB::table('tb_route_detail')->updateOrInsert(
                ['id' => $data['id']],
                array_merge($data, ['created_at' => now(), 'updated_at' => now()])
            );
        }
    }
}
