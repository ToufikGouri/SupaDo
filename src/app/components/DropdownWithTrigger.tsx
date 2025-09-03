import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDownIcon } from "lucide-react";

type DropdownWithTriggerProps = {
  triggerLabel?: string;
  menuLabel?: string;
  menuItems: string[];
  onSelectItem?: (item: string) => void;
  align?: "center" | "start" | "end";
};

const DropdownWithTrigger = ({
  triggerLabel = "Select",
  menuLabel = "Select an option",
  menuItems,
  onSelectItem,
  align = "start",
}: DropdownWithTriggerProps) => {
  return (
    <div className="parent">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button variant="outline" className="w-fit">
            {triggerLabel} <ChevronDownIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align={align}>
          <DropdownMenuLabel>{menuLabel}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {/* menu items */}
          {menuItems.map((item, index) => (
            <DropdownMenuItem key={index} onSelect={() => onSelectItem?.(item)}>
              {item}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default DropdownWithTrigger;
