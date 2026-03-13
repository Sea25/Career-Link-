import { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Dummy login function for skeleton app
  function login(email, password) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const dummyUser = { email, displayName: email.split('@')[0] };
        setUser(dummyUser);
        resolve(dummyUser);
      }, 500);
    });
  }

  // Dummy signup function for skeleton app
  function signup(email, password, name) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const dummyUser = { email, displayName: name || email.split('@')[0] };
        setUser(dummyUser);
        resolve(dummyUser);
      }, 500);
    });
  }

  function logout() {
    return new Promise((resolve) => {
      setTimeout(() => {
        setUser(null);
        resolve();
      }, 300);
    });
  }

  const value = {
    user,
    login,
    signup,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}