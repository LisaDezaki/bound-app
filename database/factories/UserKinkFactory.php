<?php

namespace Database\Factories;

use App\Models\Kink;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\UserKink>
 */
class UserKinkFactory extends Factory
{



    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */

    public function definition(): array
    {
        return [
			'user_id' => User::inRandomOrder()->first()->id,
            'kink_id' => Kink::inRandomOrder()->first()->id,
            'rating_top' => rand(-1,3),
            'rating_bottom' => rand(-1,3)
        ];
    }



}
