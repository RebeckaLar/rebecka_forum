
//ha filtered tag state
//Skicka onFilterChange till TagFilter
//visa filtrerade trådar

import { useState } from "react";
import { useThread } from "../contexts/ThreadContext";
import TagFilter from "./TagFilter";
import ThreadPreview from "./ThreadPreview";

type Props = {
  onThreadClick: (thread: Thread | QNAThread) => void;
};

export default function FilteredThreadList({ onThreadClick }: Props) {
  const { threads } = useThread();
  const [activeTags, setActiveTags] = useState<ThreadTag[]>([]);

  const handleFilterChange = (selectedTags: ThreadTag[]) => {
    setActiveTags(selectedTags);
  };

  const isThreadMatchingTags = (thread: Thread): boolean => {
    if (activeTags.length === 0) return true;
    return thread.tags.some(tag =>
      activeTags.some(active => active.id === tag.id)
    );
  };

  const filteredThreads = threads.filter(isThreadMatchingTags);

  return (
    <div className="space-y-4">
      <TagFilter onFilterChange={handleFilterChange} />

      {filteredThreads.length > 0 ? (
        filteredThreads.map((thread) => (
          <ThreadPreview
            key={thread.id}
            thread={thread}
            onClick={() => onThreadClick(thread)}
          />
        ))
      ) : (
        <p className="text-gray-500">Inga trådar matchar de valda taggarna.</p>
      )}
    </div>
  );
}
