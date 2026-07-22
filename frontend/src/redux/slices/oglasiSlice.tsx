import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SaveAdRequest } from '../../features/pet-ads/types/request-types';

interface FormState {
  categoryId?: number;
  speciesId?: number;
  adRequest: Partial<SaveAdRequest>;
  images: string[] | null;
}

const initialState: FormState = {
  categoryId: undefined,
  speciesId: undefined,
  adRequest: {},
  images: []
};

const formSlice = createSlice({
  name: 'oglasi',
  initialState,
  reducers: {
    resetForm: () => initialState,
    setKategorija: (state, action: PayloadAction<number>) => {
      state.categoryId = action.payload;
    },
    setKategorijaInForm: (state, action: PayloadAction<number>) => {
      state.adRequest.categoryId = action.payload;
    },
    setVrsta: (state, action: PayloadAction<number>) => {
      state.speciesId = action.payload;
    },
    setVrstaInForm: (state, action: PayloadAction<number>) => {
      state.adRequest.speciesId = action.payload;
    },
    setNoviOglasForma: (state, action: PayloadAction<Partial<SaveAdRequest>>) => {
      state.adRequest = {
        ...state.adRequest,
        ...action.payload
      };
    },
    setKorisnik: (state, action: PayloadAction<number>) => {
      state.adRequest.userId = action.payload;
    },
  },
});

export const { setKategorija, setNoviOglasForma, resetForm, setKorisnik, setKategorijaInForm, setVrsta, setVrstaInForm } = formSlice.actions;

export default formSlice.reducer;
