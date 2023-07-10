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
        Schema::create('anime_user_status', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('anime_id');
            $table->unsignedBigInteger('user_id');
            $table->integer('status')->default(0);
            // 0 бросил, 1 смотрю, 2 просмотрел, 3 противно не смотрю такое, 4 в планах, 5 пересматриваю,
            $table->timestamps();

            $table->foreign('anime_id')->references('id')->on('h_collections')->onDelete('cascade');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('anime_user_status');
    }
};
