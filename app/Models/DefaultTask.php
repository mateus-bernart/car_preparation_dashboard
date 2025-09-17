<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DefaultTask extends Model
{
  protected $fillable = [
    "id_category",
    "description",
  ];

  public function category()
  {
    return $this->belongsTo(Category::class, 'id_category', 'id');
  }
}
