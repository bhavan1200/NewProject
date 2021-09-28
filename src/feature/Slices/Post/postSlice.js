import { createSlice, nanoid, createAsyncThunk } from '@reduxjs/toolkit'
import { Auth } from 'aws-amplify';

const initialState = [
  { id: '1', title: 'First Post!', content: 'Hello!' },
  { id: '2', title: 'Second Post', content: 'More text' }
];

export const fetchUser = createAsyncThunk('post/fetchPost', async() => {
    const response = await Auth.currentAuthenticatedUser();
    return response;
})

const postSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
      postAdded(state, action) {
          state.push(action.payload)
      }
    }
});
export const { postAdded } = postSlice.actions
export default postSlice.reducer;