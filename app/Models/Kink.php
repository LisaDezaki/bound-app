<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\Relation;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class Kink extends Model
{
    use HasFactory;

	public $timestamps = false;



    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */

    protected $fillable = [
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
			'user_kink'
		)->using(
			UserKink::class
		)->withPivot(['id', 'rating_top', 'rating_bottom']);
	}


	public function authRating($top = false)
	{
		$authKink = Auth::user()->kinks()->where('kink_id', $this->id)->first();
		// $this->test = $authKink;
		if ( isset($authKink) ) {
			return $top ? $authKink->pivot->rating_top : $authKink->pivot->rating_bottom;
		} else {
			return 0;
		}
	}



	/**
     * Construct the biographical text string for this kink based on pronouns, role, and rating
     *
     * @return string
     */

	public function text(Int $pronouns = 1, $rating = 0, $top = true)
	{
		$string = "";
		
		// Initial pronouns
		$pronouns = DB::table('pronouns')->where('id', '=', $pronouns)->first()->full;
		$pronouns = explode("/", $pronouns);

		// rating
		$string .= $rating === 0 ? "[0] is not interested in " : "";
		$string .= $rating === 1 ? "[0] is curious about " : "";
		$string .= $rating === 2 ? "[0] likes " : "";
		$string .= $rating === 3 ? "[0] loves " : "";
		$string .= $top === true ? $this->top : $this->bottom;
		$string .= $rating === -1 ? " is a hard limit for [1]" : "";

		// grammar fixes
		if ($pronouns[0] === 'I') {
			$string = str_replace(' likes ', ' like ', $string);
			$string = str_replace(' loves ', ' love ', $string);
			$string = str_replace('[0] is ', '[0] am ', $string);
		}
		if ($pronouns[0] === 'they' || $pronouns[0] === 'you') {
			$string = str_replace(' likes ', ' like ', $string);
			$string = str_replace(' loves ', ' love ', $string);
			$string = str_replace('[0] is ', '[0] are ', $string);
		}

		//	Pronoun insertions
		$string = str_replace('[0]', $pronouns[0], $string);
		$string = str_replace('[1]', $pronouns[1], $string);
		$string = str_replace('[2]', $pronouns[2], $string);
		$string = str_replace('[3]', $pronouns[3], $string);
		$string = str_replace('[4]', $pronouns[4], $string);

		return $string;
	}



}
