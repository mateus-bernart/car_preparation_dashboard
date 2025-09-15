import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, router, useForm } from '@inertiajs/react';
import { format } from 'date-fns';
import { CalendarCheck, ChevronDownIcon, Plus, X } from 'lucide-react';
import { useState } from 'react';
import { Car } from '../Car/car';
import { Category } from './category';
import { Priority } from './priority';

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
    tasks: { id: number; task: string; id_category: string }[];
};

export default function Checklists({ categories, cars, priorities }: { categories: Category[]; cars: Car[]; priorities: Priority[] }) {
    const [taskFields, setTaskFields] = useState<{ id: number; task: string; id_category: string }[]>([{ id: 0, task: '', id_category: '' }]);
    const [selectedCar, setSelectedCar] = useState('');
    const [priority, setPriority] = useState('');
    const [customer, setCustomer] = useState('');
    const [deliveryDate, setDeliveryDate] = useState<Date>();

    const { data, errors, setError } = useForm<ChecklistForm>({
        id_priority: '',
        customer: '',
        id_car: '',
        tasks: [{ id: 0, task: '', id_category: '' }],
    });

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const payload = {
            ...data,
            tasks: taskFields,
            id_car: selectedCar,
            id_priority: priority,
            customer: customer,
            delivery_date: deliveryDate ? format(deliveryDate, 'yyyy-MM-dd') : null,
        };

        router.post('/checklists', payload, {
            onError: (errors) => {
                setError(errors);
                console.error('Falha na validação:', errors);
            },
        });
    };

    const handleAddTask = () => {
        setTaskFields((prev) => [...prev, { id: Date.now(), task: '', id_category: '' }]);
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
                                            onValueChange={(value) => {
                                                setError('id_car', '');
                                                return setSelectedCar(value);
                                            }}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Selecione" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {cars.map((car) => (
                                                    <SelectItem value={car.id.toString()} key={car.id}>
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
                                            onValueChange={(value) => {
                                                setError('id_priority', '');
                                                return setPriority(value);
                                            }}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Selecione" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {priorities.map((p) => (
                                                    <SelectItem key={p.id} value={p.id.toString()}>
                                                        {p.description}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <InputError message={errors.id_priority}></InputError>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <div className="flex flex-1 flex-col gap-2">
                                        <Label>Cliente</Label>

                                        <Input
                                            value={customer}
                                            placeholder={`Informe`}
                                            onChange={(e) => {
                                                setError('customer', '');
                                                return setCustomer(e.target.value);
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
                                                        {deliveryDate ? deliveryDate.toLocaleDateString() : 'Selecione'}
                                                    </div>
                                                    <ChevronDownIcon />
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                                                <Calendar
                                                    mode="single"
                                                    selected={deliveryDate}
                                                    captionLayout="dropdown"
                                                    onSelect={(date) => {
                                                        setDeliveryDate(date);
                                                    }}
                                                />
                                            </PopoverContent>
                                        </Popover>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-2 rounded-md bg-muted p-5 shadow-md">
                                    <Label>
                                        <span className="text-red-400">* </span>Tarefas
                                    </Label>

                                    {taskFields.map((task, index) => (
                                        <div key={index}>
                                            <div className="flex gap-2">
                                                <div className="flex w-full flex-row gap-2">
                                                    <Input
                                                        value={task.task}
                                                        placeholder={`Tarefa ${index + 1}`}
                                                        onChange={(e) => handleUpdateTaskFields(index, e.target.value, 'task')}
                                                    ></Input>
                                                    <div className="flex flex-col gap-2">
                                                        <Select
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
                                                        variant={'outline'}
                                                        type="button"
                                                        onClick={handleAddTask}
                                                    >
                                                        <Plus color="white" />
                                                    </Button>
                                                ) : (
                                                    <Button
                                                        className="bg-red-700 hover:cursor-pointer hover:bg-red-800 hover:shadow-md"
                                                        variant={'outline'}
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
