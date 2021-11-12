import { configureStore } from '@reduxjs/toolkit'
import messageReducer from '../Features/message/messageSlice'
import counterReducer from '../Features/counter/counterSlice'
import postReducer from '../Features/posts/postSlice';
import chatsReducer from "../Features/chats/chatsSlice";
import chatRoomsReducer from "../Features/chatRooms/chatRoomsSlice";
import usersReducer from '../Features/users/usersSlice';

export default configureStore({
  reducer: {
    chatRooms: chatRoomsReducer,
    chats: chatsReducer,
    users: usersReducer,
  }
});