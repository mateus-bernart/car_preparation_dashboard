<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
  protected $fillable = [
    "id",
    "description",
    "status",
  ];

  public function tasks()
  {
    return $this->hasMany(Task::class, "id_category", "id");
  }

  public function defaultTasks()
  {
    return $this->hasMany(DefaultTask::class, "id_category", "id");
  }
}
