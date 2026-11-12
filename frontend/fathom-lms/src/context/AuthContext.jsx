import { useState } from 'react';
import { AuthContext } from './AuthContext'
import { authApi } from '../api/authApi';

export function AuthProvider ({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  
  const login = async ({username, password}) => {
    try {
      const response = await authApi.signIn(username, password)

      const { accessToken, userData } = response.data;

      localStorage.setItem('token', accessToken);

      setToken(accessToken);
      setUser(userData);
      return { success: true };
    
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Invalid credentials'
      }
    };
  };

  const logout = async () => {
    const response = await authApi.signOut();
    console.log(response.json)

    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  )

};

