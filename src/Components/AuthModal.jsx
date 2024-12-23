import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext.jsx';

const AuthModal = ({ isOpen, onClose, onAuthSuccess }) => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      let response;

      if (isSignUp) {
        response = await axios.post('http://localhost:5000/auth/signup', {
          name,
          email,
          password,
        });
      } else {
        response = await axios.post('http://localhost:5000/auth/login', {
          email,
          password,
        });
      }

      login(response.data.user);
      localStorage.setItem('userId', response.data.userId);
      onAuthSuccess();
      onClose();
    } catch (error) {
      setError('Authentication failed. Please try again.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-[#f5e6d3] p-8 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-2xl font-semibold text-center mb-6 text-[#8b7d6b]">
          {isSignUp ? 'Sign Up' : 'Sign In'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignUp && (
            <div>
              <label className="block text-sm font-medium text-[#5c4f3d]">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 border border-[#d3c4b3] rounded-md bg-white text-[#5c4f3d]"
                required
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-[#5c4f3d]">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-[#d3c4b3] rounded-md bg-white text-[#5c4f3d]"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#5c4f3d]">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-[#d3c4b3] rounded-md bg-white text-[#5c4f3d]"
              required
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full py-3 bg-[#8b7d6b] text-white rounded-md hover:bg-[#5c4f3d] transition duration-300"
            disabled={loading}
          >
            {loading ? 'Submitting...' : isSignUp ? 'Sign Up' : 'Sign In'}
          </button>
        </form>

        <div className="mt-4 text-center">
          <button
            onClick={() => setIsSignUp((prev) => !prev)}
            className="text-sm text-[#5c4f3d] hover:underline"
          >
            {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
          </button>
        </div>

        <div className="mt-4 text-center">
          <button
            onClick={onClose}
            className="text-sm text-[#5c4f3d] hover:underline"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
