import React from "react";
import { LoaderCircleIcon } from "lucide-react";

const Loader = () => {
  return (
    <div className="animate-spin">
      <LoaderCircleIcon />
    </div>
  );
};

export default Loader;
