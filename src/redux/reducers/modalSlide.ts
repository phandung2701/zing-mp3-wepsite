import { createSlice } from '@reduxjs/toolkit';

const modalSlide = createSlice({
  name: 'modal',
  initialState: {
    showModal: false,
    showProgressBar: false,
  },
  reducers: {
    onShow: (state) => {
      return { ...state, showModal: true };
    },
    onClose: (state) => {
      return { ...state, showModal: false };
    },
    onShowProgressBar: (state) => {
      return { ...state, showProgressBar: true };
    },
    onCloseProgressBar: (state) => {
      return { ...state, showProgressBar: false };
    },
  },
});

export const { onShow, onClose, onCloseProgressBar, onShowProgressBar } =
  modalSlide.actions;
const { reducer: modalReducer } = modalSlide;
export default modalReducer;
