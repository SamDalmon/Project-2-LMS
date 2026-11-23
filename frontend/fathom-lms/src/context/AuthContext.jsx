import { useState, useEffect, useCallback } from 'react';
import { AuthContext } from './AuthContext';
import { authApi } from '../api/authApi';
import { isRequestCanceled } from '../api/apiClient';

export function AuthProvider ({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const logout = useCallback(async () => {
    const response = await authApi.signOut();
    console.log(`Logout: ${response.json}`);

    setUser(null);
  }, [])

  useEffect(() => {
    const controller = new AbortController();
    let active = true;

    async function fetchUser() {
      setLoading(true);

      try { 
        const data = await authApi.getCurrentUser(controller.signal);
        
        if (active) {
          setUser(data);
        };
      } catch (error) {
        if (active) {
          setUser(null);
          if (!isRequestCanceled(error) && error.response?.status !== 401) {
            console.error('Getting user info failed:', error);
          }
        }
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
  }, [logout]);
  
  const login = async ({username, password}) => {
    
    const response = await authApi.signIn(username, password);
    if (response.user){
      const { user } = response;
      setUser(user);
      return { success: true };
    } else {
      console.log(JSON.stringify(response))
      const error = response['non_field_errors'] ?? response['account_rejected'] ?? JSON.stringify(response)
      return {
        success: false,
        error: error || 'Unexpected Error'
      };
    }
  };

  const teacherSignUp = async (signUpFields) => {
    try {
      const response = await authApi.teacherSignUp(signUpFields);
      const { user } = response;

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
      const { user } = response;

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
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, teacherSignUp, studentSignUp, logout }}>
      { !loading ? children : <h2>Loading User Info...</h2> }
    </AuthContext.Provider>
  )

};

