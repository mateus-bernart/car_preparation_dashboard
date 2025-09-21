<?php

namespace App\Services;

use App\Models\Car;
use App\Models\DefaultTask;
use App\Models\Task;

class CarService
{
  public function save(array $validated, ?Car $car = null): Car
  {

    if (!$car) {
      $car = Car::create([
        'brand' => $validated['brand'],
        'model' => $validated['model'],
        'year' => $validated['year'],
        'plate_number' => $validated['plate_number'],
        'kilometers' => $validated['kilometers'],
        'color' => $validated['color'],
      ]);
    } else {
      $car->update([
        'brand' => $validated['brand'],
        'model' => $validated['model'],
        'year' => $validated['year'],
        'plate_number' => $validated['plate_number'],
        'kilometers' => $validated['kilometers'],
        'color' => $validated['color'],
      ]);
    }

    return $car;
  }
}
