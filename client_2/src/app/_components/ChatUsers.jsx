import React, { useEffect } from 'react';
import { useAuthStore } from '../zustand/useAuthStore';
import { useUsersStore } from '../zustand/useUsersStore';
import { useChatReceiverStore } from '../zustand/useChatReceiverStore';
import { useChatMsgsStore } from '../zustand/useChatMsgsStore';
import axios from 'axios';

const ChatUsers = () => {
  
  const { authName } = useAuthStore();
  const { users } = useUsersStore();
  const { chatReceiver, updateChatReceiver } = useChatReceiverStore();
  const { chatMsgs, updateChatMsgs } = useChatMsgsStore();

  const setChatReceiver = (user) => {
    updateChatReceiver(user.username);
  }

  useEffect(() => {
    const getMsgs = async () => {
      const res = await axios.get('http://localhost:8000/msgs', 
        {
          params: {
            'sender': authName,
            'receiver': chatReceiver
          }
        }, 
        {
          withCredentials: true
        });
      
      if (res.data.length !== 0) {
        updateChatMsgs(res.data);
      } else {
        updateChatMsgs([]);
      }
    }

    if (chatReceiver) {
      getMsgs();
    }
  }, [chatReceiver])

  return (
    <div>
      {users.map((user, index) => (
        <div 
          className='bg-slate-400 rounded-xl m-3 p-5' 
          key={index}
          onClick={() => setChatReceiver(user)}>
          { user.username }
        </div>
      ))}
    </div>
  )
}
export default ChatUsers;