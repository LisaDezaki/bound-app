<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;

class PreferenceController extends Controller
{



	/**
	 * Update the logged in user's sought characteristics.
	 * 
	 * @param \Illuminate\Http\Request
	 * @return \Inertia\Response
	 */

	public function update(Request $request): RedirectResponse
	{

		//	Validate the request
		$validated = $request->validate([
			'characteristics' => 'required|array',
			'characteristics.*.id' => 'integer|exists:characteristics,id',
			'characteristics.*.name' => 'string|exists:characteristics,name',
			'characteristics.*.userPrefersCharacteristic' => 'boolean|nullable'
		]);

		//	Prepare data for sync with user preferences
		$preparedForSync = [];
		$characteristics = $validated['characteristics'];
		foreach ($characteristics as $characteristic) {
			if ($characteristic['userPrefersCharacteristic'] !== null) {
				$preparedForSync[$characteristic['id']] = [
					'preference' => $characteristic['userPrefersCharacteristic']
				];
			}
		}

		//	Sync the data with the user's preferences
		Auth::user()->preferences()->sync($preparedForSync);

		//	Redirect back
		return Redirect::back();

	}



}
