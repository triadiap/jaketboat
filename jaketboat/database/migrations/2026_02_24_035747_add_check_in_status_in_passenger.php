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
            $table->boolean('is_check_in')->default(false);
            $table->timestamp('checked_at')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('tb_passenger', function (Blueprint $table) {
            //
            $table->dropColumn('is_check_in');
            $table->dropColumn('checked_at');
        });
    }
};
