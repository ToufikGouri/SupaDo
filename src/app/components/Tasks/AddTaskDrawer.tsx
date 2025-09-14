import React, { useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { Textarea } from "@/components/ui/textarea";
import DropdownWithTrigger from "../DropdownWithTrigger";
import { Task } from "@/app/types/Tasks";
import { priority } from "@/app/types/general";
import { InfoIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";
import { emptyTask } from "@/lib/utils";

type AddTaskDrawerProps = {
  openSheet: boolean;
  setOpenSheet: React.Dispatch<React.SetStateAction<boolean>>;
  editingTask?: Task;
};

const AddTaskDrawer = ({
  openSheet,
  setOpenSheet,
  editingTask,
}: AddTaskDrawerProps) => {
  // task
  const [task, setTask] = useState<Task>(emptyTask);

  // image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
  };

  // priority dropdown
  const priorityOptions: priority[] = ["Low", "Medium", "High"];

  const onPrioritySelect = (option: priority) => {
    setTask({ ...task, priority: option });
  };

  // handle add task
  const handleTask = async () => {
    if (task.title.trim() === "") {
      toast.error("Title is required");
      return;
    }

    try {
      await supabase.from("Tasks").insert(task).single();
    } catch (error) {
      toast.error(`${error || "Something went wrong"}`);
    }
    toast.success("Task added successfully!");
    setTask(emptyTask);
    setOpenSheet(false);
  };

  useEffect(() => {
    if (editingTask) {
      setTask(editingTask);
    }
  }, [editingTask]);

  return (
    <Sheet
      open={openSheet}
      onOpenChange={() => {
        setOpenSheet(!openSheet);
        setTask(emptyTask);
      }}
    >
      <SheetContent className="sm:max-w-[30%]">
        <SheetHeader>
          <SheetTitle>{editingTask ? "Edit task" : "Add New Task"}</SheetTitle>
          <SheetDescription>
            Fill in the details below to create a new task. You can always edit
            or update it later.
            <div className="flex items-center gap-1">
              <InfoIcon size={16} /> Title is required and other fields are
              optional.
            </div>
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-col gap-4 p-4">
          {/* title */}
          <div className="grid grid-cols-[4fr_8fr] w-full justify-between gap-3">
            <Label htmlFor="title">Title</Label>
            <Input
              type="text"
              id="title"
              placeholder="Title"
              value={task.title}
              onChange={(e) =>
                setTask((pre) => ({ ...pre, title: e.target.value }))
              }
            />
          </div>
          {/* description */}
          <div className="grid grid-cols-[4fr_8fr] w-full gap-3">
            <Label htmlFor="description">Description</Label>
            <Textarea
              placeholder="Type your description here"
              id="description"
              className="max-h-60"
              value={task.description}
              onChange={(e) =>
                setTask((pre) => ({ ...pre, description: e.target.value }))
              }
            />
          </div>
          {/* image */}
          <div className="grid grid-cols-[4fr_8fr] w-full gap-3">
            <Label htmlFor="image">Image</Label>
            <Input
              id="image"
              type="file"
              // value={task.image} // handle properly and show preview of image
              onChange={(e) => handleImageUpload(e)}
            />
          </div>
          {/* priority */}
          <div className="grid grid-cols-[4fr_8fr] w-full gap-3">
            <div>Priority</div>
            <DropdownWithTrigger
              triggerLabel={task.priority}
              menuLabel="Priority of the task"
              menuItems={priorityOptions}
              onSelectItem={(option) => onPrioritySelect(option as priority)}
            />
          </div>
        </div>
        <SheetFooter>
          <Button onClick={handleTask}>{editingTask ? "Update Task" : "Add Task"}</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default AddTaskDrawer;
