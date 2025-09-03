"use client";
import { Task } from "@/app/types/Tasks";
import React, { useEffect, useState } from "react";
import TasksBtns from "./TasksBtns";
import { Separator } from "@/components/ui/separator";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import AddTaskDrawer from "./AddTaskDrawer";
import { emptyTask } from "@/lib/utils";

const Tasks = () => {
  let noData = false;
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editTask, setEditTask] = useState<Task>(emptyTask);
  const [openSheet, setOpenSheet] = useState<boolean>(false);

  const mockTask: Task[] = [
    {
      id: 1,
      title: "Task 1",
      description:
        "This is task 1 description whch is very long and should be truncated and there is some more text to make it even longer",
    },
    {
      id: 2,
      title: "Task 2",
      description: "This is task 2 which is also the description",
    },
    {
      id: 3,
      title:
        "This is a very long title for task 3 which should be displayed properly and here is some more text to make it even longer -- This is a very long title for task 3 which should be displayed properly and here is some more text to make it even longer ",
      description: "This is task 2 which is also the description",
    },
  ];

  const handleEditTask = (task: Task) => {
    if (!task.description) task.description = "";
    if (!task.image) task.image = "";
    if (!task.priority) task.priority = "Low";
    setEditTask(task);
    setOpenSheet(true);
  };

  const fetchTasks = async () => {
    try {
      // const { data, error } = await supabase.from("Tasks").select("*");
      // if (data) setTasks(data);
    } catch (error) {
      console.log("error is", error);
      toast.error(`${error || "Failed to fetch tasks"}`);
      return;
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // no data screen
  if (noData) {
    return (
      <div className="text-3xl font-bold text-gray-400 absolute left-2/4 -translate-x-2/4 top-2/4 -translate-y-2/4">
        <div>No Tasks Available</div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold text-primary">My Tasks</h1>
        <div>
          Statistics
          {/* total tasks */}
          {/* high priority tasks */}
          {/* faviorite tasks */}
        </div>
      </div>
      <Separator className="my-4" />
      {/* task section buttons */}
      <TasksBtns />
      {/* tasks rendering */}
      <div className="flex flex-col gap-8">
        <p className="my-4">From Supabase</p>
        {tasks.map((task) => (
          <div
            key={task.id}
            className=" bg-primaryCard rounded-lg p-4 hover:shadow-lg transition-shadow"
          >
            <h2 className="text-xl font-semibold text-primaryText">
              {task.title}
            </h2>
            {task.description && (
              <p className="mt-2 text-secondaryText">{task.description}</p>
            )}
          </div>
        ))}
        <p className="my-4">Mock</p>
        <section className="w-full grid grid-cols-3 gap-4 break-all">
          {mockTask.map((task) => (
            <div
              key={task.id}
              className="max-h-80 bg-primaryCard rounded-lg p-4 hover:shadow-lg transition-shadow overflow-auto"
              onClick={() => handleEditTask(task)}
            >
              <h2 className="text-xl font-semibold text-primaryText">
                {task.title}
              </h2>

              {task.description && (
                <div>
                  <Separator className="my-2" />
                  <p className="mt-2 text-secondaryText">{task.description}</p>
                  <Separator className="my-2" />
                </div>
              )}
            </div>
          ))}
        </section>
      </div>
      {/* Add Task Drawer */}
      <AddTaskDrawer
        openSheet={openSheet}
        setOpenSheet={setOpenSheet}
        editingTask={editTask}
      />
    </div>
  );
};

export default Tasks;

// palette reference dark mode: https://coolors.co/palette/4f4f4f-3f3f3f-2f2f2f-1f1f1f-0f0f0f
// palette reference: https://www.color-hex.com/color-palette/106748
