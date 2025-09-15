"use client";
import React, { useState } from "react";
import useInfiniteScroll from "../hooks/useInfiniteScroll";
import { LoaderCircleIcon } from "lucide-react";

const page = () => {
  const { data, error, loading, hasMore, lastElementRef } = useInfiniteScroll({
    url: "https://dummyjson.com/users",
    limit: 10,
    triggerPercent: 80, // fetch when 80% scrolled
  });

  return (
    <div className="border flex flex-col items-center gap-4 h-screen overflow-auto">
      <h1>Infinite Scroll Test Page</h1>
      {error ? (
        <div className="">Something went wrong</div>
      ) : (
        <div className="flex flex-col items-center gap-4">
          {data?.map((item: any, idx: number) => (
            <div key={item.id} className="capitalize size-40 border rounded-lg">
              {idx + 1}: {item?.username}
            </div>
          ))}
          <div ref={lastElementRef} className="py-4 text-gray-500">
            {loading ? (
              <div className="animate-spin">
                <LoaderCircleIcon />
              </div>
            ) : hasMore ? (
              ""
            ) : (
              "No more data"
            )}
          </div>
        </div>
      )}
    </div>
  );
};
export default page;
