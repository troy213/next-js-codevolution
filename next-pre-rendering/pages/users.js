import User from '../components/user'

const Users = ({ users }) => {
  return (
    <>
      {users.map((user) => {
        return (
          <div key={user.id}>
            <User user={user} />
          </div>
        )
      })}
    </>
  )
}

export default Users

export const getStaticProps = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/users')
  const data = await response.json()

  return {
    props: {
      users: data,
    },
  }
}
