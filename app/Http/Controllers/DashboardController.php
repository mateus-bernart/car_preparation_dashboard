<?php

namespace App\Http\Controllers;

use App\Models\Car;

class DashboardController extends Controller
{
    public function dashboard()
    {
        $cars = Car::all();
        return inertia('dashboard')->with(['cars' => $cars]);
    }
}
