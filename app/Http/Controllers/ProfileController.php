<?php

namespace App\Http\Controllers;

use App\Models\Characteristic;
use App\Models\Kink;
use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{



    /**
     * Display the user's profile form.
	 * 
	 * @param \Illuminate\Http\Request
     * @return \Inertia\Response
     */

    public function edit(Request $request): Response
    {

		$user = Auth::user();
		$user['pronounSet'] = $user->pronounSet();
		$characteristics = Characteristic::all();
		$pronounOptions = DB::table('pronouns')->where('id', '>', 2)->get();

		foreach ($characteristics as $characteristic) {
			$userHasCharacteristic = $user->characteristics()->where('characteristic_id', $characteristic->id)->exists();
			$characteristic['userHasCharacteristic'] = $userHasCharacteristic;
			$userPrefersCharacteristic = $user->prefersCharacteristic($characteristic);
			$characteristic['userPrefersCharacteristic'] = $userPrefersCharacteristic;
		}

        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
			'user' => $user,
			'characteristics' => $characteristics,
			'pronounOptions' => $pronounOptions,
            'status' => session('status'),
        ]);
    }



    /**
     * Update the user's profile information.
	 * 
	 * @param \App\Http\Requests\ProfileUpdateRequest
	 * @return \Illuminate\Http\RedirectResponse
     */

    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
		$request->user()->fill($request->validated());
		$request->user()->pronouns = (int) $request->pronounSet['id'];

		// Handle image file storage
		if ( $request->avatar ) {
			$time = time();
			$ext = $request->avatar->extension();
			$imageName = "avatar_{$request->username}_{$time}.{$ext}";
			$path = $request->avatar->storeAs('avatar', $imageName, 'public');
			$request->user()->avatar = "/storage/{$path}";
		}

		// If the user updates their email, the new address will need to be verified.
        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        return Redirect::back();
    }



    /**
     * Delete the user's account.
	 * 
	 * @param \Illuminate\Http\Request
	 * @return \Illuminate\Http\RedirectResponse
     */

    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }


	
}
