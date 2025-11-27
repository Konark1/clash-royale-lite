import React, { useState } from 'react';
import { Mail, Lock, XCircle } from 'lucide-react';
import { signInWithEmail, signUpWithEmail } from '../config/firebase';

export const AuthModal = ({ isOpen, onClose, onSuccess }) => {
  const [mode, setMode] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const toggleMode = () => {
    setMode((prev) => (prev === 'login' ? 'signup' : 'login'));
    setError('');
    setPassword('');
    setConfirmPassword('');
  };

  const validate = () => {
    if (!email.trim()) return 'Email is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Enter a valid email';
    if (password.length < 6) return 'Password must be at least 6 characters';
    if (mode === 'signup' && password !== confirmPassword) return 'Passwords do not match';
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    setError('');
    try {
      if (mode === 'login') {
        await signInWithEmail(email, password);
      } else {
        await signUpWithEmail(email, password);
      }
      onSuccess?.();
      onClose?.();
    } catch (err) {
      setError(err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
      <div className="w-full max-w-md bg-gradient-to-b from-slate-900 to-slate-950 rounded-3xl border border-slate-700 shadow-2xl p-6 relative text-white">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
          aria-label="Close authentication modal"
        >
          <XCircle size={24} />
        </button>

        <div className="text-center mb-6">
          <p className="text-sm uppercase tracking-[0.2em] text-slate-400">{mode === 'login' ? 'Welcome Back' : 'Create Account'}</p>
          <h2 className="text-3xl font-black gradient-text">{mode === 'login' ? 'Log In' : 'Sign Up'}</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block text-xs font-semibold uppercase tracking-widest text-slate-400">
            Email
            <div className="mt-1 flex items-center gap-2 bg-slate-800/80 border border-slate-700 rounded-2xl px-4 py-3 focus-within:border-blue-500 transition-all">
              <Mail size={18} />
              <input
                type="email"
                className="flex-1 bg-transparent outline-none text-white placeholder:text-slate-500 text-sm"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
            </div>
          </label>

          <label className="block text-xs font-semibold uppercase tracking-widest text-slate-400">
            Password
            <div className="mt-1 flex items-center gap-2 bg-slate-800/80 border border-slate-700 rounded-2xl px-4 py-3 focus-within:border-blue-500 transition-all">
              <Lock size={18} />
              <input
                type="password"
                className="flex-1 bg-transparent outline-none text-white placeholder:text-slate-500 text-sm"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
              />
            </div>
          </label>

          {mode === 'signup' && (
            <label className="block text-xs font-semibold uppercase tracking-widest text-slate-400">
              Confirm Password
              <div className="mt-1 flex items-center gap-2 bg-slate-800/80 border border-slate-700 rounded-2xl px-4 py-3 focus-within:border-blue-500 transition-all">
                <Lock size={18} />
                <input
                  type="password"
                  className="flex-1 bg-transparent outline-none text-white placeholder:text-slate-500 text-sm"
                  placeholder="Match password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  autoComplete="new-password"
                />
              </div>
            </label>
          )}

          {error && <p className="text-red-400 text-xs font-semibold">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-400 hover:to-purple-500 disabled:opacity-60 disabled:cursor-not-allowed text-white font-black py-3 rounded-2xl border-b-4 border-blue-900 active:border-b-0 active:translate-y-1 transition-all shadow-lg"
          >
            {loading ? 'Please wait…' : mode === 'login' ? 'Log In' : 'Create Account'}
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-slate-400">
          {mode === 'login' ? (
            <>
              Need an account?{' '}
              <button className="text-blue-400 font-bold hover:text-blue-300" onClick={toggleMode}>
                Sign up
              </button>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <button className="text-blue-400 font-bold hover:text-blue-300" onClick={toggleMode}>
                Log in
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

