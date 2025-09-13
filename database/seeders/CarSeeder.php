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
            'brand' => 'Creta',
            'model' => 'Fiat',
            'year' => 2024,
        ]);
        DB::table('cars')->insert([
            'brand' => 'Uno',
            'model' => 'Fiat',
            'year' => 2023,
        ]);
    }
}
