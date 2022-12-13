import { comments } from '../../../data/comments'

const handler = (req, res) => {
  if (req.method === 'GET') return res.status(200).json(comments)
  if (req.method === 'POST') {
    const { comment } = req.body
    const newComment = {
      id: Date.now(),
      text: comment,
    }
    comments.push(newComment)
    res.status(201).json(newComment)
  }
}

export default handler
