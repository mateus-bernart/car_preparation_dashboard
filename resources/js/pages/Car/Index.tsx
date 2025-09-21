import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { BadgeCheckIcon, Check, ChevronDown, ListRestart, Trash, Truck, Undo } from 'lucide-react';
import React, { useEffect } from 'react';
import { toast } from 'sonner';
import { Car } from './car';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Carros',
        href: '/cars',
    },
];

type PageProps = {
    cars: Car[];
    success?: string;
};

export default function Cars() {
    const { props } = usePage<PageProps>();
    const { delete: destroy, processing, put, post } = useForm();

    useEffect(() => {
        if (props.success) {
            toast.success(props.success);
        }
    }, [props, props.success]);

    const handleDeleteCar = (id: number) => {
        destroy(`/cars/${id}`);
    };

    const handleUpdateStatus = (id: number) => {
        put(`/cars/${id}/toggle-active`, {
            onSuccess: () => {
                toast.success('Status do carro atualizado com sucesso!');
            },
        });
    };

    const columns: ColumnDef<Car>[] = [
        {
            accessorKey: 'brand',
            header: 'Marca',
        },
        {
            accessorKey: 'model',
            header: 'Modelo',
        },
        {
            accessorKey: 'year',
            header: 'Ano',
        },
        {
            accessorKey: 'active',
            header: 'Ativo / Inativo',
            cell: ({ row }) => {
                const car = row.original;
                const statusOption = car.active.toString() === '1' ? 'ativo' : 'inativo';
                const statusText = car.active.toString() === '1' ? 'inativo' : 'ativo';
                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="outline"
                                size="sm"
                                className={car.active.toString() === '1' ? 'bg-green-100 hover:bg-green-200' : 'bg-red-100 hover:bg-red-200'}
                                style={{ border: 'none' }}
                            >
                                {statusOption}
                                <ChevronDown />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem onClick={() => handleUpdateStatus(car.id)}>{statusText}</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                );
            },
        },
        {
            accessorKey: 'status',
            header: 'Status',
            cell: ({ row }) => {
                let statusText = '';
                let variant: 'default' | 'destructive' | 'outline' | 'secondary' | null | undefined;
                let className = '';
                let textColor = '';
                let iconElement: React.ReactNode = null;
                switch (row.original.status?.toString()) {
                    case '2':
                        statusText = 'Em preparação';
                        variant = 'outline';
                        className = 'bg-amber-300';
                        break;
                    case '3':
                        statusText = 'Pronto para entrega';
                        variant = 'outline';
                        iconElement = <Truck />;
                        className = 'bg-green-300';
                        break;
                    case '4':
                        statusText = 'Entregue';
                        variant = 'outline';
                        iconElement = <BadgeCheckIcon />;
                        className = 'bg-blue-500';
                        textColor = 'white';
                        break;
                    default:
                        statusText = 'Disponível';
                        variant = 'outline';
                        break;
                }

                return (
                    <Badge variant={variant} style={{ border: 'none' }} className={`p-2 ${className} text-${textColor} font-black`}>
                        {iconElement}
                        {statusText}
                    </Badge>
                );
            },
        },
        {
            id: 'actions',
            header: 'Ações',
            cell: ({ row }) => {
                const car = row.original;

                type CarAction = {
                    label: string;
                    description: (car: Car) => string;
                    onConfirm: (car: Car) => void;
                    buttonClass: string;
                    icon: React.ReactNode;
                    tooltip: string;
                };

                const statusActions: Record<string, CarAction[]> = {
                    '1': [
                        //Disponível
                    ],
                    '2': [
                        // Em preparação
                        {
                            label: 'Entregue',
                            description: (car) => `Marcar ${car.brand} - ${car.model} ${car.year} como pronto para entrega?`,
                            onConfirm: (car) => post(`/cars/${car.id}/3`),
                            buttonClass: 'bg-green-500 hover:bg-green-600',
                            icon: <Check />,
                            tooltip: 'pronto para entrega',
                        },
                    ],
                    '3': [
                        // Pronto para entrega
                        {
                            label: 'Em preparação',
                            description: (car) => `Marcar ${car.brand} - ${car.model} ${car.year} para "Em preparação"?`,
                            onConfirm: (car) => post(`/cars/${car.id}/2`),
                            buttonClass: 'bg-amber-200 hover:bg-amber-300',
                            icon: <ListRestart />,
                            tooltip: 'em preparação',
                        },
                        {
                            label: 'Entregue',
                            description: (car) => `Marcar ${car.brand} - ${car.model} ${car.year} como entregue?`,
                            onConfirm: (car) => post(`/cars/${car.id}/4`),
                            buttonClass: 'bg-green-500 hover:bg-green-600',
                            icon: <Truck />,
                            tooltip: 'entregue',
                        },
                    ],
                    '4': [
                        // Entregue
                        {
                            label: 'Entregue',
                            description: (car) => `Marcar ${car.brand} - ${car.model} ${car.year} como pronto para entrega?`,
                            onConfirm: (car) => post(`/cars/${car.id}/3`),
                            buttonClass: 'bg-amber-200 hover:bg-amber-300',
                            icon: <Undo />,
                            tooltip: 'pronto para entrega',
                        },
                    ],
                };

                return (
                    <div className="flex gap-2">
                        {(statusActions[car.status?.toString()] || []).map((action) => (
                            <AlertDialog key={action.label}>
                                <AlertDialogTrigger asChild>
                                    <Button variant="ghost" className={action.buttonClass} size="icon" disabled={processing}>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <span>{action.icon}</span>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>{action.tooltip}</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Tem certeza?</AlertDialogTitle>
                                        <AlertDialogDescription>{action.description(car)}</AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                        <AlertDialogAction onClick={() => action.onConfirm(car)}>Sim</AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        ))}

                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button variant="destructive" className="hover:bg-red-700" size="icon" disabled={processing}>
                                    <Trash />
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Tem certeza?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        Remover o {car.brand} - {car.model} {car.year}.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                    <AlertDialogAction onClick={() => handleDeleteCar(car.id)}>Excluir</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                );
            },
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Cars" />

            <div className="my-4 ml-4">
                <Link href={'/cars/create'}>
                    <Button className="text-md cursor-pointer bg-green-600 font-bold shadow-lg hover:bg-green-700">Adicionar carro</Button>
                </Link>
            </div>
            <div className="m-4">
                <DataTable columns={columns} data={props.cars} searchFields={['brand', 'model', 'year', 'status', 'active']}></DataTable>
            </div>
        </AppLayout>
    );
}
