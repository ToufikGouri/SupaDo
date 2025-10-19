import React, { useState } from "react";
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
import Loader from "../Loader";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";
import { Task } from "../../types/Tasks";

type DeleteModalProps = {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
  currentTask: Task;
};

const DeleteModal = ({ isOpen, setIsOpen, currentTask }: DeleteModalProps) => {
  const [isLoadingDelete, setIsLoadingDelete] = useState<boolean>(false);

  const handleDeleteTask = () => {
    setIsLoadingDelete(true);
    // add delete logic here
    try {
      toast.success("Task deleted successfully");
    } catch (error) {
      toast.error("Something went wrong");
    }
    setIsLoadingDelete(false);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Delete Task ?</DialogTitle>
          <Separator />
          <DialogDescription>
            Are you sure you want to delete this task? This action cannot be
            undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="">
          <DialogClose asChild>
            <>
              <Button
                type="button"
                variant="secondary"
                onClick={() => setIsOpen(false)}
              >
                Close
              </Button>
              <Button
                type="button"
                variant="destructive"
                onClick={handleDeleteTask}
              >
                Confirm
                {isLoadingDelete && <Loader />}
              </Button>
            </>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteModal;
