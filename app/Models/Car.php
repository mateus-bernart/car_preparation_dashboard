<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Car extends Model
{
  protected $fillable = [
    'id_priority',
    'brand',
    'model',
    'year',
    'plate_number',
    'kilometers',
    'color',
    'customer',
    'delivery_date',
    'status',
    'active',
  ];

  public function checklists()
  {
    return $this->hasMany(Checklist::class, 'id_car', 'id');
  }

  public function priority()
  {
    return $this->belongsTo(Priority::class, 'id_priority', 'id');
  }
}
