<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PrioritySeed extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('priorities')->insert([
            'description' => 'BAIXA',
            'status' => 1,
        ]);
        DB::table('priorities')->insert([
            'description' => 'MÉDIA',
            'status' => 1,
        ]);
        DB::table('priorities')->insert([
            'description' => 'ALTA',
            'status' => 1,
        ]);
    }
}
