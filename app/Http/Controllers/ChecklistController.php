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
        $checklists = Checklist::with(['cars', 'tasks'])->get();
        return inertia('Checklist/Index')->with(['checklists' => $checklists]);
    }

    public function create()
    {
        $categories = Category::all();
        $cars = Car::where('status', 1)->get();
        $tasks = Task::where('status', 1)->get();
        return inertia('Checklist/Create')->with(['categories' => $categories, 'cars' => $cars, 'tasks' => $tasks]);
    }

    public function store(Request $request)
    {
        $user_id = auth()->user()->id;

        $validated = $request->validate([
            'description' => 'nullable|string|max:1000',
            'cars' => 'required|array',
            'id_category' => 'required|integer',
            'tasks' => 'required|array|min:1',
            'tasks.*' => 'required|string|max:255',
        ], [
            'description.max' => 'O campo descrição não pode exceder 1000 caracteres.',
            'cars.required' => 'Selecione um carro.',
            'id_category.required' => 'Selecione uma categoria.',
            'tasks.required' => 'Informe ao menos uma tarefa!',
            'tasks.*.required' => 'Informe o conteúdo de uma tarefa!',
            'tasks.*.string' => 'Cada tarefa precisa ser um texto válido.',
            'tasks.*.max' => 'Cada tarefa pode ter no máximo 255 caracteres.',
        ]);

        $checklist = Checklist::create([
            'id_user' => $user_id,
            'id_category' => $validated['id_category'],
            'description' => $validated['description'],
            'status' => 1,
        ]);

        $checklist->cars()->sync($validated['cars']);

        foreach ($validated['tasks'] as $task) {
            Task::create([
                'id_checklist' => $checklist->id,
                'description' => $task,
                'status' => 0,
                'created_at' => now(),
            ]);
        }

        return redirect()->route('checklists.index')->with("success", "Checklist criada com sucesso!");
    }

    public function destroy(Checklist $checklist)
    {
        $checklist->delete();
        return redirect()->route('checklists.index')->with('success', 'Checklist removido com sucesso!');
    }
}
