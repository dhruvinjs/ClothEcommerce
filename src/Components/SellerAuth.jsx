import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SellerAuth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [businessAddress, setBusinessAddress] = useState('');
  const [businessType, setBusinessType] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

  
    try {
      const endpoint = isLogin
        ? 'http://localhost:5000/auth/seller/login'
        : 'http://localhost:5000/auth/seller/signup';

      const payload = isLogin
        ? { email, password }
        : {
            name,
            email,
            password,
            phoneNumber,
            businessName,
            businessAddress,
            businessType,
          };

      const response = await axios.post(endpoint, payload);

      setSuccess(isLogin ? 'Login successful!' : 'Sign up successful!');

      if (isLogin) {
        const { sellerId } = response.data;
        localStorage.setItem('sellerId', sellerId);
        navigate('/seller');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred');
    }
  };
const handleStaticSubmit=(e)=>{
  e.preventDefault()
    // Check for static login credentials
    if (isLogin && email === 'john' && password === 'john10') {
      navigate('/seller');
      return;
    }

    if (!isLogin && password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }

}
  return (
    <div className="min-h-screen bg-[#f5e6d3] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-md">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-[#5c4f3d]">
            {isLogin ? 'Seller Login' : 'Seller Sign Up'}
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleStaticSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="text"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-[#d3c4b3] placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-[#8b7d6b] focus:border-[#8b7d6b] focus:z-10 sm:text-sm"
                placeholder="Username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-[#d3c4b3] placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#8b7d6b] focus:border-[#8b7d6b] focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {!isLogin && (
              <>
                <div>
                  <label htmlFor="confirm-password" className="sr-only">
                    Confirm Password
                  </label>
                  <input
                    id="confirm-password"
                    name="confirm-password"
                    type="password"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-[#d3c4b3] placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#8b7d6b] focus:border-[#8b7d6b] focus:z-10 sm:text-sm"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>

                <div>
                  <label htmlFor="name" className="sr-only">
                    Full Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-[#d3c4b3] placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-[#8b7d6b] focus:border-[#8b7d6b] focus:z-10 sm:text-sm"
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div>
                  <label htmlFor="phone-number" className="sr-only">
                    Phone Number
                  </label>
                  <input
                    id="phone-number"
                    name="phone-number"
                    type="text"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-[#d3c4b3] placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#8b7d6b] focus:border-[#8b7d6b] focus:z-10 sm:text-sm"
                    placeholder="Phone Number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>

                <div>
                  <label htmlFor="business-name" className="sr-only">
                    Business Name
                  </label>
                  <input
                    id="business-name"
                    name="business-name"
                    type="text"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-[#d3c4b3] placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#8b7d6b] focus:border-[#8b7d6b] focus:z-10 sm:text-sm"
                    placeholder="Business Name"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                  />
                </div>

                <div>
                  <label htmlFor="business-address" className="sr-only">
                    Business Address
                  </label>
                  <input
                    id="business-address"
                    name="business-address"
                    type="text"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-[#d3c4b3] placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#8b7d6b] focus:border-[#8b7d6b] focus:z-10 sm:text-sm"
                    placeholder="Business Address"
                    value={businessAddress}
                    onChange={(e) => setBusinessAddress(e.target.value)}
                  />
                </div>

                <div>
                  <label htmlFor="business-type" className="sr-only">
                    Business Type
                  </label>
                  <input
                    id="business-type"
                    name="business-type"
                    type="text"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-[#d3c4b3] placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-[#8b7d6b] focus:border-[#8b7d6b] focus:z-10 sm:text-sm"
                    placeholder="Business Type"
                    value={businessType}
                    onChange={(e) => setBusinessType(e.target.value)}
                  />
                </div>
              </>
            )}
          </div>

          {error && <p className="mt-2 text-center text-sm text-red-600">{error}</p>}
          {success && <p className="mt-2 text-center text-sm text-green-600">{success}</p>}

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#8b7d6b] hover:bg-[#5c4f3d] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#8b7d6b]"
            >
              {isLogin ? 'Sign in' : 'Sign up'}
            </button>
          </div>
        </form>
        <div className="text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="font-medium text-[#5c4f3d] hover:text-[#8b7d6b]"
          >
            {isLogin ? 'Need to create an account?' : 'Already have an account?'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SellerAuth;
