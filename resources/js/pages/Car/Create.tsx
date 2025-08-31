import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Cars',
        href: '/cars',
    },
    {
        title: 'Add car',
        href: '/cars/create',
    },
];

export default function Create() {
    const { data, setData, post, errors } = useForm({
        brand: '',
        model: '',
        year: '',
    });

    function handleSubmit(event: React.FormEvent) {
        event.preventDefault();
        post('/cars');
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create car" />
            <Card className="m-6">
                <CardHeader className="text-l font-serif font-bold">Adicionar novo carro</CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-row gap-2">
                            <div className="mb-4 flex flex-col gap-1">
                                <Label>Marca</Label>
                                <Input placeholder="Digite a marca do carro" value={data.brand} onChange={(e) => setData('brand', e.target.value)} />
                                <InputError message={errors.brand}></InputError>
                            </div>
                            <div className="mb-4 flex flex-col gap-1">
                                <Label>Modelo</Label>
                                <Input placeholder="Digite o modelo do carro" value={data.model} onChange={(e) => setData('model', e.target.value)} />
                                <InputError message={errors.model}></InputError>
                            </div>
                            <div className="mb-4 flex flex-col gap-1">
                                <Label>Ano</Label>
                                <Input
                                    placeholder="Digite o ano do carro"
                                    value={data.year}
                                    onChange={(e) => {
                                        if (e.target.value.length > 4) return;
                                        return setData('year', e.target.value);
                                    }}
                                />
                                <InputError message={errors.year}></InputError>
                            </div>
                        </div>
                        <Button type="submit" className="mt-4">
                            Salvar carro
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </AppLayout>
    );
}
