<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Priority extends Model
{
  protected $fillable = [
    'description',
    'status',
  ];

  public function cars()
  {
    return $this->belongsTo(Car::class, 'id_priority', 'id');
  }
}
