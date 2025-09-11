// 4. Visa bara 

import { useThread } from "../contexts/ThreadContext";
import Tag from "./Tag";

export default function TagList() {
  const { tags } = useThread();

  return (
    <div>
        <h2>Taggar</h2>
        <div className="container mx-auto px-4 lg:max-w-6xl mt-6">
              <div className="space-y-4">
                {
                  tags.map((t) => (
                    <Tag
                    key={t.tagId}
                    singleTag={t.tagName} 
                    tagTypeName={t.tagName}
                    // onClick={() => setShowTags(t.)}
                    />
                  ))
                }
              </div >
        </div>
    </div>
  )
}