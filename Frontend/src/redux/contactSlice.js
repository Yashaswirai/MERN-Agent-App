import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../utils/api';

// Upload contacts
export const uploadContacts = createAsyncThunk(
  'contacts/uploadContacts',
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await api.post('/contacts/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  }
);

// Get contacts by batch
export const getContactsByBatch = createAsyncThunk(
  'contacts/getContactsByBatch',
  async (batchId, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/contacts/batch/${batchId}`);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  }
);

// Get agent contacts
export const getAgentContacts = createAsyncThunk(
  'contacts/getAgentContacts',
  async (agentId, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/contacts/agent/${agentId}`);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  }
);

const initialState = {
  contacts: [],
  batchId: null,
  loading: false,
  error: null,
  success: false,
};

const contactSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSuccess: (state) => {
      state.success = false;
    },
    clearContacts: (state) => {
      state.contacts = [];
      state.batchId = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadContacts.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(uploadContacts.fulfilled, (state, action) => {
        state.loading = false;
        state.batchId = action.payload.batchId;
        state.success = true;
      })
      .addCase(uploadContacts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getContactsByBatch.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getContactsByBatch.fulfilled, (state, action) => {
        state.loading = false;
        state.contacts = action.payload;
      })
      .addCase(getContactsByBatch.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getAgentContacts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAgentContacts.fulfilled, (state, action) => {
        state.loading = false;
        state.contacts = action.payload;
      })
      .addCase(getAgentContacts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, clearSuccess, clearContacts } = contactSlice.actions;

export default contactSlice.reducer;
