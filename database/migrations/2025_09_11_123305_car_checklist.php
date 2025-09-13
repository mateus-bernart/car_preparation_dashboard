<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create("car_checklist", function (Blueprint $table) {
            $table->bigIncrements("id");
            $table->foreignId("id_car")->constrained('cars')->onDelete('cascade');
            $table->foreignId("id_checklist")->constrained('checklists')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
