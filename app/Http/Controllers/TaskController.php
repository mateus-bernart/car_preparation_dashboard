<?php

namespace App\Http\Controllers;

use App\Models\Checklist;
use App\Models\Task;

class TaskController extends Controller
{
    public function checkTask(Task $task)
    {
        //status 2: completed
        $task->status === 0 ? $task->status = 1 : $task->status = 0;
        $task->save();

        $checklist = Checklist::with('tasks')->where('id', $task->id_checklist)->first();

        $totalTasks = $checklist->tasks->count();
        $completedTasks = $checklist->tasks->where('status', 1)->count();
        $percentage = ($completedTasks / $totalTasks) * 100;
        $checklist->progress = $percentage;
        $checklist->save();

        return redirect()->route('checklists.index');
    }
}
