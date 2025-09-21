import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, router, useForm } from '@inertiajs/react';
import { format, parseISO } from 'date-fns';
import { CalendarCheck, ChevronDownIcon, Plus, X } from 'lucide-react';
import { useState } from 'react';
import { Car } from '../Car/car';
import { Category } from './types/category';
import { Priority } from './types/priority';
import { Checklist } from './types/checklist';
import { Task } from './types/task';

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
    id_priority: string;
    id_car: string;
    customer: string;
    include_default_tasks: boolean;
    tasks: { id: number; task: string; id_category: string }[];
    delivery_date: string | null;
};

export default function Checklists({
    categories,
    cars,
    priorities,
    checklist,
    tasks,
}: {
    categories: Category[];
    cars: Car[];
    priorities: Priority[];
    checklist: Checklist;
    tasks: Task[];
}) {
    const [taskFields, setTaskFields] = useState<{ id: number; task: string; id_category: string; is_default_task: number }[]>(
        tasks && tasks.length > 0
            ? tasks.map((t) => ({ id: t.id, task: t.description, id_category: t.id_category?.toString(), is_default_task: t.is_default_task }))
            : [{ id: 0, task: '', id_category: '', is_default_task: 0 }],
    );

    const { data, errors, setError, setData } = useForm<ChecklistForm>({
        id_priority: checklist?.car?.id_priority.toString() || '',
        customer: checklist?.car.customer?.toString() || '',
        id_car: checklist?.id_car.toString() || '',
        include_default_tasks: checklist?.include_default_tasks || false,
        tasks:
            tasks && tasks.length > 0
                ? tasks.map((t) => ({ id: t.id, task: t.description, id_category: t.id_category?.toString(), is_default_task: t.is_default_task }))
                : [{ id: 0, task: '', id_category: '' }],
        delivery_date: checklist?.car?.delivery_date || null,
    });

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const payload = {
            ...data,
            tasks: taskFields,
        };

        if (checklist) {
            router.post(`/checklists/${checklist.id}/edit`, payload, {
                onError: (errors) => {
                    setError(errors);
                    console.error('Falha na validação:', errors);
                },
            });
        } else {
            router.post('/checklists', payload, {
                onError: (errors) => {
                    setError(errors);
                    console.error('Falha na validação:', errors);
                },
            });
        }
    };

    const handleAddTask = () => {
        setTaskFields((prev) => [...prev, { id: Date.now(), task: '', id_category: '', is_default_task: 0 }]);
    };

    const handleRemoveTask = (index: number) => {
        setTaskFields((prev) => prev.filter((p) => p.id !== index));
    };

    const handleUpdateTaskFields = (index: number, value: string, field: string) => {
        setTaskFields((prev) => prev.map((task, i) => (i === index ? { ...task, [field]: value } : task)));
        setError(`tasks.${index}.task`, '');
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
                                <div className="flex gap-4">
                                    <div className="flex flex-1 flex-col gap-2">
                                        <Label>
                                            <span className="text-red-400">* </span>Carro
                                        </Label>

                                        <Select
                                            value={data.id_car}
                                            onValueChange={(value) => {
                                                setError('id_car', '');
                                                setData('id_car', value);
                                            }}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Selecione" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {cars.map((car, index) => (
                                                    <SelectItem value={car.id.toString()} key={index}>
                                                        {car.brand} - {car.model} - {car.year}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <InputError message={errors.id_car}></InputError>
                                    </div>

                                    <div className="flex flex-1 flex-col gap-2">
                                        <Label>
                                            <span className="text-red-400">* </span>Prioridade
                                        </Label>

                                        <Select
                                            value={data.id_priority}
                                            onValueChange={(value) => {
                                                setError('id_priority', '');
                                                setData('id_priority', value);
                                            }}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Selecione" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {priorities.map((p, index) => (
                                                    <SelectItem key={index} value={p.id.toString()}>
                                                        {p.description}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <InputError message={errors.id_priority}></InputError>
                                    </div>
                                    <div className="flex flex-1 flex-col gap-2">
                                        <Label>Incluir tarefas padrão?</Label>
                                        <Switch
                                            checked={data.include_default_tasks}
                                            onCheckedChange={(value) => setData('include_default_tasks', value)}
                                        />
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <div className="flex flex-1 flex-col gap-2">
                                        <Label>Cliente</Label>

                                        <Input
                                            value={data.customer}
                                            placeholder={`Informe`}
                                            onChange={(e) => {
                                                setError('customer', '');
                                                setData('customer', e.target.value);
                                            }}
                                        ></Input>
                                    </div>
                                    <div className="flex flex-1 flex-col gap-2">
                                        <Label>Data de entrega</Label>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button variant="outline" id="date-picker" className="justify-between font-normal">
                                                    <div className="flex gap-2">
                                                        <CalendarCheck color="gray" />
                                                        {data?.delivery_date ?? 'Selecione'}
                                                    </div>
                                                    <ChevronDownIcon />
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                                                <Calendar
                                                    mode="single"
                                                    selected={data.delivery_date ? parseISO(data.delivery_date) : undefined}
                                                    captionLayout="dropdown"
                                                    onSelect={(date) => {
                                                        setData('delivery_date', date ? format(date, 'yyyy-MM-dd') : null);
                                                    }}
                                                />
                                            </PopoverContent>
                                        </Popover>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-2 rounded-md bg-muted p-5 shadow-md">
                                    <Label>Tarefas adicionais</Label>

                                    {taskFields.map((task, index) => {
                                        return (
                                            <div key={task.id}>
                                                <div className="flex gap-2">
                                                    <div className="flex w-full flex-row gap-2">
                                                        <Input
                                                            value={task.task}
                                                            placeholder={`Tarefa ${index + 1}`}
                                                            onChange={(e) => handleUpdateTaskFields(index, e.target.value, 'task')}
                                                        ></Input>
                                                        <div className="flex flex-col gap-2">
                                                            <Select
                                                                value={task.id_category}
                                                                onValueChange={(value) => {
                                                                    handleUpdateTaskFields(index, value, 'id_category');
                                                                    setError(`tasks.${index}.id_category`, '');
                                                                }}
                                                            >
                                                                <SelectTrigger>
                                                                    <SelectValue placeholder="Categoria" />
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                    {categories.map((category) => (
                                                                        <SelectItem
                                                                            key={category.id}
                                                                            value={category.id.toString()}
                                                                            className="font-bold"
                                                                        >
                                                                            {category.description}
                                                                        </SelectItem>
                                                                    ))}
                                                                </SelectContent>
                                                            </Select>
                                                        </div>
                                                    </div>

                                                    {index === taskFields.length - 1 ? (
                                                        <Button
                                                            className="bg-green-700 hover:cursor-pointer hover:bg-green-800 hover:shadow-md"
                                                            type="button"
                                                            onClick={handleAddTask}
                                                        >
                                                            <Plus color="white" />
                                                        </Button>
                                                    ) : (
                                                        <Button
                                                            className="bg-red-700 hover:cursor-pointer hover:bg-red-800 hover:shadow-md"
                                                            type="button"
                                                            onClick={() => handleRemoveTask(task.id)}
                                                        >
                                                            <X color="white" />
                                                        </Button>
                                                    )}
                                                </div>
                                                <InputError message={errors[`tasks.${index}.task`]} />
                                                <InputError message={errors[`tasks.${index}.id_category`]} />
                                            </div>
                                        );
                                    })}
                                    <InputError message={errors[`tasks`]} />
                                </div>
                            </div>
                        </div>
                        {checklist ? (
                            <Button type="submit" className="mt-4">
                                Salvar checklist
                            </Button>
                        ) : (
                            <Button type="submit" className="mt-4">
                                Salvar alterações
                            </Button>
                        )}
                    </form>
                </CardContent>
            </Card>
        </AppLayout>
    );
}
