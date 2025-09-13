import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MultiSelect } from '@/components/ui/multi-select';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, router, useForm } from '@inertiajs/react';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { Car } from '../Car/car';
import { Category } from './category';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Checklists',
        href: '/checklists',
    },
    {
        title: 'Adicionar nova Checklist',
        href: '/checklists/create',
    },
];

type ChecklistForm = {
    description: string;
    id_category: string;
    cars: string[];
    tasks: string[];
};

export default function Checklists({ categories, cars }: { categories: Category[]; cars: Car[] }) {
    const [taskFields, setTaskFields] = useState<string[]>(['']);
    const [selectedCars, setSelectedCars] = useState<string[]>([]);

    const { data, setData, errors, setError } = useForm<ChecklistForm>({
        description: '',
        id_category: '',
        cars: [],
        tasks: [],
    });

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const payload = {
            ...data,
            tasks: taskFields,
            cars: selectedCars,
        };

        router.post('/checklists', payload, {
            onError: (errors) => {
                setError(errors);
                console.error('Falha na validação:', errors);
            },
        });
    };

    const handleAddTask = () => {
        setTaskFields((prev) => [...prev, '']);
    };

    const handleUpdateTaskFields = (index: number, value: string) => {
        const newTasks = [...taskFields];
        newTasks[index] = value;
        setTaskFields(newTasks);
        setError('tasks', '');
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Cars" />
            <Card className="m-6">
                <CardHeader className="font-serif text-2xl font-extrabold">Novo Checklist</CardHeader>

                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-4 sm:flex-col md:flex-col lg:flex-row">
                            <div className="flex flex-1 flex-col gap-4">
                                <div className="flex w-2xs flex-col gap-2">
                                    <Label>Categoria</Label>
                                    <Select
                                        onValueChange={(value) => {
                                            setData('id_category', value);
                                            setError('id_category', '');
                                        }}
                                        defaultValue={data.id_category}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Selecione uma categoria" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {categories.map((category) => (
                                                <SelectItem key={category.id} value={category.id.toString()} className="font-bold">
                                                    {category.description}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <InputError message={errors.id_category}></InputError>
                                </div>

                                <div className="flex w-2xs flex-col gap-2">
                                    <Label>Carro</Label>

                                    <MultiSelect
                                        hideSelectAll
                                        searchable={false}
                                        placeholder="Selecione o(s) carro(s)"
                                        options={cars.map((car) => ({
                                            value: car.id.toString(),
                                            label: `${car.brand} - ${car.model} - ${car.year}`,
                                        }))}
                                        defaultValue={selectedCars}
                                        onValueChange={(values) => {
                                            setSelectedCars(values);
                                            setError('cars', '');
                                        }}
                                    />
                                    <InputError message={errors.cars}></InputError>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <Label>Descrição</Label>
                                    <Textarea
                                        placeholder="Descrição da checklist (opcional)"
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                    />
                                    <InputError message={errors.description}></InputError>
                                </div>

                                <div className="flex flex-col gap-4">
                                    <Label>Tarefas</Label>
                                    {taskFields.map((task, index) => (
                                        <div key={index}>
                                            <div className="flex w-2/3 flex-row gap-2">
                                                <Input
                                                    value={task}
                                                    placeholder={`Tarefa ${index + 1}`}
                                                    onChange={(e) => handleUpdateTaskFields(index, e.target.value)}
                                                ></Input>
                                                {index === taskFields.length - 1 && (
                                                    <Button
                                                        className="bg-green-700 hover:bg-green-800"
                                                        variant={'outline'}
                                                        type="button"
                                                        onClick={handleAddTask}
                                                    >
                                                        <Plus color="white" />
                                                    </Button>
                                                )}
                                            </div>
                                            <InputError message={errors[`tasks.${index}`]} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <Button type="submit" className="mt-4">
                            Salvar checklist
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </AppLayout>
    );
}
