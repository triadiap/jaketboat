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
        Schema::create('tb_schedule', function (Blueprint $table) {
            $table->id();
            $table->date('tanggal');
            $table->time('jam_berangkat');
            $table->foreignId('id_route')->constrained('tb_route')->onDelete('cascade');
            $table->foreignId('id_ship')->constrained('tb_ship')->onDelete('cascade');
            $table->integer('price');
            $table->enum('flag', ['ACTIVE', 'INACTIVE'])->default('ACTIVE');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tb_schedule');
    }
};
