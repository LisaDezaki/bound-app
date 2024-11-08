<?php

use App\Models\Kink;
use App\Models\User;
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
        Schema::create('kinks', function (Blueprint $table) {
            $table->id();
			$table->string('name')->unique();
			$table->string('aka')->nullable();
			$table->string('top')->nullable();
			$table->string('bottom')->nullable();
			$table->string('description')->nullable();
			$table->string('safety')->nullable();
        });

		Schema::create('user_kink', function (Blueprint $table) {
            $table->id();
			$table->foreignIdFor(User::class, 'user_id')
				->constrained()
				->cascadeOnUpdate()
				->cascadeOnDelete();
			$table->foreignIdFor(Kink::class, 'kink_id')
				->constrained()
				->cascadeOnUpdate()
				->cascadeOnDelete();
			$table->integer('rating_top')->signed();
			$table->integer('rating_bottom')->signed();
			$table->unique(['user_id', 'kink_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('kinks');
		Schema::dropIfExists('user_kink');
    }
};
