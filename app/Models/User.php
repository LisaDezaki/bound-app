<?php

namespace App\Models;

use App\Models\Characteristic;
use App\Models\Kink;
use App\Models\UserKink;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\Relation;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class User extends Authenticatable
{

    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;



    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */

    protected $fillable = [
		'avatar',
        'username',
		'pronouns',
        'email',
        'password',
    ];



    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */

    protected $hidden = [
        'password',
        'remember_token',
    ];



    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }



	/**
     * Define the relationship to the Characteristic class.
     *
     * @return Relation
     */

	public function characteristics()
	{
		return $this->belongsToMany(
			Characteristic::class,
			'user_characteristic'
		);
	}

	public function preferences()
	{
		return $this->belongsToMany(
			Characteristic::class,
			'user_preference'
		)->withPivot('preference');
	}

	public function hasCharacteristic(Characteristic $characteristic)
	{
		return $this->characteristics()
			->where('id', $characteristic->id)
			->exists();
	}

	public function prefersCharacteristic(Characteristic $characteristic)
	{
		$record = $this->preferences()
			->where('characteristic_id', $characteristic->id)
			->withPivot('preference')
			->first();

		return isset($record) ? (bool) $record->pivot->preference : null;
	}



	/**
     * Define the relationship to the Kink class.
     *
     * @return Relation
     */

	public function kinks()
	{
		return $this->belongsToMany(
			Kink::class,
			'user_kink'
		)->using(
			UserKink::class
		)->withPivot(['id', 'rating_top', 'rating_bottom']);
	}



	/**
     * Fetch the pronoun strings.
     *
     * @return object|null
     */

	public function pronounSet()
	{
		return DB::table('pronouns')
			->where('id', $this->pronouns)
			->first();
	}



	/**
     * Fetch the characteristics the user is seeking.
     *
     * @return object|null
     */

	 public function seeking()
	 {
		return DB::table('user_preference')
			->where('user_id', $this->id)
			->join('characteristics', 'user_preference.characteristic_id', '=', 'characteristics.id')
			->select('user_preference.*', 'characteristics.name');
	 }



	/**
     * Return a list of the user's kinks ready for display on the front-end
     *
     * @return array
     */
	public function kinkList()
	{
		$list = [];
		$kinks = $this->kinks()->get();
		$pronouns = $this->id !== Auth::id() ? $this->pronouns : 2;

		foreach ($kinks as $kink) {
			$list[] = [
				'id' => $kink->id,
				'name' => $kink->name,
				'role' => 'top',
				'rating' => $kink->pivot->rating_top,
				'text' => $kink->text($pronouns, $kink->pivot->rating_top, true)
			];
			$list[] = [
				'id' => $kink->id,
				'name' => $kink->name,
				'role' => 'bottom',
				'rating' => $kink->pivot->rating_bottom,
				'text' => $kink->text($pronouns, $kink->pivot->rating_bottom, false)
			];
		}

		return $list;
	}



	/**
     * Get the complementary kinks between this user and another user.
     *
     * @return array<array>
     */

	 public function matchWith(User $user)
	 {
		$matches = [];
		$list1 = Auth::user()->kinklist();
		$list2 = $user->kinklist();

		foreach ($list1 as $kink1) {
			foreach ($list2 as $kink2) {

				if (
					$kink1['name'] === $kink2['name'] &&
					$kink1['role'] != $kink2['role'] &&
					($kink1['rating'] > 0 && $kink2['rating'] > 0)
				) {
					$matches[] = [
						'id' => $kink1['id'],
						'name' => $kink1['name'],
						'user1' => [
							'rating' => $kink1['rating'],
							'role' => $kink1['role']
						],
						'user2' => [
							'rating' => $kink2['rating'],
							'role' => $kink2['role']
						],
						'score' => $kink1['rating'] + $kink2['rating'],
						'text' => ucfirst($kink1['text'] . " and " . $kink2['text'])."."
					];
				}
			}
		}

		return $matches;

	}






}