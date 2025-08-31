import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { Search, Trash } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Cars',
        href: '/cars',
    },
];

type PageProps = {
    cars: Array<{
        id: number;
        brand: string;
        model: string;
        year: string;
        created_at: string;
        status: string;
    }>;
    success?: string;
};

export default function Cars() {
    const { props } = usePage<PageProps>();
    const flashMessage = props.success as string | undefined;
    const [shown, setShown] = useState(false);
    const [query, setQuery] = useState<string>('');
    const { delete: destroy, processing } = useForm();

    useEffect(() => {
        console.log(flashMessage);

        if (flashMessage && !shown) {
            toast.success(flashMessage);
            setShown(true);
        }
    }, [flashMessage, shown]);

    const handleDeleteEvent = (id: number) => {
        if (confirm('Are you sure you want to delete this car?')) {
            // Call the delete endpoint
            // For example, using Inertia:
            // Inertia.delete(`/events/${id}`);
            destroy(`/cars/${id}`, {
                onSuccess: () => {
                    // Show a success toast notification
                    toast.success('Car deleted successfully');
                },
            });
        }
    };

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'approved':
                return 'bg-green-700';
            case 'rejected':
                return 'bg-red-700';
            case 'pending':
                return 'bg-amber-600';
        }
    };

    const filteredCars = props.cars.filter(
        (car) =>
            car.brand.toLowerCase().includes(query.toLowerCase()) ||
            car.model.toLowerCase().includes(query.toLowerCase()) ||
            car.year.toString().includes(query.toLowerCase()),
    );

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Cars" />
            <div className="m-4 flex w-1/2 items-center gap-2">
                <Search />
                <Input
                    placeholder="Search event"
                    className=""
                    onChange={(e) => {
                        setQuery(e.target.value);
                    }}
                ></Input>
            </div>

            <div className="my-4 ml-4">
                <Link href={'/cars/create'}>
                    <Button className="text-md cursor-pointer bg-blue-400 font-bold hover:bg-blue-500">Add car</Button>
                </Link>
            </div>
            {filteredCars.length > 0 ? (
                <div className="mx-4 mb-4 flex flex-wrap gap-4">
                    {filteredCars.map((car) => (
                        <div className="w-full sm:w-[48%] md:w-[31%]" key={car.id}>
                            <Card className="relative h-full transition-all duration-200 dark:bg-gray-500 dark:hover:bg-gray-600" key={car.id}>
                                <CardHeader className="font-bold">
                                    <CardTitle>{car.brand}</CardTitle>
                                </CardHeader>
                                <CardContent className="h-20 text-gray-500">
                                    <CardDescription className="mb-4 line-clamp-3">{car.model}</CardDescription>
                                </CardContent>
                                <CardFooter className="mb-8 flex flex-col gap-2">
                                    <p>
                                        Start date: <span className="font-bold">{new Date(car.created_at).toLocaleDateString('pt-BR')}</span>
                                    </p>
                                </CardFooter>
                                <Button
                                    onClick={() => handleDeleteEvent(car.id)}
                                    className="absolute top-4 right-4 cursor-pointer bg-red-600 hover:bg-red-800"
                                    disabled={processing}
                                >
                                    <Trash />
                                </Button>
                                <div
                                    className={`absolute right-0 bottom-0 rounded-tl-lg rounded-br-lg ${getStatusColor(car.status)} p-2 text-center text-white`}
                                >
                                    <span className="capitalize">{car.status}</span>
                                </div>
                            </Card>
                        </div>
                    ))}
                </div>
            ) : (
                <span className="mx-4">No cars found</span>
            )}
        </AppLayout>
    );
}
