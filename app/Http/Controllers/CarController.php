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
        ], [
            'brand.required' => 'O campo marca é obrigatório.',
            'brand.string' => 'O campo marca deve ser uma string.',
            'brand.max' => 'O campo marca não pode exceder 255 caracteres.',
            'model.required' => 'O campo modelo é obrigatório.',
            'model.string' => 'O campo modelo deve ser uma string.',
            'model.max' => 'O campo modelo não pode exceder 255 caracteres.',
            'year.integer' => 'O campo ano deve ser um número inteiro.',
            'year.min' => 'O campo ano deve ser no mínimo 1886.',
        ]);

        Car::create($validated);
        $cars = Car::all();
        return inertia('Car/Index')->with(['success' => 'Carro adicionado com sucesso.', 'cars' => $cars]);
    }

    public function destroy(Car $car)
    {
        $car->delete();
        $cars = Car::all();
        return redirect()->route('cars.index')->with(['cars' => $cars]);
    }

    public function toggleStatus(Car $car)
    {
        $car->status === 'ativo' ? $car->status = 'inativo' : $car->status = 'ativo';
        $car->save();
        $cars = Car::all();
        return redirect()->route('cars.index', ['cars' => $cars]);
    }
}
