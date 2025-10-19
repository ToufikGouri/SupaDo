import React, { useState } from 'react'
import TaskCard from './TaskCard'
import { Task } from '@/app/types/Tasks';
import { supabase } from '@/lib/supabase';
import useInfiniteScroll from '@/app/hooks/useInfiniteScroll';

type TaskListProps = {
    layout: "list" | "grid";
    handleOnTaskClick: (task: Task) => void;
    handleDeleteTask: (id: number) => void;
}

const TaskList = ({ layout, handleOnTaskClick, handleDeleteTask }: TaskListProps) => {

    // fetch tasks from supabase
    const fetchTasks = async (from: number, to: number) => {
        const { data, error } = await supabase
            .from("Tasks")
            .select("*")
            .order("created_at", { ascending: false })
            .range(from, to);

        if (error) throw error;
        return data ?? [];
    };

    const { data: tasks, loading, lastElementRef, hasMore } = useInfiniteScroll({
        fetchFn: fetchTasks,
        limit: 10,
        triggerPercent: 80
    });

    return (
        <section className={`w-full grid ${layout === "grid" ? "grid-cols-3" : "grid-cols-1"} gap-4 break-all`}>
            {tasks?.map((task: Task, idx: number) => (
                <TaskCard
                    key={task.id}
                    task={task}
                    layout={layout}
                    handleOnTaskClick={handleOnTaskClick}
                    handleDeleteTask={handleDeleteTask}
                    lastCardRef={idx === tasks.length - 1 ? lastElementRef : null}
                />
            ))}
            {loading && <p>Loading...</p>}
            {!hasMore && <p>No more tasks</p>}
        </section>
    )
}

export default TaskList