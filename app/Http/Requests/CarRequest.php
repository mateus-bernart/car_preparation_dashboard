<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CarRequest extends FormRequest
{
    public function rules()
    {
        return [
            'brand' => 'required|string|max:255',
            'model' => 'required|string|max:255',
            'year' => 'nullable|integer|min:1886',
            'plate_number' => 'nullable|string|max:255',
            'kilometers' => 'nullable|numeric|min:0',
            'color' => 'nullable|string|max:255',
        ];
    }

    public function messages()
    {
        return  [
            'brand.required' => 'O campo marca é obrigatório.',
            'brand.string' => 'O campo marca deve ser uma string.',
            'brand.max' => 'O campo marca não pode exceder 255 caracteres.',
            'model.required' => 'O campo modelo é obrigatório.',
            'model.string' => 'O campo modelo deve ser uma string.',
            'model.max' => 'O campo modelo não pode exceder 255 caracteres.',
            'year.integer' => 'O campo ano deve ser um número inteiro.',
            'year.min' => 'O campo ano deve ser no mínimo 1886.',
        ];
    }
}
