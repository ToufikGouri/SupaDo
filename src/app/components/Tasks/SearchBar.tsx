"use client";

import React, { useEffect, useState } from "react";
import {
  ArrowRightIcon,
  ArrowUpRightIcon,
  Calculator,
  Calendar,
  CreditCard,
  SearchIcon,
  Settings,
  Smile,
  User,
} from "lucide-react";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";

type SearchBarProps = {
  searchResults: any[];
  setSearchResults: React.Dispatch<React.SetStateAction<any[]>>;
};

const SearchBar = ({ searchResults, setSearchResults }: SearchBarProps) => {
  const [open, setOpen] = useState(false);
  const [searchVal, setSearchVal] = useState<string>("");
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  // const [searchResults, setSearchResults] = useState<any>(["Task 1", "Task 2"]);

  const onCloseModal = (openState: boolean) => {
    setOpen(openState);
    if (!openState) {
      setSearchVal("");
      setSearchResults([]);
      if (searchVal?.trim()) addResultToRecentSearches(searchVal); // add to recent searches when closing modal
    }
  };

  const addResultToRecentSearches = (result: string) => {
    setRecentSearches((prev) => {
      const filtered = prev.filter((r) => r !== result);
      const updated = [result, ...filtered].slice(0, 3);
      // persist immediately: set recent searches to local storage
      localStorage.setItem("recentSearches", JSON.stringify(updated));
      return updated;
    });
  };

  const handleSearch = (query: string) => {
    setSearchVal(query);
  };

  const handleOnClickResult = (result: string) => {
    setSearchVal("");
    addResultToRecentSearches(result); // add to recent searches
    setOpen(false);
  };

  // handle for opening the command dialog with cmd+k or ctrl+k
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  // load recent searches from local storage
  useEffect(() => {
    const stored = localStorage.getItem("recentSearches");
    if (stored) setRecentSearches(JSON.parse(stored));
  }, []);

  const CommandItemWrapper: React.FC<{ result: string }> = ({ result }) => {
    return (
      <CommandItem onSelect={() => handleOnClickResult(result)}>
        <ArrowRightIcon />
        <span className="truncate">{result}</span>
      </CommandItem>
    );
  };

  return (
    <>
      <Button variant="outline" onClick={() => setOpen(!open)}>
        <SearchIcon />
        <div className="flex items-center gap-1">
          <kbd className="bg-background text-muted-foreground pointer-events-none flex h-5 items-center justify-center gap-1 rounded border px-1 font-sans text-[0.7rem] font-medium select-none [&amp;_svg:not([class*='size-'])]:size-3">
            Ctrl
          </kbd>
          <kbd className="bg-background text-muted-foreground pointer-events-none flex h-5 items-center justify-center gap-1 rounded border px-1 font-sans text-[0.7rem] font-medium select-none [&amp;_svg:not([class*='size-'])]:size-3">
            K
          </kbd>
        </div>
      </Button>
      <CommandDialog
        open={open}
        onOpenChange={(openState) => onCloseModal(openState)}
      >
        <CommandInput
          placeholder="Search your tasks..."
          value={searchVal}
          onValueChange={(val) => handleSearch(val)}
        />
        <CommandList className="min-h-60">
          <CommandEmpty>No results found.</CommandEmpty>
          {searchResults?.length ? (
            // show search results if there are any
            <CommandGroup heading="Tasks">
              {searchResults.map((result: string, idx: number) => (
                <CommandItemWrapper key={idx} result={result} />
              ))}
            </CommandGroup>
          ) : // show recent searches if just opened modal and no search value
          !searchResults?.length && !searchVal && recentSearches?.length ? (
            <CommandGroup heading="Recent Searches">
              {recentSearches?.map((result: string, idx: number) => (
                <CommandItemWrapper key={idx} result={result} />
              ))}
            </CommandGroup>
          ) : (
            !searchVal && (
              // show prompt to start searching if no search results and no recent searches
              <CommandItem className="data-[selected=true]:bg-transparent my-3 border-b-0 cursor-default justify-center">
                <span>What are you looking for today</span>
              </CommandItem>
            )
          )}
          <CommandSeparator />
        </CommandList>
      </CommandDialog>
    </>
  );
};

export default SearchBar;
