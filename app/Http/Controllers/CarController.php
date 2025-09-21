<?php

namespace App\Http\Controllers;

use App\Http\Requests\CarRequest;
use App\Models\Car;
use App\Services\CarService;
use Illuminate\Http\Request;
use Inertia\Inertia;

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

    public function store(CarRequest $request, CarService $service)
    {
        $service->save($request->validated());
        return redirect()->route('cars.index')
            ->with('success', 'Carro adicionado com sucesso.');
    }

    public function update(CarRequest $request, CarService $service, Car $car)
    {
        $service->save($request->validated(), $car);
        return redirect()->route('cars.index')->with('success', 'Carro atualizado com sucesso.');
    }

    public function edit(Car $car)
    {
        return inertia('Car/Create')->with([
            'car' => $car,
            'model' => $car->model,
            'brand' => $car->brand,
            'year' => $car->year,
            'plate_number' => $car->plate_number,
            'kilometers' => $car->kilometers,
        ]);
    }

    public function destroy(Car $car)
    {
        $car->delete();
        return redirect()->route('cars.index')->with('success', "Carro removido com sucesso!");
    }

    public function toggleActive(Car $car)
    {
        $car->active === 1 ? $car->active = 2 : $car->active = 1;
        $car->save();
        return back();
    }

    public function changeStatus(Car $car, $status)
    {
        $car->status = $status;
        $car->save();

        $message = '';
        switch ($status) {
            case '2':
                $message = "em preparação";
                break;
            case '3':
                $message = "pronto para entrega";
                break;
            case '4':
                $message = "entregue";
                break;
            default:
                break;
        }

        return redirect()->route('cars.index')->with('success', "Carro marcado como {$message}!");
    }
}
