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
        Schema::create('tb_reserve_slot', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_schedule')->constrained('tb_schedule')->onDelete('cascade');
            $table->foreignId('id_destination')->constrained('tb_destination')->onDelete('cascade');            
            $table->integer('code');
            $table->bigInteger("id_customer");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tb_reserve_slot');
    }
};
