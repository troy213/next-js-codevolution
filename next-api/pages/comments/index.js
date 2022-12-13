import { useState } from 'react'

const CommentsPage = () => {
  const [comments, setComments] = useState([])
  const [comment, setComment] = useState('')
  const [updateComment, setUpdateComment] = useState('')

  const fetchComments = async () => {
    const response = await fetch('/api/comments')
    const data = await response.json()

    setComments(data)
  }

  const submitComment = async () => {
    const response = await fetch('/api/comments', {
      method: 'POST',
      body: JSON.stringify({ comment }),
      headers: { 'Content-Type': 'application/json' },
    })
    const data = await response.json()
    console.log(data)
    fetchComments()
  }

  const deleteComment = async (id) => {
    const response = await fetch(`/api/comments/${id}`, {
      method: 'DELETE',
    })
    const data = await response.json()
    console.log(data)
    fetchComments()
  }

  const putComment = async (id) => {
    const response = await fetch(`/api/comments/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ newComment: updateComment }),
      headers: { 'Content-Type': 'application/json' },
    })
    const data = await response.json()
    console.log(data)
    fetchComments()
  }

  return (
    <>
      <label htmlFor='comment'>Comment</label>
      <input
        id='comment'
        type='text'
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <label htmlFor='update-comment'>Update Comment</label>
      <input
        id='update-comment'
        type='text'
        value={updateComment}
        onChange={(e) => setUpdateComment(e.target.value)}
      />
      <button onClick={submitComment}>Submit Comment</button>
      <button onClick={fetchComments}>Load comments</button>
      {comments.map((comment) => {
        return (
          <div key={comment.id}>
            {comment.id} {comment.text}
            <button onClick={() => putComment(comment.id)}>Update</button>
            <button onClick={() => deleteComment(comment.id)}>Delete</button>
          </div>
        )
      })}
    </>
  )
}

export default CommentsPage
