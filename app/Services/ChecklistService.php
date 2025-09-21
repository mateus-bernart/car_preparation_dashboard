<?php

namespace App\Services;

use App\Models\Car;
use App\Models\Checklist;
use App\Models\DefaultTask;
use App\Models\Task;

class ChecklistService
{
  public function save(array $validated, int $userId, ?Checklist $checklist = null): Checklist
  {

    if (!$checklist) {
      $checklist = Checklist::create([
        'id_car' => $validated['id_car'],
        'include_default_tasks' => $validated['include_default_tasks'],
        'id_user' => $userId,
        'status' => 1,
      ]);
    } else {
      $checklist->update([
        'id_car' => $validated['id_car'],
        'include_default_tasks' => $validated['include_default_tasks'],
      ]);

      $checklist->tasks()->where('is_default_task', 0)->delete();
    }

    if ($validated['include_default_tasks'] && $checklist->include_default_tasks !== 1) {
      foreach (DefaultTask::all() as $task) {
        Task::updateOrCreate(
          [
            'id_checklist' => $checklist->id,
            'id_category' => $task->id_category,
            'is_default_task' => 1
          ],
          [
            'description' => $task->description,
          ]
        );
      }
    }

    if (!empty($validated['tasks'])) {
      foreach ($validated['tasks'] as $task) {
        Task::create([
          'id_checklist' => $checklist->id,
          'id_category' => $task['id_category'],
          'description' => $task['task'],
          'status' => 0,
          'is_default_task' => 0,
          'created_at' => now(),
        ]);
      }
    }

    Car::findOrFail($validated['id_car'])->update([
      'id_priority' => $validated['id_priority'],
      'delivery_date' => $validated['delivery_date'],
      'customer' => $validated['customer'],
      'status' => 2,
    ]);

    return $checklist;
  }
}
