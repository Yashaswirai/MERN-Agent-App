import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import agentReducer from './agentSlice';
import contactReducer from './contactSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    agents: agentReducer,
    contacts: contactReducer,
  },
});

export default store;
