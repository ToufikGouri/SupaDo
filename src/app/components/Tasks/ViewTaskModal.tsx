import React from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Task } from "@/app/types/Tasks";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

type ViewTaskModalProps = {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
  currentTask: Task;
  handleEditTask: (task: Task) => void;
};

const ViewTaskModal = ({
  isOpen,
  setIsOpen,
  currentTask,
  handleEditTask,
}: ViewTaskModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-xl sm:max-h-2/4 overflow-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-primaryText">
            {currentTask?.title}
          </DialogTitle>
          {/* <DialogDescription>Description here</DialogDescription> */}
          <Separator className="my-2" />
        </DialogHeader>
        <div className="flex flex-col gap-2">
          <div className="grid flex-1 gap-2 text-secondaryText">
            {currentTask?.description}
          </div>
          {currentTask?.image && (
            <div className={`relative w-full h-40`}>
              <Image
                src={currentTask.image}
                alt="Task Image"
                fill
                className="object-contain rounded-md"
              />
            </div>
          )}
        </div>
        <DialogFooter className="sm:justify-start"></DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ViewTaskModal;
