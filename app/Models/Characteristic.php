<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\Relation;
use Illuminate\Support\Facades\Auth;

class Characteristic extends Model
{
    use HasFactory;

	public $timestamps = false;



    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */

    protected $fillable = [
        'name',
        'description'
    ];



    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */

    protected $hidden = [
    ];



    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
	
    protected function casts(): array
    {
        return [
        ];
    }



	/**
     * Define the relationship to the User class.
     *
     * @return Relation
     */

	public function users(): BelongsToMany
	{
		return $this->belongsToMany(
			User::class,
			'user_characteristic'
		);
	}

	public function preferredByAuth(): bool | null
	{
		$authPrefs = Auth::user()->preferences->toArray();
		$authPref  = array_filter($authPrefs, function ($pref) {
			return $pref['id'] == $this->id;
		});
		if (count($authPref) > 0) {
			return (bool) reset($authPref)['pivot']['preference'];
		} else {
			return null;
		}
	}
}
