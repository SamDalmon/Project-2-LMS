import { useState, useEffect, useCallback } from 'react';
import { AuthContext } from './AuthContext';
import { authApi } from '../api/authApi';

export function AuthProvider ({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  const logout = useCallback(async () => {
    const response = await authApi.signOut();
    console.log(`Logout: ${response.json}`);

    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  }, [])

  useEffect(() => {
    const controller = new AbortController();
    let active = true;

    async function fetchUser() {
      setLoading(true);

      if(!token){ 
        setToken(null);
        setUser(null);
        setLoading(false);
        
        return;
      }

      try { 
        const data = await authApi.getCurrentUser(controller.signal);
        
        if (active) {
          setUser(data);
        };
      } catch (error) {
        if (active && error.name !== 'CanceledError'){
          console.log(`Getting user info failed due to ${error.name}: ${error}`);
          localStorage.removeItem('token');
          setToken(null);
          setUser(null);
        };
      } finally {
        if (active) {
          setLoading(false);
        };
      };
    };
    fetchUser();

    return () => {
      active = false;
      controller.abort();
    }
  }, [token, logout]);
  
  const login = async ({username, password}) => {
    try {
      const response = await authApi.signIn(username, password);
      const { access, user } = response;

      localStorage.setItem('token', access);

      setToken(access);
      setUser(user);
      return { success: true };
    
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Invalid credentials'
      };
    };
  };

  const teacherSignUp = async (signUpFields) => {
    try {
      const response = await authApi.teacherSignUp(signUpFields);
      const { access, user } = response;

      localStorage.setItem('token', access);

      setToken(access);
      setUser(user);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message
      };
    };
  };

  const studentSignUp = async (signUpFields) => {
    try {
      const response = await authApi.studentSignUp(signUpFields);
      const { access, user } = response;

      localStorage.setItem('token', access);

      setToken(access);
      setUser(user);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message
      };
    };
  };

  return (
    <AuthContext.Provider value={{ user, token, login, teacherSignUp, studentSignUp, logout, isAuthenticated: !!token }}>
      { !loading ? children : <h2>Loading User Info...</h2> }
    </AuthContext.Provider>
  )

};

