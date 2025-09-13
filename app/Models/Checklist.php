<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Checklist extends Model
{
  protected $fillable = [
    "id_user",
    "id_category",
    "description",
    "status",
  ];

  public function cars()
  {
    return $this->belongsToMany(Car::class, 'car_checklist', 'id_checklist', 'id_car');
  }

  public function tasks()
  {
    return $this->hasMany(Task::class, 'id_checklist');
  }
}
