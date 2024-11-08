<?php

namespace App\Http\Controllers;

use App\Models\Kink;
use App\Models\UserKink;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class KinkController extends Controller
{



	/**
     * Display the kink index page.
	 * @param \Illuminate\Http\Request
	 * @return \Inertia\Response
     */

    public function index(Request $request): Response
    {
		// Fetch all kinks in alphabetical order
		$kinks = Kink::orderBy('name', 'ASC')->get();
		
		foreach ($kinks as $kink) {
			$kink['rating_top'] = $kink->authRating(true);
			$kink['rating_bottom'] = $kink->authRating(false);
		}


		// Render the Kink Index page with the 'kinks' props
        return Inertia::render('Kinks/Index', [
            'kinks' => $kinks,
			'status' => session('status'),
        ]);
    }



	/**
     * Display an individual kink page.
	 * @param \App\Models\Kink
	 * @return \Inertia\Response
     */

    public function show(Kink $kink): Response
    {
		
		// Make sure the form can display all potential text formations
		$kink->text = [
			'top' => [
				ucfirst($kink->text(1,-1,true)),
				ucfirst($kink->text(1,0,true)),
				ucfirst($kink->text(1,1,true)),
				ucfirst($kink->text(1,2,true)),
				ucfirst($kink->text(1,3,true))
			],
			'bottom' => [
				ucfirst($kink->text(1,-1,false)),
				ucfirst($kink->text(1,0,false)),
				ucfirst($kink->text(1,1,false)),
				ucfirst($kink->text(1,2,false)),
				ucfirst($kink->text(1,3,false))
			],
		];

		// Get the currently logged in user's ratings of this kink.
		$userKink = Auth::user()
			->kinks()
			->where('kink_id', $kink->id)->first();

		//	Render the Kink Show page with the current kink info and
		//	the currently logged in user's relationship with that kink.
        return Inertia::render('Kinks/Show', [
            'kink' => $kink,
			'userKink' => $userKink,
			'status' => session('status'),
        ]);
    }



}
