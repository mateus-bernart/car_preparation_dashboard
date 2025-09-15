import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { CalendarCheck, Car, Clock, Edit, Trash, User } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Checklist, ChecklistFormData } from './checklist';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Checklists',
        href: '/checklists',
    },
];

type PageProps = {
    success?: string;
};

export default function Checklists({ checklists }: { checklists: Checklist[] }) {
    const { props } = usePage<PageProps>();

    const [tasksChecked, setTasksChecked] = useState<number[]>([]);

    const { delete: destroy, post } = useForm<ChecklistFormData>({
        id: 0,
    });

    console.log('checklists: ', checklists);

    useEffect(() => {
        if (props.success) {
            toast.success(props.success);
        }
    }, [props, props.success]);

    const handleTaskComplete = (id: number) => {
        setTasksChecked((prev) => (prev.includes(id) ? prev.filter((taskId) => taskId !== id) : [...prev, id]));
        post(`/tasks/${id}`, {
            preserveScroll: true,
        });
    };

    const handleDeleteChecklist = (id: number) => {
        destroy(`/checklists/${id}`);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Checklists" />
            <div className="my-4 ml-4">
                <Link href={'/checklists/create'}>
                    <Button className="text-md cursor-pointer bg-green-600 font-bold shadow-lg hover:bg-green-700">Adicionar checklist</Button>
                </Link>
            </div>
            <div className="flex flex-col flex-wrap sm:flex-row">
                {checklists.map((checklist, index) => {
                    const car = checklist.cars.find((car) => car.id_checklist === checklist.id);

                    const priorityColors: Record<number, string> = {
                        1: 'bg-green-500',
                        2: 'bg-amber-500',
                        3: 'bg-red-500',
                    };

                    const completedTasks = checklist.tasks.filter((t) => t.status === 1).length;
                    const totalTasks = checklist.tasks.length;

                    return (
                        <Card key={index} className="relative m-2 flex-1 transition-all hover:shadow-lg sm:max-w-[50%]">
                            <CardHeader>
                                <div className="flex flex-col gap-2">
                                    <h1 className="flex gap-2 font-semibold text-card-foreground">
                                        <Car color="darkblue" /> {car?.brand} {car?.model} {car?.year}
                                    </h1>
                                    <div
                                        className={`${car ? priorityColors[car.id_priority] : ''} mb-4 w-16 rounded-sm px-2 py-1 text-center text-sm font-bold`}
                                    >
                                        <span>{car?.priority.description}</span>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="mb-5 space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Progress</span>
                                        <span className="font-medium text-card-foreground">{checklist.progress}%</span>
                                    </div>
                                    <Progress value={checklist?.progress} className="h-2" />
                                    <div className="text-xs text-muted-foreground">
                                        {completedTasks} of {totalTasks} tasks completed
                                    </div>
                                </div>

                                <div className="mb-6 flex-col gap-3 text-sm">
                                    {car?.customer && (
                                        <div className="flex gap-2">
                                            <div className="flex items-center gap-2">
                                                <User className="h-4 w-4 text-muted-foreground" />
                                                <span className="text-muted-foreground">Cliente:</span>
                                            </div>
                                            <span className="font-medium text-card-foreground">{car?.customer}</span>
                                        </div>
                                    )}
                                    {car?.delivery_date && (
                                        <div className="flex gap-2">
                                            <div className="flex items-center gap-2">
                                                <CalendarCheck className="h-4 w-4 text-muted-foreground" />
                                                <span className="text-muted-foreground">Delivery:</span>
                                            </div>
                                            <span className="font-medium text-card-foreground">{car?.delivery_date}</span>
                                        </div>
                                    )}
                                </div>

                                <div className="flex flex-col gap-2">
                                    <Label className="flex gap-2 text-muted-foreground">
                                        <Clock size={15} />
                                        Task Checklist
                                    </Label>
                                    <div className="max-h-52 space-y-2 overflow-y-auto">
                                        {checklist.tasks.map((task) => {
                                            console.log('task: ', task);

                                            return (
                                                <div
                                                    className={`${Boolean(task.status) === true ? 'border border-green-200 bg-green-50' : 'border bg-muted/30'} rounded-md bg-accent p-2 py-4 transition-all duration-50`}
                                                    key={task.id}
                                                    onClick={() => handleTaskComplete(task.id)}
                                                >
                                                    <div className="flex justify-between">
                                                        <div className="flex flex-1 items-center gap-2">
                                                            <Checkbox
                                                                checked={tasksChecked.includes(task.id) || Boolean(task.status)}
                                                                className="cursor-pointer"
                                                            />
                                                            <h1
                                                                className={`text-sm ${task.status ? 'text-muted-foreground line-through' : 'text-card-foreground'}`}
                                                            >
                                                                {task.description}
                                                            </h1>
                                                        </div>

                                                        <Badge variant="outline" className="text-xs">
                                                            {task.category.description}
                                                        </Badge>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>

                                    <Dialog>
                                        <DialogTrigger>
                                            <div className="absolute top-[-1rem] right-12 cursor-pointer rounded-sm bg-blue-500 p-2 shadow-lg transition-all hover:bg-blue-800 sm:top-2">
                                                <Edit color="white" size={20}></Edit>
                                            </div>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>Editar {checklist.id}</DialogTitle>
                                                <DialogDescription></DialogDescription>
                                            </DialogHeader>
                                        </DialogContent>
                                    </Dialog>
                                    <Dialog>
                                        <DialogTrigger>
                                            <div className="absolute top-[-1rem] right-2 cursor-pointer rounded-sm bg-red-600 p-2 shadow-lg transition-all hover:bg-red-800 sm:top-2">
                                                <Trash color="white" size={20}></Trash>
                                            </div>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>Deletar checklist {checklist.id}?</DialogTitle>
                                                <DialogDescription>Tem certeza? </DialogDescription>
                                            </DialogHeader>
                                            <DialogFooter>
                                                <Button className="cursor-pointer" onClick={() => handleDeleteChecklist(checklist.id)}>
                                                    Confirmar
                                                </Button>
                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>
                                </div>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>
            {checklists.length === 0 && (
                <div className="flex items-center justify-center">
                    <span className="text-muted-foreground">Não há checklists. Clique em "Adicionar checklist"</span>
                </div>
            )}
        </AppLayout>
    );
}
