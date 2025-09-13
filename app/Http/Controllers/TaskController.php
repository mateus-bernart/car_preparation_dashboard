<?php

namespace App\Http\Controllers;

use App\Models\Task;

class TaskController extends Controller
{
    public function checkTask(Task $task)
    {
        //status 2: completed
        $task->status === 0 ? $task->status = 1 : $task->status = 0;
        $task->save();
        return redirect()->route('checklists.index');
    }
}
