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
        Schema::create('tb_ticket', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_schedule')->constrained('tb_schedule')->cascadeOnDelete();
            $table->foreignId('id_customer');
            $table->integer('total_passenger');
            $table->string('payment_code');
            $table->integer('total_payment');
            $table->enum('status', ['pending', 'paid', 'cancelled'])->default('pending');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tb_ticket');
    }
};
