import { Category } from './category';

export type Task = {
    category: Category;
    id: number;
    id_checklist: number;
    id_category: number;
    is_default_task: number;
    category: Category;
    description: string;
    status: number;
};
