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
        Schema::table('table_name', function (Blueprint $table) {
            $table->integer('type')->default(0); // 0 anime, 1 manga
            $table->integer('rating')->default(0); // 0 1 6+ 2 13+ 3 16+ 4 17+ 5 18 6 Rx
            $table->boolean('colored')->default(false);
            $table->integer('style')->default(0); //0 default, 1 3D, 2 specific
            $table->integer('totalPages')->default(0);

        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
