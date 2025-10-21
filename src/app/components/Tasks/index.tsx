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
