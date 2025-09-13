<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
  protected $fillable = [
    'id_checklist',
    'description',
    'status',
  ];

  public function checklist()
  {
    return $this->belongsTo(Checklist::class, 'id_checklist');
  }
}
