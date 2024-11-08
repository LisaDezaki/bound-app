<?php

use App\Models\Kink;

// if (!function_exists('convertToUserKink')) {
//     function convertToUserKink(Kink $kink) {
// 		$kink->id = $kink->pivot->id;
// 		$kink->user_id = $kink->pivot->user_id;
// 		$kink->kink_id = $kink->pivot->kink_id;
// 		$kink->role = $kink->pivot->role;
// 		$kink->rating = $kink->pivot->rating;
// 		$kink->text = $kink->pivot->displayText();
// 		unset($kink->pivot);
// 		unset($kink->top);
// 		unset($kink->bottom);
// 		unset($kink->description);
// 		return $kink;
// 	}
// }

// if (!function_exists('prepareKinks')) {
//     function prepareKinks($kinks) {

// 		$preparedKinks = [];
// 		foreach ($kinks as $kink) {
// 			$preparedKinks[] = [
// 				'id' => $kink->id,
// 				'name' => $kink->name,
// 				'role' => 'top',
// 				'rating' => $kink->pivot->rating_top,
// 				'text' => $kink->pivot->displayText($kink->pivot->rating_top, 'top')
// 			];
// 			$preparedKinks[] = [
// 				'id' => $kink->id,
// 				'name' => $kink->name,
// 				'role' => 'bottom',
// 				'rating' => $kink->pivot->rating_bottom,
// 				'text' => $kink->pivot->displayText($kink->pivot->rating_bottom, 'bottom')
// 			];
// 		}
// 		return $preparedKinks;

// 	}
// }





if (!function_exists('kinkCompatibilityScore')) {
    function kinksCompatibilityScore($kink1, $kink2) {

		$score = 0;
		if ( $kink1['role'] != $kink2['role'] ) {
			$score = $kink1['rating'] * $kink2['rating'];
		}
		return $score;
	}
}



if (!function_exists('runMatchAnalysis')) {
    function runMatchAnalysis($list1, $list2) {

		$scores = [];
		$matches = [];

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

		// $matchesArray = [];
		// foreach ($matches as $key => $match) {
		// 	$matchesArray[] = $match;
		// }

		return $matches;

	}
}