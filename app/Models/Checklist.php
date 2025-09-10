<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Checklist extends Model
{
  protected $fillable = [
    "id_car",
    "id_user",
    "id_category",
    "description",
    "status",
  ];
}
