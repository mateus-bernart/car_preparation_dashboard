<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        if (!Category::where('description', 'Mecânica')->exists()) {
            DB::table('categories')->insert([
                'description' => 'Mecânica',
                'status' => 1,
            ]);
        }
        if (!Category::where('description', 'Eletrônica')->exists()) {
            DB::table('categories')->insert([
                'description' => 'Eletrônica',
                'status' => 1,
            ]);
        }
        if (!Category::where('description', 'Limpeza')->exists()) {
            DB::table('categories')->insert([
                'description' => 'Limpeza',
                'status' => 1,
            ]);
        }
        if (!Category::where('description', 'Pintura')->exists()) {
            DB::table('categories')->insert([
                'description' => 'Pintura',
                'status' => 1,
            ]);
        }
    }
}
