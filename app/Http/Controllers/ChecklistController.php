<?php

namespace App\Http\Controllers;

use App\Models\Car;
use App\Models\Category;
use App\Models\Checklist;
use App\Models\Priority;
use App\Models\Task;
use Illuminate\Http\Request;

class ChecklistController extends Controller
{
    public function index()
    {
        $checklists = Checklist::with(['cars.priority', 'tasks.category'])->get();
        return inertia('Checklist/Index')->with(['checklists' => $checklists]);
    }

    public function create()
    {
        $categories = Category::all();
        $cars = Car::where('status', 1)->get();
        $tasks = Task::where('status', 1)->get();
        $priorities = Priority::where('status', 1)->get();
        return inertia('Checklist/Create')->with(['categories' => $categories, 'cars' => $cars, 'tasks' => $tasks, 'priorities' => $priorities]);
    }

    public function store(Request $request)
    {
        $user_id = auth()->user()->id;

        $validated = $request->validate([
            'id_car' => 'required|integer',
            'id_priority' => 'required|integer',
            'delivery_date' => 'nullable|string',
            'customer' => 'nullable|string',
            'tasks' => 'required|array|min:1',
            'tasks.*.task' => 'required|string|max:255',
            'tasks.*.id_category' => 'required|',
        ], [
            'id_car.required' => 'Selecione um carro.',
            'id_priority.required' => 'Selecione uma prioridade.',
            'tasks.required' => 'Informe ao menos uma tarefa!',
            'tasks.*.task.required' => 'Informe o conteúdo de uma tarefa!',
            'tasks.*.task.string' => 'Cada tarefa precisa ser um texto válido.',
            'tasks.*.task.max' => 'Cada tarefa pode ter no máximo 255 caracteres.',
            'tasks.*.id_category.required' => 'Selecione uma categoria para cada tarefa.',
        ]);

        $checklist = Checklist::create([
            'id_user' => $user_id,
            'status' => 1,
        ]);

        foreach ($validated['tasks'] as $task) {
            Task::create([
                'id_car' => $validated['id_car'],
                'id_checklist' => $checklist->id,
                'id_category' => $task['id_category'],
                'description' => $task['task'],
                'status' => 0,
                'created_at' => now(),
            ]);
        }

        $car = Car::findOrFail($validated['id_car']);
        $car->update([
            'id_checklist' => $checklist->id,
            'id_priority' => $validated['id_priority'],
            'delivery_date' => $validated['delivery_date'],
            'customer' => $validated['customer'],
            'updated_at' => now(),
        ]);

        return redirect()->route('checklists.index')->with("success", "Checklist criada com sucesso!");
    }

    public function destroy(Checklist $checklist)
    {
        $checklist->delete();
        return redirect()->route('checklists.index')->with('success', 'Checklist removido com sucesso!');
    }
}
