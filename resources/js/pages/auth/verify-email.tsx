import { logout } from '@/routes';
import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';

import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import AuthLayout from '@/layouts/auth-layout';

interface VerifyEmailProps {
    status?: string;
}

export default function VerifyEmail({ status }: VerifyEmailProps) {
    const { post, processing } = useForm({}); // não há campos, só envia a requisição

    const resendVerification = (e: React.FormEvent) => {
        e.preventDefault();
        post('/email/verification-notification');
    };

    return (
        <AuthLayout title="Verify email" description="Please verify your email address by clicking on the link we just emailed to you.">
            <Head title="Email verification" />

            {status === 'verification-link-sent' && (
                <div className="mb-4 text-center text-sm font-medium text-green-600">
                    A new verification link has been sent to the email address you provided during registration.
                </div>
            )}

            <form onSubmit={resendVerification} className="space-y-6 text-center">
                <Button type="submit" disabled={processing} variant="secondary">
                    {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                    Resend verification email
                </Button>

                <TextLink href={logout()} className="mx-auto block text-sm">
                    Log out
                </TextLink>
            </form>
        </AuthLayout>
    );
}
