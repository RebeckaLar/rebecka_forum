//lets user select/deselect tags. Notifies parent (ThreadList) of selection
import { useState } from "react";
import { useThread } from "../contexts/ThreadContext";
import Tag from "./Tag";

type TagFilterProps = {
  onFilterChange: (selectedTags: ThreadTag[]) => void;
};

export default function TagFilter({ onFilterChange }: TagFilterProps) {
  const { tags } = useThread();
  const [selectedTags, setSelectedTags] = useState<ThreadTag[]>([]);

  const toggleTag = (tag: ThreadTag) => {
    const isSelected = selectedTags.some(t => t.id === tag.id);
    const newSelected = isSelected
      ? selectedTags.filter(t => t.id !== tag.id)
      : [...selectedTags, tag];

    setSelectedTags(newSelected);
    onFilterChange(newSelected); // notify parent
  };

  return (
    <div className="flex flex-wrap gap-2 my-4">
      {tags.map((tag) => {
        const isSelected = selectedTags.some(t => t.id === tag.id);
        return (
          <Tag
            key={tag.id}
            tag={tag}
            selected={isSelected}
            onToggle={toggleTag}
          />
        );
      })}
      {selectedTags.length > 0 && (
        <button
            onClick={() => {
            setSelectedTags([]);
            onFilterChange([]);
            }}
            className="ml-4 text-sm text-blue-500 underline"
        >Rensa filter
        </button>
)}

    </div>
  );
}
