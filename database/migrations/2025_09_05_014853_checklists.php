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
        Schema::create("checklists", function (Blueprint $table) {
            $table->bigIncrements("id");
            $table->foreignId("id_car")->constrained("cars")->noActionOnDelete();
            $table->foreignId("id_user")->constrained("users")->noActionOnDelete();
            $table->foreignId("id_category")->constrained("categories")->noActionOnDelete();
            $table->string("description");
            $table->string("status");
            $table->timestamps();
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
