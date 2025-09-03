import React, { ReactNode } from "react"; 
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type ToolTipProps = {
  trigger: ReactNode;
  content: ReactNode;
};

const ToolTip = ({ trigger, content }: ToolTipProps) => {
  return (
    <Tooltip>
      <TooltipTrigger>{trigger}</TooltipTrigger>
      <TooltipContent>
        {content}
      </TooltipContent>
    </Tooltip>
  );
};

export default ToolTip;
