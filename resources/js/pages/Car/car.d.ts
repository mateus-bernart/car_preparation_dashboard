import { Priority } from '../Checklist/priority';

export type Car = {
    id: number;
    id_checklist: number;
    id_priority: number;
    priority: Priority;
    customer: string;
    delivery_date: string;
    brand: string;
    model: string;
    year: number;
    created_at: string;
    status: string;
    active: number;
};
