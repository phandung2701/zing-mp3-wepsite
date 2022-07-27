import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { collection, getDocs, getFirestore } from 'firebase/firestore';

import { app } from '../../firebase';

interface music {
  id: number;
  name: string;
  url: string;
  singer: string;
  time: any;
  view: string;
  album: string;
  timeUpdate: string;
  play: boolean;
  image: string;
}

interface initialStates {
  musicList: music[];
  song: music;
  loading: boolean;
  error: string;
  play: boolean;
}

const initialState: initialStates = {
  musicList: [],
  song: {
    id: 0,
    name: '',
    url: '',
    singer: '',
    time: '',
    view: '',
    album: '',
    timeUpdate: '',
    play: false,
    image: '',
  },
  loading: false,
  error: '',
  play: false,
};
export const getLishSongs = createAsyncThunk(
  'music/getList',
  async (params, apiThunk) => {
    const arr: any[] = [];
    const db = getFirestore(app);
    const querySnapshot = await getDocs(collection(db, 'song'));
    querySnapshot.forEach((doc) => {
      arr.push(doc.data());
    });
    return arr;
  }
);

const musicSlide = createSlice({
  name: 'music',
  initialState: initialState,
  reducers: {
    getMusic: (state, action) => {
      return { ...state, song: action.payload };
    },
    onPlay: (state, action) => {
      return { ...state, play: action.payload };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getLishSongs.fulfilled, (state, action) => {
      state.musicList = action.payload;
    });
  },
});
export const { getMusic, onPlay } = musicSlide.actions;
const { reducer: musicReducer } = musicSlide;
export default musicReducer;
