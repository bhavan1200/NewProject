import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../Slices/counterSlice';
import postReducer from "../Slices/Post/postSlice"

 const Store = configureStore({
  reducer: {
    counter: counterReducer,
    posts : postReducer
  }
});

export default Store;