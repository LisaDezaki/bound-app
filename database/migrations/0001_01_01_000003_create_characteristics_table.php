<?php

use App\Models\Characteristic;
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
		Schema::create('pronouns', function (Blueprint $table) {
			$table->id();
			$table->string('short')
				->unique();
			$table->string('full')
				->unique();
		});

        Schema::create('characteristics', function (Blueprint $table) {
			$table->id();
			$table->string('name')
				->unique();
		});

		Schema::create('user_characteristic', function (Blueprint $table) {
            $table->id();
			$table->foreignIdFor(User::class, 'user_id')
				->constrained()
				->cascadeOnUpdate()
				->cascadeOnDelete();
			$table->foreignIdFor(Characteristic::class, 'characteristic_id')
				->constrained()
				->cascadeOnUpdate()
				->cascadeOnDelete();
			$table->unique(['user_id', 'characteristic_id']);
        });

		Schema::create('user_preference', function (Blueprint $table) {
			$table->id();
			$table->foreignIdFor(User::class, 'user_id')
				->constrained()
				->cascadeOnUpdate()
				->cascadeOnDelete();
			$table->foreignIdFor(Characteristic::class, 'characteristic_id')
				->constrained()
				->cascadeOnUpdate()
				->cascadeOnDelete();
			$table->boolean('preference')
				->nullable();
			$table->unique(['user_id', 'characteristic_id']);
		});
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pronouns');
        Schema::dropIfExists('characteristics');
        Schema::dropIfExists('user_characteristic');
        Schema::dropIfExists('user_preference');
    }
};
