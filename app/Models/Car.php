<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Car extends Model
{
  protected $fillable = [
    'brand',
    'model',
    'year',
  ];

  public function checklists()
  {
    return $this->belongsToMany(Checklist::class, 'car_checklist', 'id_car', 'id_checklist');
  }
}
