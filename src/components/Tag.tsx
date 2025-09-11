type TagProps = {
    singleTag: ThreadTag;
    tagTypeName: TagCategory;

};

export default function ThreadPreview({ singleTag, tagTypeName }: TagProps) {

  console.log(singleTag)
    return (
        <>
            <div className="flex items-center gap-10">
                <div className="justify-between mt-2 inline-flex items-center rounded-md bg-purple-400/10 px-2 py-1 text-xs font-medium text-purple-400 inset-ring inset-ring-purple-400/30">
                    <p className="text-xl">{tagTypeName}</p>
                </div>

            </div>
        </>
    )
  }