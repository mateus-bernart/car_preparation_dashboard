import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';
import { login } from '@/routes/index';

export default function ForgotPassword({ status }: { status?: string }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/forgot-password');
    };

    return (
        <AuthLayout title="Esquecer senha" description="Insira seu endereço de e-mail para receber um link de redefinição de senha">
            <Head title="Esqueci minha senha" />

            {status && <div className="mb-4 text-center text-sm font-medium text-green-600">{status}</div>}

            <form onSubmit={submit} className="space-y-6">
                <div className="grid gap-2">
                    <Label htmlFor="email">Endereço de e-mail</Label>
                    <Input
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        autoComplete="off"
                        autoFocus
                        placeholder="email@exemplo.com"
                    />
                    <InputError message={errors.email} />
                </div>

                <div className="my-6 flex items-center justify-start">
                    <Button className="w-full" disabled={processing}>
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                        Enviar link de redefinição
                    </Button>
                </div>
            </form>

            <div className="space-x-1 text-center text-sm text-muted-foreground">
                <span>Ou, retorne para o </span>
                <TextLink href={login()}>Login</TextLink>
            </div>
        </AuthLayout>
    );
}
