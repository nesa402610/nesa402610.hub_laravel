<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up(): void {
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('source')->nullable();
            $table->string('sourceURL')->nullable();
            $table->string('previewURL')->nullable();
            $table->string('status');
            $table->string('level');
            $table->string('framework')->nullable();
            $table->string('stack')->nullable();
            $table->string('host');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down(): void {
        Schema::dropIfExists('projects');
    }
};
