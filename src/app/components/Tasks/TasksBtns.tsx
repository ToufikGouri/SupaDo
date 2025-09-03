"use client";
import React, { useState } from "react";
import { Task } from "@/app/types/Tasks";
import { Button } from "@/components/ui/button";
import { priority } from "@/app/types/general";
import AddTaskDrawer from "./AddTaskDrawer";
import { ArrowDownNarrowWideIcon, PlusIcon } from "lucide-react";
import ToolTip from "../ToolTip";

type TasksBtnsProps = {};

const TasksBtns = ({}: TasksBtnsProps) => {
  const [openSheet, setOpenSheet] = useState<boolean>(false);

  return (
    <>
      <div className="flex items-center gap-4">
        <Button onClick={() => setOpenSheet(!openSheet)}>
          <PlusIcon /> Add Task
        </Button>
        <ToolTip
          trigger={
            <Button onClick={() => {}} variant="outline">
              <ArrowDownNarrowWideIcon /> Sort
            </Button>
          }
          content={<div>Sort as: Asc</div>}
        />
      </div>
      {/* Add Task Drawer */}
      <AddTaskDrawer openSheet={openSheet} setOpenSheet={setOpenSheet} />
    </>
  );
};

export default TasksBtns;
