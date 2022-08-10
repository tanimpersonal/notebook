import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const url = "http://localhost:5000/notes";
export const fetchNotes = createAsyncThunk("notes/fetchNotes", async () => {
  const data = await axios.get(url);

  return data.data;
});
const notesSlice = createSlice({
  name: "notes",
  initialState: {
    isLoading: false,
    notes: [],
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchNotes.pending, (state, action) => {
      state.isLoading = true;
      state.notes = [];
      state.error = null;
    });
    builder.addCase(fetchNotes.fulfilled, (state, action) => {
      state.isLoading = false;
      state.notes = action.payload;
      state.error = null;
    });
    builder.addCase(fetchNotes.rejected, (state, action) => {
      state.isLoading = false;
      state.notes = [];
      state.error = action.error.message;
    });
  },
});
export default notesSlice.reducer;
