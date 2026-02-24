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
        Schema::table('tb_ticket', function (Blueprint $table) {
            //
            $table->string('midtrans_trans_id')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('tb_ticket', function (Blueprint $table) {
            //
            $table->dropColumn('midtrans_trans_id');
        });
    }
};
