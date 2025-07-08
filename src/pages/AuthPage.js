import React, { useState, useEffect } from 'react';
import { signUp, signIn, signOut, getCurrentUser } from '../supabase/auth';

export default function AuthPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const [mode, setMode] = useState('login'); // 'login' or 'signup'

  useEffect(() => {
    getCurrentUser().then(({ data }) => setUser(data?.user || null));
  }, []);

  const handleAuth = async (e) => {
    e.preventDefault();
    setError('');
    if (mode === 'signup') {
      const { error } = await signUp(email, password);
      if (error) setError(error.message);
      else setMode('login');
    } else {
      const { error, data } = await signIn(email, password);
      if (error) setError(error.message);
      else setUser(data.user);
    }
  };

  const handleLogout = async () => {
    await signOut();
    setUser(null);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">{mode === 'signup' ? 'Sign Up' : 'Login'}</h2>
      {user ? (
        <div>
          <p>Welcome, {user.email}!</p>
          <button className="mt-4 px-4 py-2 bg-red-500 text-white rounded" onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <form onSubmit={handleAuth} className="space-y-4">
          <input
            className="w-full border px-3 py-2 rounded"
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <input
            className="w-full border px-3 py-2 rounded"
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          {error && <div className="text-red-500">{error}</div>}
          <button className="w-full px-4 py-2 bg-blue-600 text-white rounded" type="submit">
            {mode === 'signup' ? 'Sign Up' : 'Login'}
          </button>
          <button
            type="button"
            className="w-full mt-2 text-blue-600 underline"
            onClick={() => setMode(mode === 'signup' ? 'login' : 'signup')}
          >
            {mode === 'signup' ? 'Already have an account? Login' : "Don't have an account? Sign Up"}
          </button>
        </form>
      )}
    </div>
  );
} 