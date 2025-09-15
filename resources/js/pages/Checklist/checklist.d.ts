import { Car } from '../Car/car';
import { Task } from './task';

type Checklist = {
    cars: Car[];
    tasks: Task[];
    progress: number;
    id: number;
    id_user: number;
    status: string;
};

type ChecklistFormData = {
    id: number;
};
