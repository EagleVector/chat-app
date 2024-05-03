import React from 'react'
import { useUsersStore } from '../zustand/useUsersStore'
import { useChatReceiverStore } from '../zustand/useChatReceiverStore';

const ChatUsers = () => {
  
  const { users } = useUsersStore();
  const { updateChatReceiver } = useChatReceiverStore();

  const setChatReceiver = (user) => {
    updateChatReceiver(user.username);
  }

  return (
    <div>
      {users.map((user, index) => (
        <div 
          className='bg-slate-400 rounded-xl m-3 p-5' 
          key={index}
          onClick={() => setChatReceiver(user)}>
          {user.username}
        </div>
      ))}
    </div>
  )
}
export default ChatUsers;