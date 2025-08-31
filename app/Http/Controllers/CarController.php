<?php

namespace App\Http\Controllers;

use App\Models\Car;
use Illuminate\Http\Request;

class CarController extends Controller
{
    public function index()
    {
        $cars = Car::all();
        return inertia('Car/Index')->with('cars', $cars);
    }

    public function create()
    {
        return inertia('Car/Create');
    }

    public function store(Request $request)
    {

        $validated = $request->validate([
            'brand' => 'required|string|max:255',
            'model' => 'required|string|max:255',
            'year' => 'nullable|integer|min:1886',
        ]);

        Car::create($validated);
        $cars = Car::all();
        return inertia('Car/Index')->with(['success' => 'Car created successfully.', 'cars' => $cars]);
    }

    public function destroy(Car $car)
    {
        $car->delete();
        $cars = Car::all();
        return inertia('Car/Index')->with(['success' => 'Car deleted successfully.', 'cars' => $cars]);
    }
}
