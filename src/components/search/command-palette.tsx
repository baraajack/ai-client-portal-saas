"use client";

import { useEffect, useState } from "react";
import { Command } from "cmdk";

export function CommandPalette() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((value) => !value);
      }
    }

    function onOpen() {
      setOpen(true);
    }

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("open-command-palette", onOpen);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("open-command-palette", onOpen);
    };
  }, []);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm">
      <div className="mx-auto mt-24 w-full max-w-xl rounded-lg border bg-popover p-4 shadow-2xl">
        <Command>
          <Command.Input
            autoFocus
            placeholder="Search clients, projects, tasks, files..."
            className="w-full border-b bg-transparent px-2 py-3 outline-none"
          />

          <Command.List className="mt-3 max-h-80 overflow-y-auto">
            <Command.Empty className="p-4 text-sm text-muted-foreground">
              No results found.
            </Command.Empty>

            <Command.Group heading="Navigation">
              <Command.Item className="cursor-pointer rounded-md px-2 py-2 text-sm">
                Dashboard
              </Command.Item>
              <Command.Item className="cursor-pointer rounded-md px-2 py-2 text-sm">
                Clients
              </Command.Item>
              <Command.Item className="cursor-pointer rounded-md px-2 py-2 text-sm">
                Projects
              </Command.Item>
              <Command.Item className="cursor-pointer rounded-md px-2 py-2 text-sm">
                Tasks
              </Command.Item>
              <Command.Item className="cursor-pointer rounded-md px-2 py-2 text-sm">
                Files
              </Command.Item>
            </Command.Group>
          </Command.List>
        </Command>
      </div>
    </div>
  );
}
