<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DefaultTasksSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('default_tasks')->insert([
            'id_category' => 1,
            'description' => 'Mecânica',
        ]);
        DB::table('default_tasks')->insert([
            'id_category' => 2,
            'description' => 'Eletrônica',
        ]);
        DB::table('default_tasks')->insert([
            'id_category' => 3,
            'description' => 'Limpeza',
        ]);
        DB::table('default_tasks')->insert([
            'id_category' => 4,
            'description' => 'Pintura',
        ]);
    }
}
