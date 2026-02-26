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
        Schema::table('tb_passenger', function (Blueprint $table) {
            //
            $table->string('titles')->nullable();
            $table->string('type_identity')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('tb_passenger', function (Blueprint $table) {
            //
            $table->dropColumn('titles');
            $table->dropColumn('type_identity');
        });
    }
};
