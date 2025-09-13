import { Car } from '../Car/car';
import { Task } from './task';

type Checklist = {
    cars: Car[];
    tasks: Task[];
    id: number;
    description: string;
    id_car: number;
    id_category: number;
    id_user: number;
    status: string;
    updated_at: string;
    created_at: string;
};

type ChecklistFormData = {
    id: number;
};
