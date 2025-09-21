<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
  protected $fillable = [
    'id_checklist',
    'id_category',
    'description',
    'status',
    'is_default_task'
  ];

  public function category()
  {
    return $this->belongsTo(Category::class, 'id_category', 'id');
  }

  public function checklist()
  {
    return $this->belongsTo(Checklist::class, 'id_checklist', 'id');
  }
}
