<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Checklist extends Model
{
  protected $fillable = [
    "id_user",
    "status",
  ];

  public function tasks()
  {
    return $this->hasMany(Task::class, 'id_checklist', 'id');
  }

  public function cars()
  {
    return $this->hasMany(Car::class, 'id_checklist', 'id');
  }
}
