"use client";
import { Task } from "@/app/types/Tasks";
import React, { useEffect, useState } from "react";
import TasksBtns from "./TasksBtns";
import { Separator } from "@/components/ui/separator";
import AddTaskDrawer from "./AddTaskDrawer";
import { emptyTask } from "@/lib/utils";
import DeleteModal from "./DeleteModal";
import ViewTaskModal from "./ViewTaskModal";
import TaskList from "./TaskList";
import Header from "../Header";

const Tasks = () => {
  const noData = false;
  // task states
  const [currentTask, setCurrentTask] = useState<Task>(emptyTask);
  const [editTask, setEditTask] = useState<Task>(emptyTask);
  // modal states
  const [openSheet, setOpenSheet] = useState<boolean>(false);
  const [openViewTaskModal, setOpenViewTaskModal] = useState<boolean>(false);
  const [openDltModal, setOpenDltModal] = useState<boolean>(false);
  // layout state
  const [layout, setLayout] = useState<"list" | "grid">("grid");
  // search state
  const [searchResults, setSearchResults] = useState<Task[]>([]);

  // delete task
  const handleDeleteTask = async (id: number) => {
    setOpenDltModal(true);
  };

  const mockTask: Task[] = [
    {
      id: 1,
      title: "Task 1",
      description:
        "This is task 1 description whch is very long and should be truncated and there is some more text to make it even longer",
      image:
        "https://static.vecteezy.com/system/resources/thumbnails/057/068/323/small/single-fresh-red-strawberry-on-table-green-background-food-fruit-sweet-macro-juicy-plant-image-photo.jpg",
    },
    {
      id: 2,
      title: "Task 2",
      description: "This is task 2 which is also the description",
      // image:
      //   "https://static.vecteezy.com/system/resources/thumbnails/057/068/323/small/single-fresh-red-strawberry-on-table-green-background-food-fruit-sweet-macro-juicy-plant-image-photo.jpg",
    },
    {
      id: 3,
      title:
        "This is a very long title for task 3 which should be displayed properly and here is some more text to make it even longer -- This is a very long title for task 3 which should be displayed properly and here is some more text to make it even longer ",
      description: "This is task 2 which is also the description",
      image:
        "https://static.vecteezy.com/system/resources/thumbnails/057/068/323/small/single-fresh-red-strawberry-on-table-green-background-food-fruit-sweet-macro-juicy-plant-image-photo.jpg",
    },
    {
      id: 3,
      title:
        "This is a very long title for task 3 which should be displayed properly and here is some more text to make it even longer -- This is a very long title for task 3 which should be displayed properly and here is some more text to make it even longer ",
      description: "This is task 2 which is also the description",
      image:
        "https://static.vecteezy.com/system/resources/thumbnails/057/068/323/small/single-fresh-red-strawberry-on-table-green-background-food-fruit-sweet-macro-juicy-plant-image-photo.jpg",
    },
    {
      id: 3,
      title:
        "This is a very long title for task 3 which should be displayed properly and here is some more text to make it even longer -- This is a very long title for task 3 which should be displayed properly and here is some more text to make it even longer ",
      description: "This is task 2 which is also the description",
      image:
        "https://static.vecteezy.com/system/resources/thumbnails/057/068/323/small/single-fresh-red-strawberry-on-table-green-background-food-fruit-sweet-macro-juicy-plant-image-photo.jpg",
    },
    {
      id: 3,
      title:
        "This is a very long title for task 3 which should be displayed properly and here is some more text to make it even longer -- This is a very long title for task 3 which should be displayed properly and here is some more text to make it even longer ",
      description: "This is task 2 which is also the description",
      image:
        "https://static.vecteezy.com/system/resources/thumbnails/057/068/323/small/single-fresh-red-strawberry-on-table-green-background-food-fruit-sweet-macro-juicy-plant-image-photo.jpg",
    },
    {
      id: 3,
      title:
        "This is a very long title for task 3 which should be displayed properly and here is some more text to make it even longer -- This is a very long title for task 3 which should be displayed properly and here is some more text to make it even longer ",
      description: "This is task 2 which is also the description",
      image:
        "https://static.vecteezy.com/system/resources/thumbnails/057/068/323/small/single-fresh-red-strawberry-on-table-green-background-food-fruit-sweet-macro-juicy-plant-image-photo.jpg",
    },
  ];

  // edit task
  const handleEditTask = (task: Task) => {
    if (!task.description) task.description = "";
    if (!task.image) task.image = "";
    if (!task.priority) task.priority = "Low";
    setEditTask(task);
    setOpenSheet(true);
  };

  const handleOnTaskClick = (task: Task) => {
    setCurrentTask(task);
    setOpenViewTaskModal(true);
  };

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
      <Header />
      <Separator className="my-4" />
      {/* task section buttons */}
      <TasksBtns
        layout={layout}
        setLayout={setLayout}
        searchResults={searchResults}
        setSearchResults={setSearchResults}
      />
      {/* tasks rendering */}
      <TaskList
        layout={layout}
        handleOnTaskClick={handleOnTaskClick}
        handleDeleteTask={handleDeleteTask}
      />
      {/* Add Task Drawer */}
      <AddTaskDrawer
        openSheet={openSheet}
        setOpenSheet={setOpenSheet}
        editingTask={editTask}
      />
      {/* View Task Modal */}
      <ViewTaskModal
        isOpen={openViewTaskModal}
        setIsOpen={setOpenViewTaskModal}
        currentTask={currentTask}
        handleEditTask={handleEditTask}
      />
      {/* Delete modal */}
      <DeleteModal
        isOpen={openDltModal}
        setIsOpen={setOpenDltModal}
        currentTask={currentTask}
      />
    </div>
  );
};

export default Tasks;

// palette reference dark mode: https://coolors.co/palette/4f4f4f-3f3f3f-2f2f2f-1f1f1f-0f0f0f
// palette reference: https://www.color-hex.com/color-palette/106748
