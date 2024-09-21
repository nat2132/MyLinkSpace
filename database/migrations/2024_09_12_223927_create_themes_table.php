<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('themes', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->boolean('is_premium')->default(false);
            $table->string('background_type'); // 'color', 'gradient', 'image'
            $table->text('background_value');
            $table->string('text_color');
            $table->string('button_style'); // 'filled', 'outlined', 'shadow'
            $table->string('button_color');
            $table->string('button_text_color');
            $table->string('font_family');
            $table->string('button_font_family');
            $table->string('link_color')->nullable();
            $table->string('social_icon_style')->nullable(); // 'colored', 'monochrome'
            $table->string('social_icon_color')->nullable();
            $table->boolean('is_custom')->default(false);
            $table->unsignedBigInteger('user_id')->nullable(); // For custom themes
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('themes');
    }
};