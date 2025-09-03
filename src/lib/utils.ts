import { Task } from "@/app/types/Tasks";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// empty task state
export const emptyTask: Task = {
  title: "",
  description: "",
  image: "",
  priority: "Low",
};