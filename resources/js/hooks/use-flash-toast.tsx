import { usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import { toast } from 'sonner';

type PageProps = {
    success?: string;
    error?: string;
};

export function useFlashToast() {
    const { props } = usePage<PageProps>();

    useEffect(() => {
        if (props.success) {
            // Assuming you have a toast function available
            toast.success(props.success);
        }
        if (props.error) {
            toast.error(props.error);
        }
    }, [props.success, props.error]);
}
