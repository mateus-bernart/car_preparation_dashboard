<?php

namespace App\Http\Controllers;

use App\Models\Car;
use App\Models\Category;
use App\Models\Checklist;
use App\Models\Task;
use Illuminate\Http\Request;

class ChecklistController extends Controller
{
    public function index()
    {
        $cars = Checklist::all();
        return inertia('Checklist/Index')->with('cars', $cars);
    }

    public function create()
    {
        $categories = Category::all();
        $cars = Car::where('status', 1)->get();
        $tasks = Task::all();
        return inertia('Checklist/Create')->with(['categories' => $categories, 'cars' => $cars, 'tasks' => $tasks]);
    }

    public function store(Request $request)
    {
        $user_id = auth()->user()->id;

        $validated = $request->validate([
            'description' => 'nullable|string|max:1000',
            'id_car' => 'required|integer',
            'id_category' => 'required|integer',
            'tasks' => 'required|array|min:1',
        ], [
            'description.max' => 'O campo descrição não pode exceder 1000 caracteres.',
            'id_car.required' => 'Selecione um carro.',
            'id_category.required' => 'Selecione uma categoria.',
            'tasks.required' => 'Informe ao menos uma tarefa!'
        ]);

        $checklist = Checklist::create([
            'id_car' => $validated['id_car'],
            'id_user' => $user_id,
            'id_category' => $validated['id_category'],
            'description' => $validated['description'],
            'status' => 1,
        ]);

        foreach ($validated['tasks'] as $task) {
            Task::create([
                'id_checklist' => $checklist->id,
                'description' => $task,
                'status' => 1,
                'created_at' => now(),
            ]);
        }

        $cars = Checklist::all();
        return inertia('Checklist/Index')->with(['success' => 'Checklistro adicionado com sucesso.', 'cars' => $cars]);
    }

    public function destroy(Checklist $car)
    {
        $car->delete();
        $cars = Checklist::all();
        return inertia('Checklist/Index')->with(['cars' => $cars]);
    }

    public function storeTask(Request $request)
    {
        $validated = $request->validate([
            'description' => 'required|string'
        ]);
    }
}
