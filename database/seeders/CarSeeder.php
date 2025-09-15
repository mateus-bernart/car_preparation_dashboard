<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CarSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('cars')->insert([
            'brand' => 'Hyundai',
            'model' => 'Creta',
            'year' => 2024,
            'created_at' => now(),
        ]);
        DB::table('cars')->insert([
            'brand' => 'Fiat',
            'model' => 'Uno',
            'year' => 2023,
            'created_at' => now(),
        ]);
        DB::table('cars')->insert([
            'brand' => 'Toyota',
            'model' => 'Corolla',
            'year' => 2019,
            'created_at' => now(),
        ]);
        DB::table('cars')->insert([
            'brand' => 'Volkswagen',
            'model' => 'Gol',
            'year' => 2015,
            'created_at' => now(),
        ]);
    }
}
