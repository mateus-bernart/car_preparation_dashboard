import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Car as CarIcon, CheckCircle, Clock, Truck, X } from 'lucide-react';
import { Car } from './Car/car';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard({ cars }: { cars: Car[] }) {
    function filterCars(event: React.ChangeEvent<HTMLInputElement>) {
        console.log(event.target.value);
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            {/* ====== OVERVIEW ========= */}
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
                    <Card className="relative aspect-video h-35 w-full overflow-hidden rounded-sm border border-sidebar-border/70 bg-gray-50 p-8 dark:border-sidebar-border dark:bg-gray-800">
                        <div className="flex justify-between">
                            <h2 className="text-muted-foreground">Total de Carros</h2>
                            <CarIcon color="gray" size={20} />
                        </div>
                        <span className="text-2xl">{cars.length}</span>
                    </Card>
                    <Card className="relative aspect-video h-35 w-full overflow-hidden rounded-sm border border-sidebar-border/70 bg-amber-50 p-8 dark:border-sidebar-border dark:bg-yellow-900">
                        <div className="flex justify-between">
                            <h2 className="text-muted-foreground">Em preparação</h2>
                            <Clock color="gray" size={20} />
                        </div>
                        <span className="text-2xl">{cars.length}</span>
                    </Card>
                    <Card className="relative aspect-video h-35 w-full overflow-hidden rounded-sm border border-sidebar-border/70 bg-blue-50 p-8 dark:border-sidebar-border dark:bg-blue-950">
                        <div className="flex justify-between">
                            <h2 className="text-muted-foreground">Pronto para entrega</h2>
                            <CheckCircle color="gray" size={20} />
                        </div>
                        <span className="text-2xl">{cars.length}</span>
                    </Card>
                    <Card className="relative aspect-video h-35 w-full overflow-hidden rounded-sm border border-sidebar-border/70 bg-green-50 p-8 dark:border-sidebar-border dark:bg-green-950">
                        <div className="flex justify-between">
                            <h2 className="text-muted-foreground">Entregados</h2>
                            <Truck color="gray" size={20} />
                        </div>
                        <span className="text-2xl">{cars.length}</span>
                    </Card>
                </div>

                {/* ===== SEARCH ===== */}
                <div className="flex gap-3">
                    <Input className="my-4w-1/2" placeholder="Pesquise por modelo, marca, ano, etc..." onChange={filterCars} />
                    <Button variant="outline">
                        <X color="gray" />
                        <span className="text-muted-foreground">Limpar filtros</span>
                    </Button>
                </div>
                <Card className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                    <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                </Card>
            </div>
        </AppLayout>
    );
}
