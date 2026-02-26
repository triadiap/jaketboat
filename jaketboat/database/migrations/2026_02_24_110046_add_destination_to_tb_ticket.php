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
            $table->bigInteger('id_destination_from')->nullable();
            $table->bigInteger('id_destination_to')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('tb_ticket', function (Blueprint $table) {
            //
            $table->dropColumn('id_destination_from');
            $table->dropColumn('id_destination_to');
        });
    }
};
