import { createSlice } from '@reduxjs/toolkit';
import { IUI } from '../models/ui';

const initialUi: IUI = {
  isShownAddTaskModal: false,
  isShownStatusModal: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState: initialUi,
  reducers: {
    toggleAddTaskModal(state) {
      state.isShownAddTaskModal = !state.isShownAddTaskModal;
    },
    toggleStatusModal(state) {
      state.isShownStatusModal = !state.isShownStatusModal;
    },
  },
});

export const uiActions = uiSlice.actions;
export default uiSlice.reducer;
