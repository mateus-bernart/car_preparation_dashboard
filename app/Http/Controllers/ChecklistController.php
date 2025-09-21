<?php

namespace App\Http\Controllers;

use App\Http\Requests\ChecklistRequest;
use App\Models\Car;
use App\Models\Category;
use App\Models\Checklist;
use App\Models\Priority;
use App\Models\Task;
use App\Services\ChecklistService;

class ChecklistController extends Controller
{
    public function index()
    {
        $checklists = Checklist::with(['car.priority', 'tasks.category'])
            ->whereHas('car', function ($query) {
                $query->where('status', 2);
            })->get();
        return inertia('Checklist/Index')->with(['checklists' => $checklists]);
    }

    public function create()
    {
        $categories = Category::all();
        $cars = Car::where('active', 1)->where('status', 1)->whereDoesntHave('checklists')->get();
        //redundant wheredoesnthave cecklists if status = 1 "in preparation"?
        $priorities = Priority::where('status', 1)->get();

        return inertia('Checklist/Create')->with([
            'categories' => $categories,
            'cars' => $cars,
            'priorities' => $priorities,
            'checklist'  => null,
        ]);
    }

    public function store(ChecklistRequest $request, ChecklistService $service)
    {
        $service->save($request->validated(), auth()->id());
        return redirect()->route('checklists.index')->with("success", "Checklist criada com sucesso!");
    }


    public function update(ChecklistRequest $request, ChecklistService $service, Checklist $checklist)
    {
        $service->save($request->validated(), auth()->id(), $checklist);
        return redirect()->route('checklists.index')->with("success", "Checklist alterada com sucesso!");
    }

    public function edit(Checklist $checklist)
    {
        $categories = Category::all();
        $cars = Car::where('active', 1)->get();
        $tasks = Task::where('status', 1)->get();
        $priorities = Priority::where('status', 1)->get();

        $checklist->load('car');
        return inertia('Checklist/Create')->with([
            'categories' => $categories,
            'car' => $checklist->car,
            'cars' => $cars,
            'tasks' => $checklist->tasks()->whereIn('status', [0, 1])->where('is_default_task', 0)->get(),
            'priorities' => $priorities,
            'checklist' => $checklist
        ]);
    }


    public function destroy(Checklist $checklist)
    {
        $checklist->car->status = 1;
        $checklist->car->save();
        $checklist->delete();
        return redirect()->route('checklists.index')->with('success', 'Checklist removido com sucesso!');
    }
}
