import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface NotifikacijeState {
  brojNeprocitanih: number;
}

const initialState: NotifikacijeState = {
  brojNeprocitanih: 0
};

const notifikacijeSlice = createSlice({
  name: 'notifikacije',
  initialState,
  reducers: {
    setBrojNeprocitanih(state, action: PayloadAction<number>) {
      state.brojNeprocitanih = action.payload;
    }
  },
});

export const { setBrojNeprocitanih } = notifikacijeSlice.actions;

export default notifikacijeSlice.reducer;
