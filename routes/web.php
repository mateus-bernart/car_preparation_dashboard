<?php

use App\Http\Controllers\CarController;
use App\Http\Controllers\ChecklistController;
use App\Http\Controllers\DashboardController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'dashboard'])->name('dashboard');

    // ============ Cars ============
    Route::get('/cars', [CarController::class, 'index'])->name('cars.index');
    Route::get('/cars/create', [CarController::class, 'create'])->name('cars.create');
    Route::get('/cars/{car}', [CarController::class, 'show'])->name('cars.show');
    Route::post('/cars', [CarController::class, 'store'])->name('cars.store');
    Route::delete('/cars/{car}', [CarController::class, 'destroy'])->name('cars.destroy');
    Route::put('/cars/{car}/toggle-status', [CarController::class, 'toggleStatus'])->name('cars.toggleStatus');

    // ============ Checklists ============
    Route::get('/checklists', [ChecklistController::class, 'index'])->name('checklists.index');
    Route::get('/checklists/create', [ChecklistController::class, 'create'])->name('checklists.create');
    Route::post('/checklists', [ChecklistController::class, 'store'])->name('checklists.store');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
