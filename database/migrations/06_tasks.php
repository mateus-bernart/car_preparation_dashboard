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
        Schema::create("tasks", function (Blueprint $table) {
            $table->bigIncrements("id");
            $table->foreignId("id_car")->nullable()->constrained('cars')->onDelete('set null');

            $table->unsignedBigInteger('id_checklist')->nullable();
            $table->foreign("id_checklist")->references("id")->on('checklists')->onDelete('cascade');

            $table->foreignId("id_category")->nullable()->constrained('categories')->onDelete('set null');

            $table->text("description");
            $table->integer("status")->default(0);
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
