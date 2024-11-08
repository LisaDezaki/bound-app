<?php

namespace App\Http\Controllers;

use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;

class CharacteristicController extends Controller
{


	
	/**
	 * Add a character to the user's list of characteristics.
	 * 
	 * @param \Illuminate\Http\Request
	 * @return \Inertia\Response
	 */
	
	public function update(Request $request): RedirectResponse
	{
		
		//	Validate the request
		$validated = $request->validate([
			'selectedCharacteristics' => 'array',
			'selectedCharacteristics.*' => 'integer|exists:characteristics,id',
		]);
		$selectedCharacteristics = $validated['selectedCharacteristics'];

		//	Sync the requested characteristics with the currently logged in user
		Auth::user()->characteristics()->sync($selectedCharacteristics);

		return Redirect::back();

	}



}
