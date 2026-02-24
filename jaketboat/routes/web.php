<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;
use App\Http\Controllers\HomeController;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::get('tiket',[HomeController::class, 'dashboard'] )->middleware(['auth', 'verified'])->name('dashboard');
Route::get('tujuan',[HomeController::class, 'destination'] )->middleware(['auth', 'verified'])->name('destination');
Route::get('kapal',[HomeController::class, 'ship'] )->middleware(['auth', 'verified'])->name('ship');
Route::get('pesanan',[HomeController::class, 'order'] )->middleware(['auth', 'verified'])->name('order');
Route::get('pesan_tiket/{id}',[HomeController::class, 'pesan'] )->middleware(['auth', 'verified'])->name('request_order');
Route::get('pesan_tiket_detail/{payment_code}',[HomeController::class, 'pesan_detail'] )->middleware(['auth', 'verified'])->name('request_order_detail');
Route::post('pesan_tiket_detail/{payment_code}',[HomeController::class, 'submitPassengers'] )->middleware(['auth', 'verified'])->name('submit_passenger');
Route::get('search',[HomeController::class, 'search'] )->middleware(['auth', 'verified'])->name('dashboard.search');

require __DIR__.'/settings.php';
