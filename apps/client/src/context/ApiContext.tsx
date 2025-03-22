import React, { createContext, useContext } from 'react';
import {
  ApiProviderProps,
  ApiServiceInterface,
} from '../interface/ApiServiceInterface';
import { ApiService } from '../services/apiService';

const ApiContext = createContext<ApiServiceInterface | null>(null);

export const ApiProvider: React.FC<ApiProviderProps> = ({ children }) => {
  const apiService = new ApiService();
  return (
    <ApiContext.Provider value={apiService}>{children}</ApiContext.Provider>
  );
};

export const useApi = () => {
  const context = useContext(ApiContext);
  if (!context) {
    throw new Error('useApi must be used within an ApiProvider');
  }
  return context;
};
