<?php

namespace App\Http\Controllers;

use App\Models\Kink;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;

class UserKinkController extends Controller
{



    /**
     * Add a kink to the current user's kink list.
	 * 
	 * @param \Illuminate\Http\Request
	 * @return \Illuminate\Http\RedirectResponse
     */

	public function store(Request $request): RedirectResponse
    {

		//	Attach a new kink to the currently logged in user
		Auth::user()->kinks()->attach(
			$request->id,
			[
				'rating_top' => $request->pivot['rating_top'],
				'rating_bottom' => $request->pivot['rating_bottom']
			]
		);

		return Redirect::back();

    }



	/**
     * Update a kink in the current user's kink list.
	 * 
	 * @param \App\Models\Kink
	 * @param \Illuminate\Http\Request
	 * @return \Illuminate\Http\RedirectResponse
     */

	public function update(Kink $kink, Request $request): RedirectResponse
    {

		// $kinkSync = [];


		//	Update a kink on the currently logged in user
		Auth::user()->kinks()->updateExistingPivot(
			$request->id,
			[
				'rating_top' => $request->pivot['rating_top'],
				'rating_bottom' => $request->pivot['rating_bottom']
			]
		);

		return Redirect::back();

    }

	public function updateAll(Request $request): RedirectResponse
	{
		$kinkSync = [];
		foreach ($request->kinks as $kink) {
			if ( $kink['rating_top'] != 0 || $kink['rating_bottom'] != 0 ) {
				$kinkSync[$kink['id']] = [
					'rating_top' => $kink['rating_top'],
					'rating_bottom' => $kink['rating_bottom']
				];
			}
		}
		
		Auth::user()->kinks()->sync($kinkSync);

		return Redirect::back();
	}

	//	Prepare data for sync with user preferences
	// $preparedForSync = [];
	// $characteristics = $validated['characteristics'];
	// foreach ($characteristics as $characteristic) {
	// 	if ($characteristic['userPrefersCharacteristic'] !== null) {
	// 		$preparedForSync[$characteristic['id']] = [
	// 			'preference' => $characteristic['userPrefersCharacteristic']
	// 		];
	// 	}
	// }
	// Sync the data with the user's preferences
	// Auth::user()->preferences()->sync($preparedForSync);



	/**
     * Remove a kink from the current user's kink list.
	 * 
	 * @param \Illuminate\Http\Request
	 * @return \Illuminate\Http\RedirectResponse
     */
	
	public function destroy(Request $request): RedirectResponse
    {

		//	Remove a kink from the currently logged in user
		Auth::user()->kinks()->detach($request->kink['id']);

		return Redirect::back();

    }



}