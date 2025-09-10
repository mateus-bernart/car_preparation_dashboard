import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Checklist',
        href: '/checklists',
    },
];

export default function Checklists() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Cars" />
            <div className="my-4 ml-4">
                <Link href={'/checklists/create'}>
                    <Button className="text-md cursor-pointer bg-green-600 font-bold hover:bg-green-700">Adicionar checklist</Button>
                </Link>
            </div>
            <Card className="m-6">
                <CardHeader className="font-serif text-2xl font-bold"> Checklist</CardHeader>
                <CardContent></CardContent>
            </Card>
        </AppLayout>
    );
}
