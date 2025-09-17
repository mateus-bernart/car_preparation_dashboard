<?php

namespace App\Http\Controllers;

use App\Models\Car;
use App\Models\Category;
use App\Models\Checklist;
use App\Models\DefaultTask;
use App\Models\Priority;
use App\Models\Task;
use Illuminate\Http\Request;

class ChecklistController extends Controller
{
    public function index()
    {
        $checklists = Checklist::with(['car.priority', 'tasks.category'])->get();
        return inertia('Checklist/Index')->with(['checklists' => $checklists]);
    }

    public function create()
    {
        $categories = Category::all();
        $cars = Car::where('status', 1)->get();
        $tasks = Task::where('status', 1)->get();
        $priorities = Priority::where('status', 1)->get();

        return inertia('Checklist/Create')->with([
            'categories' => $categories,
            'cars' => $cars,
            'tasks' => $tasks,
            'priorities' => $priorities,
            'checklist'  => null,
        ]);
    }

    public function store(Request $request)
    {
        $user_id = auth()->user()->id;

        $request->merge([
            'tasks' => collect($request->tasks)
                ->filter(fn($task) => !empty($task['task']) && !empty($task['id_category']))
                ->values()
                ->all()
        ]);

        $request->merge([
            'include_default_tasks' => filter_var($request->input('include_default_tasks'), FILTER_VALIDATE_BOOLEAN),
        ]);

        $validated = $request->validate([
            'id_car' => 'required|integer',
            'id_priority' => 'required|integer',
            'delivery_date' => 'nullable|string',
            'customer' => 'nullable|string',
            'include_default_tasks' => 'boolean',

            'tasks' => ['nullable', function ($attribute, $value, $fail) use ($request) {
                if (!$request->include_default_tasks && empty($value)) {
                    $fail('Informe ao menos uma tarefa ou selecione "Incluir tarefas padrão".');
                }
            }],
            'tasks.*.task' => 'required_with:tasks|string|max:255',
            'tasks.*.id_category' => 'required_with:tasks|integer|exists:categories,id'
        ], [
            'id_car.required' => 'Selecione um carro.',
            'id_priority.required' => 'Selecione uma prioridade.',
            'tasks.required_without' => 'Informe ao menos uma tarefa ou selecione as tarefas padrão.',
            'tasks.*.task.required_with' => 'A descrição da tarefa é obrigatória quando existir uma tarefa.',
            'tasks.*.id_category.required_with' => 'A categoria é obrigatória quando existir uma tarefa.',
        ]);

        $checklist = Checklist::create([
            'id_car' => $validated['id_car'],
            'id_user' => $user_id,
            'status' => 1,
        ]);

        if ($request->include_default_tasks) {
            $defaultTasks = DefaultTask::all();

            foreach ($defaultTasks as $task) {
                Task::create([
                    'id_checklist' => $checklist->id,
                    'id_category' => $task->id_category,
                    'description' => $task->description,
                    'status' => 0,
                    'created_at' => now(),
                ]);
            }
        }

        if (!empty($validated['tasks'])) {
            foreach ($validated['tasks'] as $task) {
                Task::create([
                    'id_checklist' => $checklist->id,
                    'id_category' => $task['id_category'],
                    'description' => $task['task'],
                    'status' => 0,
                    'created_at' => now(),
                ]);
            }
        }

        $car = Car::findOrFail($validated['id_car']);

        $car->update([
            'id_priority' => $validated['id_priority'],
            'delivery_date' => $validated['delivery_date'],
            'customer' => $validated['customer'],
            'updated_at' => now(),
        ]);

        return redirect()->route('checklists.index')->with("success", "Checklist criada com sucesso!");
    }

    public function edit(Checklist $checklist)
    {
        $categories = Category::all();
        $cars = Car::where('status', 1)->get();
        $tasks = Task::where('status', 1)->get();
        $priorities = Priority::where('status', 1)->get();

        $checklist->load('car');
        dd($checklist);

        return inertia('Checklist/Create')->with([
            'categories' => $categories,
            'cars' => $cars,
            'tasks' => $tasks,
            'priorities' => $priorities,
            'checklist' => $checklist
        ]);
    }

    public function destroy(Checklist $checklist)
    {
        $checklist->delete();
        return redirect()->route('checklists.index')->with('success', 'Checklist removido com sucesso!');
    }
}
