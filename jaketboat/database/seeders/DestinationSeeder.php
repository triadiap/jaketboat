<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DestinationSeeder extends Seeder
{
    public function run(): void
    {
        $destinations = [
            ['id' => 9,  'name' => 'Muara Angke', 'short_name' => 'MKE'],
            ['id' => 10, 'name' => 'Untung Jawa',  'short_name' => 'UTJ'],
            ['id' => 11, 'name' => 'Lancang',       'short_name' => 'LCG'],
            ['id' => 12, 'name' => 'Payung',        'short_name' => 'PYG'],
            ['id' => 13, 'name' => 'Tidung',        'short_name' => 'TDG'],
            ['id' => 14, 'name' => 'Panggang',      'short_name' => 'PGG'],
            ['id' => 15, 'name' => 'Pramuka',       'short_name' => 'PMK'],
            ['id' => 16, 'name' => 'Pari',          'short_name' => 'PRI'],
            ['id' => 17, 'name' => 'Kelapa',        'short_name' => 'KLP'],
            ['id' => 18, 'name' => 'Sabira',        'short_name' => 'SBR'],
            ['id' => 19, 'name' => 'Cipir',         'short_name' => 'CPR'],
            ['id' => 20, 'name' => 'Onrust',        'short_name' => 'ORT'],
            ['id' => 21, 'name' => 'Bidadari',      'short_name' => 'BDR'],
        ];

        foreach ($destinations as $data) {
            DB::table('tb_destination')->updateOrInsert(
                ['id' => $data['id']],
                array_merge($data, ['created_at' => now(), 'updated_at' => now()])
            );
        }
    }
}
