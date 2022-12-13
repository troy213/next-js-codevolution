import { comments } from '../../data/comments'

const Comment = ({ comment }) => {
  return (
    <div>
      <h1>
        {comment.id}. {comment.text}
      </h1>
    </div>
  )
}

export default Comment

export const getStaticPaths = async () => {
  return {
    paths: [
      {
        params: { commentId: '1' },
      },
      {
        params: { commentId: '2' },
      },
      {
        params: { commentId: '3' },
      },
    ],
    fallback: false,
  }
}

export const getStaticProps = async (context) => {
  const { params } = context
  const { commentId } = params

  const comment = comments.find((comment) => comment.id === parseInt(commentId))

  return {
    props: {
      comment,
    },
  }
}
