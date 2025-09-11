import { useState } from "react";

// type TagProps = {
//     tagTypeName: ThreadTag['tagName']
//     onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
// };

type TagProps = {
  tag: ThreadTag;
  selected: boolean;
  onToggle: (tag: ThreadTag) => void;
};

const Tag: React.FC<TagProps> = ({ tag, selected, onToggle }) => {
  const handleChange = () => {
    onToggle(tag);
  };

  return (
    <label
      className={`cursor-pointer m-1 rounded-md px-2 py-1 text-xs font-medium inset-ring transition
        ${selected ? "bg-purple-500 text-white" : "bg-purple-400/10 text-purple-400 hover:bg-sky-700"}`}
        >
      {tag.tagName}
      <input
        type="checkbox"
        checked={selected}
        onChange={handleChange}
        className="hidden"
      />
    </label>
  )
};

export default Tag;