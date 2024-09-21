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
        Schema::create('profiles', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('theme_id')->constrained()->onDelete('cascade');
            $table->foreignId('custom_theme_id')->nullable()->constrained()->onDelete('set null');
            $table->text('bio')->nullable();
            $table->string('profile_picture')->nullable();
            $table->string('custom_url')->nullable()->unique();
            $table->string('title')->nullable();
            $table->json('social_links')->nullable();
            $table->boolean('is_private')->default(false);
            $table->string('seo_title')->nullable();
            $table->text('seo_description')->nullable();
            $table->string('google_analytics_id')->nullable();
            $table->json('custom_meta')->nullable();
            $table->integer('view_count')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('profiles');
    }
};