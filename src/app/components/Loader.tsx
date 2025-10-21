import React from "react";
import { LoaderCircleIcon } from "lucide-react";

type LoaderProps = {
  className?: string;
}

const Loader = ({ className = "" }: LoaderProps) => {
  return (
    <div className={className}>
      <LoaderCircleIcon className="animate-spin" />
    </div>
  );
};

export default Loader;
