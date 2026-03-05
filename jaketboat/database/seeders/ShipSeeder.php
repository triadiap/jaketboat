<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ShipSeeder extends Seeder
{
    public function run(): void
    {
        $ships = [
            ['id' => 7,  'name' => 'KM. Batara',           'capacity' => 48, 'type' => 'Kapal Motor', 'year' => 2026, 'registration_no' => '1',  'engine' => '-', 'length' => 0, 'last_maintenance' => '2026-02-24', 'next_maintenance' => '2026-02-24'],
            ['id' => 8,  'name' => 'KM. Chabing Nusantara','capacity' => 48, 'type' => 'Kapal Motor', 'year' => 2026, 'registration_no' => '2',  'engine' => '-', 'length' => 0, 'last_maintenance' => '2026-02-24', 'next_maintenance' => '2026-02-24'],
            ['id' => 9,  'name' => 'KM. Dewandra',         'capacity' => 48, 'type' => 'Kapal Motor', 'year' => 2026, 'registration_no' => '3',  'engine' => '-', 'length' => 0, 'last_maintenance' => '2026-02-24', 'next_maintenance' => '2026-02-24'],
            ['id' => 10, 'name' => 'KM. Indra Kemala',     'capacity' => 48, 'type' => 'Kapal Motor', 'year' => 2026, 'registration_no' => '4',  'engine' => '-', 'length' => 0, 'last_maintenance' => '2026-02-24', 'next_maintenance' => '2026-02-24'],
            ['id' => 11, 'name' => 'KM. Samudra Biru',     'capacity' => 48, 'type' => 'Kapal Motor', 'year' => 2026, 'registration_no' => '5',  'engine' => '-', 'length' => 0, 'last_maintenance' => '2026-02-24', 'next_maintenance' => '2026-02-24'],
            ['id' => 12, 'name' => 'KM. Sangaji',          'capacity' => 48, 'type' => 'Kapal Motor', 'year' => 2026, 'registration_no' => '6',  'engine' => '-', 'length' => 0, 'last_maintenance' => '2026-02-24', 'next_maintenance' => '2026-02-24'],
            ['id' => 13, 'name' => 'KM. Paus Satu',        'capacity' => 80, 'type' => 'Kapal Motor', 'year' => 2026, 'registration_no' => '7',  'engine' => '-', 'length' => 0, 'last_maintenance' => '2026-02-24', 'next_maintenance' => '2026-02-24'],
            ['id' => 14, 'name' => 'KM. Paus Dua',         'capacity' => 80, 'type' => 'Kapal Motor', 'year' => 2026, 'registration_no' => '8',  'engine' => '-', 'length' => 0, 'last_maintenance' => '2026-02-24', 'next_maintenance' => '2026-02-24'],
            ['id' => 15, 'name' => 'KM. Paus Tiga',        'capacity' => 80, 'type' => 'Kapal Motor', 'year' => 2026, 'registration_no' => '9',  'engine' => '-', 'length' => 0, 'last_maintenance' => '2026-02-24', 'next_maintenance' => '2026-02-24'],
            ['id' => 16, 'name' => 'KM. Paus Empat',       'capacity' => 80, 'type' => 'Kapal Motor', 'year' => 2026, 'registration_no' => '10', 'engine' => '-', 'length' => 0, 'last_maintenance' => '2026-02-24', 'next_maintenance' => '2026-02-24'],
            ['id' => 17, 'name' => 'KM. Paus Lima',        'capacity' => 80, 'type' => 'Kapal Motor', 'year' => 2026, 'registration_no' => '11', 'engine' => '-', 'length' => 0, 'last_maintenance' => '2026-02-24', 'next_maintenance' => '2026-02-24'],
            ['id' => 18, 'name' => 'KM. Paus Enam',        'capacity' => 80, 'type' => 'Kapal Motor', 'year' => 2026, 'registration_no' => '12', 'engine' => '-', 'length' => 0, 'last_maintenance' => '2026-02-24', 'next_maintenance' => '2026-02-24'],
            ['id' => 19, 'name' => 'KM. Paus Tujuh',       'capacity' => 80, 'type' => 'Kapal Motor', 'year' => 2026, 'registration_no' => '13', 'engine' => '-', 'length' => 0, 'last_maintenance' => '2026-02-24', 'next_maintenance' => '2026-02-24'],
            ['id' => 20, 'name' => 'KM. Kerapu 01',        'capacity' => 30, 'type' => 'Kapal Motor', 'year' => 2026, 'registration_no' => '14', 'engine' => '-', 'length' => 0, 'last_maintenance' => '2026-02-24', 'next_maintenance' => '2026-02-24'],
            ['id' => 21, 'name' => 'KM. Kerapu 02',        'capacity' => 30, 'type' => 'Kapal Motor', 'year' => 2026, 'registration_no' => '15', 'engine' => '-', 'length' => 0, 'last_maintenance' => '2026-02-24', 'next_maintenance' => '2026-02-24'],
            ['id' => 22, 'name' => 'KM. Kerapu 03',        'capacity' => 30, 'type' => 'Kapal Motor', 'year' => 2026, 'registration_no' => '16', 'engine' => '-', 'length' => 0, 'last_maintenance' => '2026-02-24', 'next_maintenance' => '2026-02-24'],
            ['id' => 23, 'name' => 'KM. Kerapu 04',        'capacity' => 30, 'type' => 'Kapal Motor', 'year' => 2026, 'registration_no' => '17', 'engine' => '-', 'length' => 0, 'last_maintenance' => '2026-02-24', 'next_maintenance' => '2026-02-24'],
            ['id' => 24, 'name' => 'KM. Kerapu 05',        'capacity' => 30, 'type' => 'Kapal Motor', 'year' => 2026, 'registration_no' => '18', 'engine' => '-', 'length' => 0, 'last_maintenance' => '2026-02-24', 'next_maintenance' => '2026-02-24'],
            ['id' => 25, 'name' => 'KM. Kerapu 06',        'capacity' => 30, 'type' => 'Kapal Motor', 'year' => 2026, 'registration_no' => '19', 'engine' => '-', 'length' => 0, 'last_maintenance' => '2026-02-24', 'next_maintenance' => '2026-02-24'],
        ];

        foreach ($ships as $data) {
            DB::table('tb_ship')->updateOrInsert(
                ['id' => $data['id']],
                array_merge($data, ['created_at' => now(), 'updated_at' => now()])
            );
        }
    }
}
