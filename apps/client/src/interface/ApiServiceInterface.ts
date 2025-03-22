import { ReactNode } from 'react';

export interface ApiProviderProps {
  children: ReactNode;
}

export interface ApiServiceInterface {
  login(username: string, password: string): Promise<{ access_token: string }>;
  getUserData<T>(): Promise<T>;
  logout(): Promise<void>;
  signup(
    name: string,
    username: string,
    email: string,
    password: string
  ): Promise<void>;
}
