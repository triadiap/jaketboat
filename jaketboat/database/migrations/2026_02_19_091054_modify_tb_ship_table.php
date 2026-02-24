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
        Schema::table('tb_ship', function (Blueprint $table) {
            //
            $table->string('type');
            $table->integer('year');
            $table->string('registration_no');
            $table->string('engine');
            $table->integer('length');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('tb_ship', function (Blueprint $table) {
            $table->dropColumn(['type', 'year', 'registration_no', 'engine', 'length']);
        });
    }
};
