<?php

use App\Http\Controllers\CharacteristicController;
use App\Http\Controllers\KinkController;
use App\Http\Controllers\PreferenceController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\UserKinkController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


//	Guest Routes

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

//	Dashboard

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');


//	Auth User Profile

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

	Route::patch('/characteristics', [CharacteristicController::class, 'update'])->name('characteristics.update');
	Route::patch('/preferences', [PreferenceController::class, 'update'])->name('preferences.update');
});


//	Kink Management

Route::middleware('auth')->group(function () {
	Route::get('/kinks', [KinkController::class, 'index'])->name('kinks.index');
    Route::get('/kinks/{kink}', [KinkController::class, 'show'])->name('kinks.show');

	Route::post('/kinks/{kink}', [UserKinkController::class, 'store'])->name('userkink.store');
	Route::patch('/kinks/{kink}', [UserKinkController::class, 'update'])->name('userkink.update');
	Route::patch('/kinks', [UserKinkController::class, 'updateAll'])->name('userkink.updateAll');
	Route::delete('/kinks/{kink}', [UserKinkController::class, 'destroy'])->name('userkink.destroy');
});


//	User Matches

Route::middleware('auth')->group(function () {
	Route::get('/users', [UserController::class, 'index'])->name('users.index');
	Route::get('/users/{user}', [UserController::class, 'show'])->name('users.show');
});

require __DIR__.'/auth.php';