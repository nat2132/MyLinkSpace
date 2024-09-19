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
        Schema::create('custom_themes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('name');
            $table->string('background_type'); // 'color', 'gradient', 'image'
            $table->text('background_value');
            $table->string('text_color');
            $table->string('button_style'); // 'filled', 'outlined', 'shadow'
            $table->string('button_color');
            $table->string('button_text_color');
            $table->string('font_family');
            $table->string('button_font_family');
            $table->string('link_color');
            $table->string('social_icon_style'); // 'colored', 'monochrome'
            $table->string('social_icon_color');
            $table->json('custom_css')->nullable();
            $table->boolean('is_active')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('custom_themes');
    }
};