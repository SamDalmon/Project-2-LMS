import { useState, useEffect, useCallback, useRef } from 'react';
import { AuthContext } from './AuthContext';
import { authApi } from '../api/authApi';
import { isRequestCanceled } from '../api/apiClient';

export function AuthProvider ({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleAuthResponse = (response) => {
    if (response.user){
      const { user } = response;
      setUser(user);
      return { success: true };
    } else {
      console.log(JSON.stringify(response));
      const error = response;
      return {
        success: false,
        error: error || 'Unexpected Error'
      };
    };
  }

  const login = useCallback(async ({username, password}) => {
    const response = await authApi.signIn(username, password);
    return handleAuthResponse(response);
  }, []);

  const logout = useCallback(async () => {
    const response = await authApi.signOut();
    console.log(`Logout: ${response.json}`);

    setUser(null);
  }, [])

  const requestCurrentUser = useCallback(
    (signal) => authApi.getCurrentUser(signal),
  []);

  const latestRequest = useRef(0);

  const fetchUser = useCallback(async (signal) => {
    const requestId = ++latestRequest.current;

    try { 
      const data = await requestCurrentUser(signal);
      
      if (requestId === latestRequest.current) {
        setUser(data);
      };

      return data;
    } catch (error) {
      if (requestId === latestRequest.current && !isRequestCanceled(error)) {
        if (error?.response?.status === 401) {
          setUser(null);
        }
        else {
          console.error('Getting user info failed:', error);
        }
      }
      
      return null;
    }
  }, [requestCurrentUser]);

  useEffect(() => {
  const controller = new AbortController();
  let active = true;
  const requestId = ++latestRequest.current;

  requestCurrentUser(controller.signal)
    .then((data) => {
      if (active && requestId === latestRequest.current) {
        setUser(data);
      }
    })
    .catch((error) => {
      if (!active || requestId !== latestRequest.current || isRequestCanceled(error)) {
        return;
      }

      if (error?.response?.status === 401) {
        setUser(null);
      } else {
        console.error('Getting user info failed:', error);
      }
    })
    .finally(() => {
      if (active) {
        setLoading(false);
      }
    });

  return () => {
    active = false;
    controller.abort();
  };
}, [requestCurrentUser]);

  const teacherSignUp = async (signUpFields) => {
    const response = await authApi.teacherSignUp(signUpFields);
    return handleAuthResponse(response);
  };

  const studentSignUp = async (signUpFields) => {
    const response = await authApi.studentSignUp(signUpFields);
    return handleAuthResponse(response);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, teacherSignUp, studentSignUp, fetchCurrentUser: fetchUser, logout }}>
      { !loading ? children : <h2>Loading User Info...</h2> }
    </AuthContext.Provider>
  )

};

