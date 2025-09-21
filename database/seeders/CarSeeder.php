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
            'plate_number' => 'JPL3H29',
            'color' => 'Preto',
            'kilometers' => 13500,
            'created_at' => now(),
        ]);
        DB::table('cars')->insert([
            'brand' => 'Fiat',
            'model' => 'Uno',
            'year' => 2023,
            'plate_number' => 'MQA5K87',
            'color' => 'Branco',
            'kilometers' => 10000,
            'created_at' => now(),
        ]);
        DB::table('cars')->insert([
            'brand' => 'Toyota',
            'model' => 'Corolla',
            'year' => 2019,
            'plate_number' => 'TRX2B64',
            'color' => 'Vermelho',
            'kilometers' => 50000,
            'created_at' => now(),
        ]);
        DB::table('cars')->insert([
            'brand' => 'Volkswagen',
            'model' => 'Gol',
            'year' => 2015,
            'plate_number' => 'VNZ9D31',
            'color' => 'Preto',
            'kilometers' => 0,
            'created_at' => now(),
        ]);
        DB::table('cars')->insert([
            'brand' => 'Chevrolet',
            'model' => 'Onix',
            'year' => 2022,
            'plate_number' => 'ABC1D23',
            'color' => 'Cinza',
            'kilometers' => 22000,
            'created_at' => now(),
        ]);
    }
}
