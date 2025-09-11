// [...]
// 2. Lägg till "Svara"-button på varje comment. Den ska öppna CommentForm
// 3. Visa svar nästlade under deras parent-comment
// 4. Se CommentList.tsx

import { FaUser } from "react-icons/fa"
import { useThread } from "../contexts/ThreadContext";
import { useUser } from "../contexts/UserContext";
import { useState } from "react";
import CommentForm from "./CommentForm";

type CommentProps = {
  comment: ForumComment;
  threadCategory: ThreadCategory
  threadId: number
}

function Comment({ comment, threadCategory, threadId }: CommentProps) {

  const { actions, threads, comments } = useThread()
  const [showReplyForm, setShowReplyForm] = useState(false) //false från början
  const replies = comments.filter((c => c.parentCommentId === comment.id))
  const { currentUser } = useUser()
  const [showLoginPopup, setShowLoginPopup] = useState<boolean>(false)

  let isThreadAnswered = actions.isQNAAnswered(threadId)

  function isQNAThread(thread: ThreadCategoryType): thread is QNAThread {
    return thread.category == "QNA";
  }

  const QNAThreads = threads
  .filter((item): item is QNAThread => isQNAThread(item))
  
  const _thread = QNAThreads.find(
    (t) => t.id === threadId
  );

  const handleToggleIsAnswered = () => {
    if (!currentUser) {
      setShowLoginPopup(true)
      return;
    }

    if(_thread && !isThreadAnswered) {

      const updatedThread: QNAThread = { 
        id: _thread.id, 
        title: _thread.title,
        category: "QNA",
        creationDate: _thread.creationDate,
        description: _thread.description,
        creator: _thread.creator,
        commentsLocked: _thread.commentsLocked, 
        isAnswered: true, 
        commentAnswerId: comment.id,
        tags: _thread.tags
      }
      
      const threadIndex = threads.findIndex(
        (t) => t.id === threadId
      );  
      actions.updateQNAThread(threadIndex, updatedThread)
    }
  }

  const closeLoginPopup = () => {
    setShowLoginPopup(false);
  };

  if (!comment.creator) {
    return <p className="text-white">Kommentar saknar skapare</p>
  }

  return (
    // VISA KOMMENTAR
    <div className='p-4 mt-4 rounded-lg mb-4 border border-gray-300 bg-blue-950'>
      <div className='flex gap-2 items-center'>
        <div className='text-gray-200'><FaUser /></div>
        <p className='font-semibold text-gray-200'>{comment.creator.userName}</p>
      </div>
      <p className='text-gray-200 my-3'>{comment.content}</p>
      {/* MARKERA KOMMENTAR SOM SVAR-KNAPP */}
      { threadCategory === "QNA" && 
      <button 
      onClick={handleToggleIsAnswered} 
      disabled={isThreadAnswered} 
      className={`bg-green-900 text-white text-sm rounded p-2 ${isThreadAnswered && _thread?.commentAnswerId == comment.id ? 'bg-green-900' : 'bg-neutral-500'}`}>
        {isThreadAnswered && _thread?.commentAnswerId == comment.id ? 'Svar' : 'Markera som svar'}
        </button>
      }

      {/* SKAPA KOMMENTAR PÅ ANNAN KOMMENTAR-KNAPP */}
      <button
        className="bg-orange-600 text-gray-100 rounded px-3 py-2 text-sm hover:bg-orange-500 mt-2"
        onClick={() => setShowReplyForm(true)}
      >
        Svara
      </button>
        { showReplyForm && (
            <CommentForm 
              thread={threads.find(t => t.id === threadId)!} // Passerar hela thread-objektet till CommentForm
              onClose={() => setShowReplyForm(false)}
              parentCommentId={comment.id}
              />
          )
        }
      <div className="ml-6">
        { replies.map(reply => (
          <Comment
            key={reply.id}
            comment={reply}
            threadCategory={threadCategory}
            threadId={threadId}
          />
        ))}
      </div>

    {/* VISA POPUP OM EJ INLOGGAD */}
      { showLoginPopup && (
          <div onClick={closeLoginPopup} className='fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 flex justify-center items-center'>
            <div className="bg-white text-black p-6 rounded shadow-lg text-center max-w-sm w-full">
              <p className="mb-4 text-lg font-semibold">Du måste vara inloggad för att markera en kommentar som svar.</p>
              <button
                onClick={closeLoginPopup}
                className="mt-2 px-4 py-2 bg-blue-950 text-white rounded hover:bg-blue-700"
              >
                Stäng
              </button>
            </div>
          </div>
        )
      }

    </div>
  )
}
export default Comment