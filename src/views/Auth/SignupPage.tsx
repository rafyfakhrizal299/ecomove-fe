// src/views/Auth/SignupPage.tsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { RootState } from '../../store';
import LogoEco from '../../assets/img/Ecomove_Logo.png';
import { resetSignupState, signupRequest } from '../../slices/signupSlice';

const SignupPage: React.FC = () => {
  const [serviceType, setServiceType] = useState('Business Deliveries (Non-food)');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, success, error } = useSelector((state: RootState) => state.signup);

  useEffect(() => {
    if (success) {
      alert('Registration successful! Please log in.');
      navigate('/');
      dispatch(resetSignupState());
    }
    return () => {
      dispatch(resetSignupState());
    };
  }, [success, navigate, dispatch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreeToTerms) {
      alert('You must agree to the terms of service.');
      return;
    }

    dispatch(
      signupRequest({
        serviceType,
        firstName,
        lastName,
        mobileNumber: `+63${mobileNumber}`,
        email,
        password,
        agreeToTerms,
      }),
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-sm mt-16">
        <div className="flex flex-col items-center mb-6">
          <img src={LogoEco} alt="Ecomove Logo" className="h-full w-full mb-2" />
          <h2 className="text-2xl font-bold text-gray-800">Sign up for FREE</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <p className="text-gray-700 text-sm font-semibold mb-2">
              How do you plan to use Ecomove's services?*
            </p>
            <div className="space-y-2">
              {[
                'Business Deliveries (Non-food)',
                'Business Deliveries (Food)',
                'Personal and Business',
                'Personal Delivery',
              ].map((type) => (
                <label key={type} className="flex items-center text-gray-700 text-sm">
                  <input
                    type="radio"
                    name="serviceType"
                    value={type}
                    checked={serviceType === type}
                    onChange={(e) => setServiceType(e.target.value)}
                    className="form-radio h-4 w-4 text-green-600 border-gray-300 focus:ring-green-500"
                  />
                  <span className="ml-2">{type}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label htmlFor="firstName" className="sr-only">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              placeholder="First Name*"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              disabled={loading}
              required
            />
          </div>

          <div>
            <label htmlFor="lastName" className="sr-only">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              placeholder="Last Name*"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              disabled={loading}
              required
            />
          </div>

          <div>
            <label htmlFor="mobileNumber" className="sr-only">
              Mobile Number
            </label>
            <div className="flex">
              <span className="inline-flex items-center px-3 border border-r-0 border-gray-300 rounded-l-md bg-gray-50 text-gray-500 text-sm">
                +63
              </span>
              <input
                type="tel"
                id="mobileNumber"
                placeholder="9xxxxxxxxx"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-r-md focus:outline-none focus:ring-2 focus:ring-green-500"
                value={mobileNumber}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, '');
                  setMobileNumber(value);
                }}
                disabled={loading}
                required
                maxLength={10}
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Email*"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              required
            />
          </div>

          <div className="relative">
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              placeholder="Password*"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 pr-10"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
            >
              {/* {showPassword ? (
                <IoEyeOffOutline className="h-5 w-5" />
              ) : (
                <IoEyeOutline className="h-5 w-5" />
              )} */}
            </button>
          </div>

          <div className="flex items-center text-sm">
            <label className="flex items-center text-gray-700">
              <input
                type="checkbox"
                className="form-checkbox h-4 w-4 text-green-600 border-gray-300 rounded mr-2"
                checked={agreeToTerms}
                onChange={(e) => setAgreeToTerms(e.target.checked)}
                disabled={loading}
              />
              I agree to the terms of service
            </label>
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 px-4 rounded-md font-semibold hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 transition-colors duration-200"
            disabled={loading}
          >
            {loading ? 'Signing Up...' : 'Sign Up'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/" className="text-green-600 hover:underline">
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
