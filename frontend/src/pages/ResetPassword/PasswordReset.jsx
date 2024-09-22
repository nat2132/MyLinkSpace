import { useState } from 'react';
import resetImage from '../assets/resetImage.svg';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.svg';

const PasswordReset = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  // Handle input changes
  const handleChange = (e) => {
    setEmail(e.target.value);
    setError(''); // Clear error as user types
  };

  // Validate email input
  const validate = () => {
    if (!email.trim()) {
      return 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      return 'Email is not valid';
    }
    return '';
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationError = validate();
    if (!validationError) {
      //  password reset logic  
      console.log('Password reset request submitted', email);
    } else {
      setError(validationError); // Display validation error
    }
  };

  return (
    <div className="min-h-screen">
      <div className="lg:flex">
        {/* Left Section (Form and Text) */}
        <div className="container mx-auto px-4 lg:w-1/2 py-8">
          <div className="w-full">
            <div className="flex gap-2 items-center">
              <h1 className="text-[20px] font-bold text-black">MyLinkSpace</h1>
              <img src={logo} alt="MyLinkSPace logo" />
            </div>
          </div>

          <section className="mb-8 lg:max-w-[500px] mx-auto mt-24 md:mt-24">
            <div className="mt-32 md:mt-52 mb-16">
              <h1 className="text-2xl md:text-5xl font-extrabold">
                Forgot Password
              </h1>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-8">
              <div className="flex flex-col gap-2">
                <label
                  className="text-lg text-black font-semibold"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className="bg-[#F2F2F2] w-full p-4 rounded-3xl"
                  type="email"
                  id="email"
                  value={email}
                  onChange={handleChange}
                  placeholder="email"
                />
                {error && <p className="text-red-600 text-sm">{error}</p>}
              </div>

              <button className="w-full bg-[#7000FF] text-white p-3 rounded-full font-bold">
                Reset Password
              </button>

              <Link
                to="/login"
                className="text-center underline text-[#7000FF] font-bold"
              >
                Back to Sign In
              </Link>
            </form>
          </section>
        </div>

        {/* Right Section (Image with Full-Width Background) */}
        <div className="hidden lg:flex-grow bg-[#FFFAE7] lg:flex items-center justify-center min-h-screen">
          <img
            src={resetImage}
            alt="login image"
            className="max-h-full object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default PasswordReset;
