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
        Schema::create('animes', function (Blueprint $table) {
            $table->id();
            $table->string('title_ru', 1000)->nullable();
            $table->string('title_en', 1000)->nullable();
            $table->string('title_original', 1000);
            $table->string('description', 5000)->nullable();
            $table->string('description_short')->nullable();
            //тэги
            $table->boolean('censure')->default(true);
            $table->string('image')->nullable();
            //скриншоты
            //ссылки где смотреть
            $table->date('announce_date')->nullable();
            $table->date('release_date')->nullable();
            $table->integer('episode_time')->nullable();
            $table->integer('episodes_released')->nullable();
            $table->integer('episodes_total')->nullable();
            $table->string('kind')->nullable();
            $table->string('rating')->nullable(); // 0 1 6+ 2 13+ 3 16+ 4 17+ 5 18 6 Rx
            $table->string('style')->nullable(); //0 default, 1 3D, 2 specific
            $table->string('origins')->nullable();
            $table->string('author')->nullable();
            $table->integer('shiki_id')->nullable();
            $table->integer('mal_id')->nullable();
            $table->float('shiki_score')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('animes');
    }
};
