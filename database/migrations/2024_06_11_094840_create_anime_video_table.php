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
        Schema::create('anime_video', function (Blueprint $table) {
            $table->id();
            $table->foreignId('anime_id')->constrained('animes')->onDelete('cascade');
            $table->string('link');
            $table->string('team')->nullable();
            $table->string('player')->nullable();
            $table->integer('episode');
            $table->boolean('iframe')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('anime_video');
    }
};
