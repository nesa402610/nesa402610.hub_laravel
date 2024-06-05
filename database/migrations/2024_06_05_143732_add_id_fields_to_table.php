<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('h_collections', function (Blueprint $table) {
            $table->integer('shiki_id');
            $table->integer('mal_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('h_collections', function (Blueprint $table) {
            $table->dropColumn('shiki_id');
            $table->dropColumn('mal_id');
        });
    }
};
