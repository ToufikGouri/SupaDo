import React, { ReactNode } from "react";
import {
  Select as ShadcnSelect,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type SelectProps = {
  trigger?: ReactNode;
  triggerClassName?: string;
  customTrigger?: ReactNode;
  items: { label: string; value: string | number }[];
  onSelectChange?: (value: string | number) => void;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

const Select = ({
  trigger = "Select",
  triggerClassName,
  customTrigger,
  items,
  onSelectChange,
  open,
  onOpenChange,
}: SelectProps) => {
  return (
    <ShadcnSelect open={open} onOpenChange={onOpenChange}>
      <SelectTrigger className={`w-[180px] ${triggerClassName}`} customTrigger={customTrigger}>
        <SelectValue placeholder={trigger} />
      </SelectTrigger>

      <SelectContent>
        {items.map((item) => (
          <SelectItem
            key={item.value}
            value={item.value.toString()}
            onSelect={() => onSelectChange?.(item.value)}
          >
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </ShadcnSelect>
  );
};

export default Select;
