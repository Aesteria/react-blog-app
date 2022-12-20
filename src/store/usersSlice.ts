import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { collection, doc, getDocs, updateDoc } from 'firebase/firestore';
import RequestStatus from '../constants/requestStatus';
import { db } from '../firebase';
import { UserProfile } from '../types/profile';
import type { RootState } from './store';

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const querySnapshot = await getDocs(collection(db, 'users'));

  const users: UserProfile[] = [];
  querySnapshot.forEach((document) => {
    users.push({
      id: document.id,
      email: document.data().email,
      followers: document.data().followers,
      following: document.data().following,
      photoURL: document.data().photoURL,
      username: document.data().username,
    });
  });

  return users;
});

// type UpdateUserById = {
//   userId: string;
//   newData: {
//     username?: string;
//     photoURL?: string;
//   };
// };

// export const updateUserById = createAsyncThunk(
//   'users/updateUserById',
//   async (data: UpdateUserById) => {
//     const docRef = doc(db, 'users', data.userId);
//     if (data.newData.username && !data.newData.photoURL) {
//       await updateDoc(docRef, {
//         username: data.newData.username,
//       });
//     }

//     if (!data.newData.username && data.newData.photoURL) {
//       await updateDoc(docRef, {
//         photoURL: data.newData.photoURL,
//       });
//     }

//     return data;
//   }
// );

type InitialState = {
  users: UserProfile[];
  status: RequestStatus;
  error?: string;
};

const initialState: InitialState = {
  users: [],
  status: RequestStatus.Idle,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = RequestStatus.Resolved;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = RequestStatus.Rejected;
        state.error = action.error.message;
      })
      .addCase(fetchUsers.pending, (state) => {
        state.status = RequestStatus.Pending;
      });
    // .addCase(updateUserById.fulfilled, (state, action) => {
    //   const existingUserIndex = state.users.findIndex(
    //     (user) => user.id === action.payload.userId
    //   );
    //   const existingUser = state.users[existingUserIndex];

    //   if (action.payload.newData.photoURL) {
    //     state.users[existingUserIndex] = {
    //       ...existingUser,
    //       photoURL: action.payload.newData.photoURL,
    //     };
    //   }

    //   if (action.payload.newData.username) {
    //     state.users[existingUserIndex] = {
    //       ...existingUser,
    //       username: action.payload.newData.username,
    //     };
    //   }
    // });
  },
});

export const selectUsers = (state: RootState) => state.users.users;

export default usersSlice.reducer;
