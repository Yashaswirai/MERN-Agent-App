import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../utils/api';

// Get all agents
export const getAgents = createAsyncThunk(
  'agents/getAgents',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get('/agents');
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

// Create agent
export const createAgent = createAsyncThunk(
  'agents/createAgent',
  async (agentData, { rejectWithValue }) => {
    try {
      const { data } = await api.post('/agents', agentData);
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

// Update agent
export const updateAgent = createAsyncThunk(
  'agents/updateAgent',
  async ({ id, agentData }, { rejectWithValue }) => {
    try {
      const { data } = await api.put(`/agents/${id}`, agentData);
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

// Get agent by ID
export const getAgentById = createAsyncThunk(
  'agents/getAgentById',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/agents/${id}`);
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

// Delete agent
export const deleteAgent = createAsyncThunk(
  'agents/deleteAgent',
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/agents/${id}`);
      return id;
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
  agents: [],
  loading: false,
  error: null,
  success: false,
};

const agentSlice = createSlice({
  name: 'agents',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSuccess: (state) => {
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAgents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAgents.fulfilled, (state, action) => {
        state.loading = false;
        state.agents = action.payload;
      })
      .addCase(getAgents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getAgentById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAgentById.fulfilled, (state, action) => {
        state.loading = false;
        // Check if the agent already exists in the state
        const existingIndex = state.agents.findIndex(
          (agent) => agent._id === action.payload._id
        );
        if (existingIndex >= 0) {
          // Update existing agent
          state.agents[existingIndex] = action.payload;
        } else {
          // Add new agent to the state
          state.agents.push(action.payload);
        }
      })
      .addCase(getAgentById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createAgent.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createAgent.fulfilled, (state, action) => {
        state.loading = false;
        state.agents.push(action.payload);
        state.success = true;
      })
      .addCase(createAgent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateAgent.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateAgent.fulfilled, (state, action) => {
        state.loading = false;
        state.agents = state.agents.map((agent) =>
          agent._id === action.payload._id ? action.payload : agent
        );
        state.success = true;
      })
      .addCase(updateAgent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteAgent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAgent.fulfilled, (state, action) => {
        state.loading = false;
        state.agents = state.agents.filter((agent) => agent._id !== action.payload);
        state.success = true;
      })
      .addCase(deleteAgent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, clearSuccess } = agentSlice.actions;

export default agentSlice.reducer;
