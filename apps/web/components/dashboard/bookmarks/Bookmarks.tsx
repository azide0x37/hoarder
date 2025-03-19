import CommandPalette from "@/components/ui/command-palette";
import { Separator } from "@/components/ui/separator";
import { api } from "@/server/api/client";
import { getServerAuthSession } from "@/server/auth";
import { redirect } from "next/navigation";
import { useState } from "react";
import { HotKeys } from "react-hotkeys";

import type { ZGetBookmarksRequest } from "@hoarder/shared/types/bookmarks";
import UpdatableBookmarksGrid from "./UpdatableBookmarksGrid";

export default async function Bookmarks({
  query,
  header,
  showDivider,
  showEditorCard = false,
}: {
  query: Omit<ZGetBookmarksRequest, "sortOrder">; // Sort order is handled by the store
  header?: React.ReactNode;
  showDivider?: boolean;
  showEditorCard?: boolean;
}) {
  const session = await getServerAuthSession();
  if (!session) {
    redirect("/");
  }

  const bookmarks = await api.bookmarks.getBookmarks(query);

  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  const keyMap = {
    OPEN_COMMAND_PALETTE: "cmd+k",
  };

  const handlers = {
    OPEN_COMMAND_PALETTE: () => setIsCommandPaletteOpen(true),
  };

  return (
    <HotKeys keyMap={keyMap} handlers={handlers}>
      <div className="flex flex-col gap-3">
        <CommandPalette
          isOpen={isCommandPaletteOpen}
          onClose={() => setIsCommandPaletteOpen(false)}
        />
        {header}
        {showDivider && <Separator />}
        <UpdatableBookmarksGrid
          query={query}
          bookmarks={bookmarks}
          showEditorCard={showEditorCard}
        />
      </div>
    </HotKeys>
  );
}