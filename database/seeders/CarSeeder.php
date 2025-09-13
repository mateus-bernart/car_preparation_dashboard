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
            'brand' => 'Hyunday',
            'model' => 'Creta',
            'year' => 2024,
        ]);
        DB::table('cars')->insert([
            'brand' => 'Fiat',
            'model' => 'Uno',
            'year' => 2023,
        ]);
    }
}
