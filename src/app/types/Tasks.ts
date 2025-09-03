import { priority } from "./general";

export type Task = {
    readonly id?: number;
    readonly user_id?: number;
    readonly created_at?: string; 
    title: string;
    description?: string;
    image?: string;
    priority?: priority;
    favourite?: boolean;
};