// 4. Visa bara 

import { useState } from "react";
import { useThread } from "../contexts/ThreadContext";
import Tag from "./Tag";

export default function TagList() {
  const { tags } = useThread();
    const [selectedTag, setSelectedTag] = useState<TagCategory | null>(null)


  return (
    <div className="">
        {/* <div className="gap-3 space-y-4 inline-flex items-center">
          {
            tags.map((t) => (
              <Tag
              key={t.id}
              tag={t}
              // singleTag={t.id} 
              tagTypeName={t.tagName}
              onChange={() => setSelectedTag(t.tagName)}
          selected={isSelected}
          onToggle={toggleTag}
              />
            ))
          }
        </div > */}
        
    </div>
  )
}