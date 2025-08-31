<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{

    public function up(): void
    {
        Schema::create("cars", function (Blueprint $table) {
            $table->id();
            $table->string("brand");
            $table->string("model");
            $table->integer("year")->nullable();
            $table->string("status")->default('active'); // 1-active, 2-inactive
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists("cars");
    }
};
