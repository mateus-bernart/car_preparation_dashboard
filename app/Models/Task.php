<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
  protected $fillable = [
    'id_car',
    'id_checklist',
    'id_category',
    'description',
    'status',
  ];

  public function car()
  {
    return $this->belongsTo(Car::class, 'id_car', 'id');
  }

  public function category()
  {
    return $this->belongsTo(Category::class, 'id_category', 'id');
  }

  public function checklist()
  {
    return $this->belongsTo(Checklist::class, 'id_checklist', 'id');
  }
}
