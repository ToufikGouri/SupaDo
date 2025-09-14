"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import AddTaskDrawer from "./AddTaskDrawer";
import {
  LayoutGridIcon,
  PlusIcon,
  TablePropertiesIcon as LayoutListIcon,
  ArrowUpDownIcon,
} from "lucide-react";
import ToolTip from "../ToolTip";
import { Separator } from "@/components/ui/separator";
import Select from "../Select";
import SearchBar from "./SearchBar";

type TasksBtnsProps = {
  layout: "list" | "grid";
  setLayout: React.Dispatch<React.SetStateAction<"list" | "grid">>;
  searchResults: any[];
  setSearchResults: React.Dispatch<React.SetStateAction<any[]>>;
};

const TasksBtns = ({
  layout,
  setLayout,
  searchResults,
  setSearchResults,
}: TasksBtnsProps) => {
  const [openSheet, setOpenSheet] = useState<boolean>(false);
  const [openSortDropdown, setOpenSortDropdown] = useState<boolean>(false);

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 h-full">
          {/* sort button */}
          <ToolTip
            trigger={
              // <Button onClick={() => {}} variant="outline">
              //   <ArrowUpDownIcon /> Sort
              // </Button>
              <Select
                triggerClassName="w-fit px-0"
                customTrigger={
                  <Button
                    onClick={() => setOpenSortDropdown(true)}
                    variant="outline"
                  >
                    <ArrowUpDownIcon /> Sort
                  </Button>
                }
                items={[
                  { label: "1", value: "one" },
                  { label: "2", value: "two" },
                ]}
                open={openSortDropdown}
                onOpenChange={setOpenSortDropdown}
              />
            }
            content={<div>Sort as: Asc</div>}
          />
          {/* layout button */}
          <ToolTip
            trigger={
              <Button
                onClick={() => setLayout(layout === "grid" ? "list" : "grid")}
                variant="outline"
              >
                {layout === "grid" ? (
                  <LayoutGridIcon className="" />
                ) : (
                  <LayoutListIcon className="rotate-180" />
                )}
                Layout
              </Button>
            }
            content={
              <div>Change Layout to {layout === "grid" ? "List" : "Grid"}</div>
            }
          />
          <Separator orientation="vertical" />
          {/* add task button */}
          <Button onClick={() => setOpenSheet(!openSheet)}>
            <PlusIcon /> Add Task
          </Button>
        </div>
        <SearchBar
          searchResults={searchResults}
          setSearchResults={setSearchResults}
        />
      </div>
      {/* Add Task Drawer */}
      <AddTaskDrawer openSheet={openSheet} setOpenSheet={setOpenSheet} />
    </>
  );
};

export default TasksBtns;
