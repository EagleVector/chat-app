import React from 'react'
import { useUsersStore } from '../zustand/useUsersStore'

const ChatUsers = () => {
  const { users } = useUsersStore();
  return (
    <div>
      {users.map((user, index) => (
        <div className='bg-slate-400 rounded-xl m-3 p-5' key={index}>
          {user.username}
        </div>
      ))}
    </div>
  )
}
export default ChatUsers;