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
        Schema::create('my_works', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('source_name')->nullable();
            $table->string('source_url')->nullable();
            $table->string('preview_url')->nullable();
            $table->string('image')->nullable();
            $table->string('status');
            $table->integer('level');
            $table->string('framework')->nullable();
            $table->string('stack')->nullable();
            $table->string('host')->nullable();
            $table->string('github')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('my_works');
    }
};
