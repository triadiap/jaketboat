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
        Schema::create('tb_payment', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_customer');
            $table->integer('total_passenger');
            $table->string('payment_code');
            $table->integer('total_payment');
            $table->enum('status_payment', ['pending', 'paid', 'cancelled'])->default('pending');
            $table->string('midtrans_trans_id')->nullable();
            $table->datetime("request_date");
            $table->datetime("complete_date");
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tb_payment');
    }
};
