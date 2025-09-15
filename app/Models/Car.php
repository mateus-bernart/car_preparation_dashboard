<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Car extends Model
{
  protected $fillable = [
    'id_checklist',
    'id_priority',
    'brand',
    'model',
    'year',
    'customer',
    'delivery_date',
    'status',
  ];

  public function checklist()
  {
    return $this->belongsTo(Checklist::class, 'id_checklist', 'id');
  }

  public function tasks()
  {
    return $this->hasMany(Task::class, 'id_car', 'id');
  }

  public function priority()
  {
    return $this->belongsTo(Priority::class, 'id_priority', 'id');
  }
}
