<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\Relation;
use Illuminate\Database\Eloquent\Relations\Pivot;
use Illuminate\Support\Facades\DB;

class UserKink extends Pivot
{
	use HasFactory;
    protected $table = "user_kink";
	public $timestamps = false;



	/**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */

	protected $fillable  = [
		"user_id",
		"kink_id",
		"rating_top",
		"rating_bottom"
	];



	/**
     * Define the relationship to the User class.
     *
     * @return Relation
     */

	public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function kink()
    {
        return $this->belongsTo(Kink::class);
    }



}
