<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ChecklistRequest extends FormRequest
{

  protected function prepareForValidation()
  {
    $this->merge([
      'tasks' => collect($this->tasks)
        ->filter(fn($task) => !empty($task['task']))
        ->map(function ($task) {
          return [
            'task' => $task['task'] ?? null,
            'id_category' => !empty($task['id_category']) ? $task['id_category'] : null,
          ];
        })
        ->values()
        ->all(),
      'include_default_tasks' => filter_var($this->input('include_default_tasks'), FILTER_VALIDATE_BOOLEAN),
    ]);
  }

  public function rules()
  {
    return [
      'id_car' => 'required|integer',
      'id_priority' => 'required|integer',
      'delivery_date' => 'nullable|string',
      'customer' => 'nullable|string',
      'include_default_tasks' => 'boolean',

      'tasks' => ['nullable', function ($attribute, $value, $fail) {
        if (!$this->include_default_tasks && empty($value)) {
          $fail('Informe ao menos uma tarefa ou selecione "Incluir tarefas padrão".');
        }
      }],
      'tasks.*.task' => 'required_with:tasks|string|max:255',
      'tasks.*.id_category' => 'nullable|integer|exists:categories,id',
    ];
  }

  public function messages()
  {
    return  [
      'id_car.required' => 'Selecione um carro.',
      'id_priority.required' => 'Selecione uma prioridade.',
      'tasks.required_without' => 'Informe ao menos uma tarefa ou selecione as tarefas padrão.',
      'tasks.*.task.required_with' => 'A descrição da tarefa é obrigatória quando existir uma tarefa.',
    ];
  }
}
