import { Car } from '../Car/car';
import { Task } from './task';

type Checklist = {
    car: Car;
    tasks: Task[];
    progress: number;
    id: number;
    id_car: number;
    include_default_tasks: boolean;
    id_user: number;
    status: string;
};

type ChecklistFormData = {
    id: number;
};
