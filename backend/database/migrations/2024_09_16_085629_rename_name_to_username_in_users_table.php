<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

class RenameNameToUsernameInUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * The users table already carries both columns in most installs.
     * Backfill missing usernames uniquely (suffix with id) instead of
     * renaming — the table keeps the 'name' column because several app
     * code paths still write to it.
     */
    public function up(): void
    {
        if (!Schema::hasColumn('users', 'username')) {
            Schema::table('users', function (Blueprint $table) {
                $table->string('username')->nullable();
                $table->unique('username');
            });
        }

        // Unique-safe backfill: suffix with id so duplicate names cannot collide.
        DB::statement("UPDATE users SET username = name || '-' || id::text WHERE username IS NULL AND name IS NOT NULL");
        DB::statement("UPDATE users SET username = 'user-' || id::text WHERE username IS NULL");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Non-destructive backfill; nothing to revert.
    }
}
