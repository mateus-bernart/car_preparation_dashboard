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
            $table->unsignedBigInteger("id_checklist")->nullable();
            $table->foreign("id_checklist")->references("id")->on('checklists')->onDelete('set null');
            $table->unsignedBigInteger("id_priority")->nullable();
            $table->foreign("id_priority")->references("id")->on('priorities')->onDelete('set null');
            $table->integer("status")->default(1);
            $table->string("brand");
            $table->string("model");
            $table->integer("year")->nullable();
            $table->string("customer")->nullable();
            $table->date("delivery_date")->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists("cars");
    }
};
