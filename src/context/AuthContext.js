import React, { createContext, useContext, useState, useEffect } from 'react';
import { signUp, signIn, signOut, getCurrentUser } from '../supabase/auth';
import { supabase } from '../supabaseClient';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    getCurrentUser().then(({ data }) => setUser(data?.user || null));
  }, []);

  const register = async (email, password) => {
    setLoading(true); setError(null);
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (!error && data.user) {
      // Insert a new profile row for the user
      await supabase.from('profiles').insert([
        { id: data.user.id, email: data.user.email }
      ]);
    }
    setLoading(false);
    if (error) setError(error.message);
    return !error;
  };

  const login = async (email, password) => {
    setLoading(true); setError(null);
    const { error, data } = await signIn(email, password);
    setLoading(false);
    if (error) setError(error.message);
    else setUser(data.user);
    return !error;
  };

  const logout = async () => {
    await signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
