import { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../firebase';
import { signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 600)); // delay artificial
    await signInWithEmailAndPassword(auth, email, password);
    // loading será setado para false pelo onAuthStateChanged
  };

  const register = async (email, password) => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 600)); // delay artificial
    await createUserWithEmailAndPassword(auth, email, password);
    // loading será setado para false pelo onAuthStateChanged
  };

  const logout = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 600));
    await signOut(auth);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() { 
  return useContext(AuthContext);
}