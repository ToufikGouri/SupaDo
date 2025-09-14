import { Task } from "@/app/types/Tasks";
import { Separator } from "@/components/ui/separator";
import { HeartIcon, Trash2Icon } from "lucide-react";
import Image from "next/image";
import React from "react";

type TaskCardProps = {
  task: Task;
  layout: "list" | "grid";
  handleEditTask: (task: Task) => void;
  handleDeleteTask: (id: number) => void;
};

const TaskCard = ({
  task,
  layout,
  handleEditTask,
  handleDeleteTask,
}: TaskCardProps) => {
  return (
    <div
      key={task.id}
      className={`relative cursor-pointer ${
        layout === "list"
          ? "grid grid-flow-col grid-cols-[9fr_2.9fr_0.1fr] justify-between gap-4 py-4 pl-4 pr-2"
          : "flex flex-col justify-between px-4 pt-4"
      } min-h-40 max-h-84 rounded-lg bg-primaryCard hover:shadow-lg transition-shadow overflow-auto`}
      onClick={() => handleEditTask(task)}
    >
      <div>
        {/* title */}
        <h2 className="text-xl font-semibold text-primaryText">{task.title}</h2>

        {/* description */}
        {task.description && (
          <div>
            <Separator className="my-2" />
            <p className="text-secondaryText">{task.description}</p>
          </div>
        )}
      </div>

      {/* image */}
      {task.image ? (
        <div>
          <div
            className={`relative ${
              layout === "list" ? "w-full h-40" : "w-full h-40"
            }`}
          >
            <Image
              src={task.image}
              alt="Task Image"
              fill
              className="object-cover rounded-md"
            />
          </div>
        </div>
      ) : (
        <div /> // placeholder to maintain grid structure
      )}

      {/* buttons */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`bg-primaryCard flex cursor-default ${
          layout === "list"
            ? "gap-2"
            : "sticky bottom-0 pb-4 flex-col justify-between"
        }`}
      >
        <Separator
          className="my-2"
          orientation={layout === "list" ? "vertical" : "horizontal"}
        />
        <div
          className={`flex items-center justify-between ${
            layout === "list" ? "flex-col" : ""
          }`}
        >
          <div>
            <Trash2Icon
              size={18}
              className={`cursor-pointer`}
              onClick={() => handleDeleteTask(task.id as number)}
            />
          </div>
          <div>
            <HeartIcon
              size={18}
              className={`cursor-pointer text-red-700 fill-red-700`}
              onClick={() => {}}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
