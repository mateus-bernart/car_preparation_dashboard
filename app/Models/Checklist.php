<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Checklist extends Model
{
  protected $fillable = [
    "id_car",
    "id_user",
    'include_default_tasks',
    "status",
    "progress",
  ];

  public function tasks()
  {
    return $this->hasMany(Task::class, 'id_checklist', 'id');
  }

  public function car()
  {
    return $this->belongsTo(Car::class, 'id_car', 'id');
  }
}
