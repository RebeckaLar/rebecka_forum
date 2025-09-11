// Track selected tags in form state.
// Add/remove tags when user toggles them.
// Submit as an array of ThreadTag objects.

import { useForm, type SubmitHandler } from 'react-hook-form'
import { useThread } from '../contexts/ThreadContext';
import { useUser } from '../contexts/UserContext';
import Tag from "./Tag";
import { useState } from 'react';

type ThreadFormProps = {
    onClose?: () => void;
}

// type ThreadFormData = Omit<Thread, 'id' | 'creator' | 'creationDate'>
type ThreadFormData = Omit<Thread, 'id' | 'creator' | 'creationDate'>


export default function ThreadForm({ onClose }: ThreadFormProps) {
    const { threads, tags, actions } = useThread();
    const { currentUser } = useUser();
    const [selectedTag, setSelectedTag] = useState<ThreadTag>();

    const creationDate = new Date().toLocaleDateString("sv-SE");

    // const {
    //     register,
    //     setValue,
    //     handleSubmit,
    //     formState: { errors },
    // } = useForm<ThreadFormData>()

    const {
  register,
  setValue,
  getValues,
  handleSubmit,
  formState: { errors },
  watch
} = useForm<ThreadFormData>({
  defaultValues: {
    tags: [], // ✅ Empty array by default
  }
});

const toggleTag = (tag: ThreadTag) => {
  const currentTags = getValues("tags") || [];
  const tagExists = currentTags.some(t => t.id === tag.id);

  const newTags = tagExists
    ? currentTags.filter(t => t.id !== tag.id)
    : [...currentTags, tag];

  setValue("tags", newTags, { shouldValidate: true });
};

    const onSubmit: SubmitHandler<ThreadFormData> = (data) => {
        console.log("hej")
        console.log(data.tags)

        if (!currentUser) {
            return
        }

        if (currentUser) {
            if(data.category == "QNA") {
                const newQNAThread: QNAThread = {
                    id: threads.length > 0 ? Math.max(...threads.map(t => t.id)) + 1 : 1,
                    title: data.title,
                    category: data.category,
                    description: data.description,
                    creationDate: creationDate,
                    creator: {  id: currentUser.id, userName: currentUser.userName, password: currentUser.password},
                    tags: data.tags,
                    commentsLocked: data.commentsLocked,
                    isAnswered: false,
                    commentAnswerId: 0,
                }
                actions.createThread(newQNAThread);
                onClose?.();
            } else {
                const newThread: Thread = {
                    id: threads.length > 0 ? Math.max(...threads.map(t => t.id)) + 1 : 1,
                    title: data.title,
                    category: data.category,
                    description: data.description,
                    creationDate: creationDate,
                    creator: { id: currentUser.id, userName: currentUser.userName, password: currentUser.password },
                    tags: data.tags,
                    commentsLocked: data.commentsLocked,
                }
                actions.createThread(newThread);
                onClose?.();
            }
        }

        return
    }

    return (
        <div className="w-full max-w-2xl mx-auto">
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4">
                    <label className="block mb-2" >Titel: </label>
                    <input className='border' {...register("title", { required: true })} />
                    {errors.title && errors.title.type === "required" && <p className="text-red-600 text-sm italic mt-1">Vänligen ange en titel</p>}
                </div>

                <div className="mb-4">
                    <label className="block mb-2" >Kategori: </label>
                    <div className=''>
                        <select
                            className='border'
                            required
                            {...register("category", { validate: (value) => value !== 'NoCategory' })}
                            onChange={e => setValue("category", e.target.value as ThreadCategory, { shouldValidate: true })}
                        >
                            <option value="NoCategory">Välj:</option>
                            <option value="QNA">QNA</option>
                            <option value="Diskussion">Diskussion</option>
                            <option value="Meddelande">Meddelande</option>
                            <option value="Hitta gruppmedlem">Hitta gruppmedlem</option>
                        </select>
                        {errors.category && errors.category.type === "validate" && <p className="text-red-600 text-sm italic mb-5 mt-1">Vänligen välj en kategori till tråden</p>}
                    </div>
                </div>

                <div>
  <label className="block mb-2">Taggar: </label>
  <div className="flex flex-wrap gap-2">
    {tags.map((tag) => {
      const selectedTags = watch("tags") || [];
      const isSelected = selectedTags.some((t) => t.id === tag.id);

      return (
        <Tag
          key={tag.id}
          tag={tag}
          selected={isSelected}
          onToggle={toggleTag}
        />
      );
    })}
  </div>
  {errors.tags && <p className="text-red-600 text-sm italic">Vänligen välj minst en tagg</p>}
</div>


                <div>
                    <label>Beskrivning: </label>
                    <textarea className='border w-full p-2 rounded' id='description' {...register("description", { required: true })} />
                    {errors.description && errors.description.type === "required" && <p className="text-red-600 text-sm italic">Vänligen ange en beskrivning till tråden</p>}
                </div>

                <div className='mb-3'>
                    <label className="inline-flex items-center">
                        <input type="checkbox" className="form-checkbox" {...register("commentsLocked")} />
                        <span className="ml-2">Låsa kommentarer?</span>
                    </label>
                </div>
                <button
                    type='submit'
                    className='bg-green-800 text-white p-3 rounded mt-5'
                >
                    Publicera
                </button>
            </form >
        </div >
    )
}