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
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { ChevronDown, Trash } from 'lucide-react';
import { useEffect } from 'react';
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
    const { delete: destroy, processing, put } = useForm();

    useEffect(() => {
        if (props.success) {
            toast.success(props.success);
        }
    }, [props, props.success]);

    const handleDeleteCar = (id: number) => {
        destroy(`/cars/${id}`);
    };

    const handleUpdateStatus = (id: number) => {
        put(`/cars/${id}/toggle-status`, {
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
            accessorKey: 'status',
            header: 'Status',
            cell: ({ row }) => {
                const car = row.original;
                console.log('car: ', car);

                const statusOption = car.status.toString() === '1' ? 'ativo' : 'inativo';
                const statusText = car.status.toString() === '1' ? 'inativo' : 'ativo';
                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="outline"
                                size="sm"
                                className={car.status.toString() === '1' ? 'bg-green-100 hover:bg-green-200' : 'bg-red-100 hover:bg-red-200'}
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
            id: 'actions',
            header: 'Ações',
            cell: ({ row }) => {
                const car = row.original;

                return (
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
                <DataTable columns={columns} data={props.cars} searchFields={['brand', 'model', 'year', 'status']}></DataTable>
            </div>
        </AppLayout>
    );
}
