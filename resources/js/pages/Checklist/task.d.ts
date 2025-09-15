import { Category } from './category';

export type Task = {
    id: number;
    id_checklist: number;
    id_category: number;
    category: Category;
    description: string;
    status: number;
};
