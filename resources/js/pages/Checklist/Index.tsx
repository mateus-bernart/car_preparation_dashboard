import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { Edit, Trash } from 'lucide-react';
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

    const { delete: destroy, put } = useForm<ChecklistFormData>({
        id: 0,
    });

    useEffect(() => {
        if (props.success) {
            toast.success(props.success);
        }
    }, [props, props.success]);

    const handleTaskComplete = (id: number) => {
        setTasksChecked((prev) => (prev.includes(id) ? prev.filter((taskId) => taskId !== id) : [...prev, id]));
        put(`/tasks/${id}`);
    };

    console.log('tasks checked: ', tasksChecked);

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
            {checklists.map((checklist, index) => (
                <div key={index}>
                    <Card className="relative mx-6 my-2 transition-all hover:shadow-lg">
                        <CardHeader>
                            <h1 className="font-serif text-xl font-bold"> Checklist {checklist.id}</h1>
                            <h3 className="text-muted-foreground">{checklist.description}</h3>
                        </CardHeader>
                        <CardContent>
                            <div>
                                {checklist.tasks.map((task) => {
                                    console.log('task: ', task);

                                    return (
                                        <div className="flex items-center gap-2" key={task.id}>
                                            <Checkbox
                                                onCheckedChange={() => handleTaskComplete(task.id)}
                                                checked={tasksChecked.includes(task.id) || Boolean(task.status)}
                                            />
                                            <h1>{task.description}</h1>
                                        </div>
                                    );
                                })}
                                <Dialog>
                                    <DialogTrigger>
                                        <div className="absolute top-2 right-12 cursor-pointer rounded-sm bg-blue-500 p-2 shadow-lg transition-all hover:bg-blue-800">
                                            <Edit color="white" size={20}></Edit>
                                        </div>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>Editar {checklist.id}</DialogTitle>
                                            <DialogDescription>{checklist.description}</DialogDescription>
                                        </DialogHeader>
                                    </DialogContent>
                                </Dialog>
                                <Dialog>
                                    <DialogTrigger>
                                        <div className="absolute top-2 right-2 cursor-pointer rounded-sm bg-red-600 p-2 shadow-lg transition-all hover:bg-red-800">
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
                </div>
            ))}
            {checklists.length === 0 && (
                <div className="flex items-center justify-center">
                    <span className="text-muted-foreground">Não há checklists. Clique em "Adicionar checklist"</span>
                </div>
            )}
        </AppLayout>
    );
}
