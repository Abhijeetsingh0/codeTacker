'use client'
// contexts/GlobalStateContext.js
import React, { createContext, useContext, useReducer } from 'react';

const initialState = {
  user: null,
  token: null, // Add token to initial state
};

const GlobalStateContext = createContext(initialState);
const GlobalDispatchContext = createContext(() => null);

const globalReducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'SET_TOKEN':
      return { ...state, token: action.payload }; // Handle token action
    default:
      return state;
  }
};

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(globalReducer, initialState);

  return (
    <GlobalStateContext.Provider value={state}>
      <GlobalDispatchContext.Provider value={dispatch}>
        {children}
      </GlobalDispatchContext.Provider>
    </GlobalStateContext.Provider>
  );
};

export const useGlobalState = () => useContext(GlobalStateContext);
export const useGlobalDispatch = () => useContext(GlobalDispatchContext);
