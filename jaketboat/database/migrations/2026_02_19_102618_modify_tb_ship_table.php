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
            $table->date('last_maintenance')->nullable();
            $table->date('next_maintenance')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('tb_ship', function (Blueprint $table) {
            //
            $table->dropColumn('last_maintenance');
            $table->dropColumn('next_maintenance');
        });
    }
};
