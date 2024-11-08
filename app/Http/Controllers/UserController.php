<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class UserController extends Controller
{



	/**
     * Display the user index page.
	 * 
	 * @param \Illuminate\Http\Request
	 * @return \Inertia\Response
     */

    public function index(Request $request): Response
    {
		//	Get all users except the currently logged in user
		$users = User::where('id', '!=', Auth::id())
			->get(['id', 'avatar', 'username', 'pronouns']);

		//	Fetch the pronouns string and generate a random color for the avatar
		foreach ($users as $user) {
			$user['characteristics'] = $user->characteristics;
			$user['kinks'] = $user->kinklist();
			$user['matchInfo'] = Auth::user()->matchWith($user);
			$user['pronounSet'] = $user->pronounSet();
			$user['color'] = [sprintf('#%06X', mt_rand(0, 0xFFFFFF))];
			foreach ($user['characteristics'] as $characteristic) {
				$characteristic['userPrefersCharacteristic'] = $characteristic->preferredByAuth();
			}
		}

		//	Render the User Index page with the 'users' props
        return Inertia::render('Users/Index', [
			'users' => $users,
			'status' => session('status'),
        ]);
    }



    /**
     * Display an individual user page.
	 * 
	 * @param \App\Models\User
	 * @return \Inertia\Response
     */
    public function show(User $user): Response
    {
		// Get the logged in user's match info for the currently viewed user
		$matches = Auth::user()->matchWith($user);
		
		// Get the profile info for the currently viewed user
		$user['characteristics'] = $user->characteristics;
		$user['pronounSet'] = $user->pronounSet();
		$user['kinks'] = $user->kinklist();
		foreach ( $user['kinks'] as $kink ) {
			$kink['text'] = ucfirst($kink['text']).'.';
		}
		foreach ($user['characteristics'] as $characteristic) {
			$characteristic['userPrefersCharacteristic'] = $characteristic->preferredByAuth();
		}

		//	Render the User Show page
        return Inertia::render('Users/Show', [
			'matches' => $matches,
			'user' => $user,
			'status' => session('status'),
        ]);
    }



}