<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

class RenameNameToUsernameInUsersTable extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        if (Schema::hasColumn('users', 'name') && Schema::hasColumn('users', 'username')) {
            // If both 'name' and 'username' exist, copy data from 'name' to 'username' and drop 'name'
            DB::statement('UPDATE users SET username = name WHERE username IS NULL');
            Schema::table('users', function (Blueprint $table) {
                $table->dropColumn('name');
            });
        } elseif (Schema::hasColumn('users', 'name') && !Schema::hasColumn('users', 'username')) {
            // If only 'name' exists, rename it to 'username'
            Schema::table('users', function (Blueprint $table) {
                $table->renameColumn('name', 'username');
            });
        }
        // If only 'username' exists, do nothing
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (!Schema::hasColumn('users', 'name') && Schema::hasColumn('users', 'username')) {
            Schema::table('users', function (Blueprint $table) {
                $table->renameColumn('username', 'name');
            });
        }
    }
}
