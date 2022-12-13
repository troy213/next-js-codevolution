import { comments } from '../../../data/comments'

const handler = (req, res) => {
  const { commentId } = req.query

  if (req.method === 'GET') {
    const comment = comments.find(
      (comment) => comment.id === parseInt(commentId)
    )
    res.status(200).json(comment)
  }

  if (req.method === 'DELETE') {
    const deletedComment = comments.find(
      (comment) => comment.id === parseInt(commentId)
    )
    const index = comments.findIndex(
      (comment) => comment.id === parseInt(commentId)
    )

    comments.splice(index, 1)
    res.status(200).json(deletedComment)
  }

  if (req.method === 'PUT') {
    const { newComment } = req.body
    const index = comments.findIndex(
      (comment) => comment.id === parseInt(commentId)
    )
    comments[index].text = newComment
    res.status(200).json(newComment)
  }
}

export default handler
