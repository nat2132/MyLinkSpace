import { useState } from 'react';
import registerImage from '../assets/registerImage.svg';
import google from '../assets/google.svg';
import { FaFacebook } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.svg';


const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({
    username: '',
    email: '',
    password: '',
  });

  // Handle input changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
    setErrors({ ...errors, [id]: '' }); // Clear errors as user types
  };

  // Validate form inputs
  const validate = () => {
    const newErrors = {};
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is not valid';
    }
    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    return newErrors;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      //  form submission 
      console.log('Form Submitted', formData);
    } else {
      setErrors(validationErrors); // Display validation errors
    }
  };

  return (
    <div className="min-h-screen lg:flex">
      {/* Left Section inside the container */}
      <div className="container mx-auto px-4 lg:w-1/2 py-8">
        <div className="w-full">
          <div className="flex gap-2 items-center">
            <h1 className="text-[20px] font-bold text-black">MyLinkSpace</h1>
            <img src={logo} alt="MyLinkSPace logo" />
          </div>
        </div>

        <div className="flex flex-col gap-2 md:text-center my-24">
          <h1 className="text-4xl md:text-5xl font-extrabold">
            Join MyLinkSpace
          </h1>
          <p className="text-[20px]">Sign Up for free!</p>
        </div>

        <section className="mb-8 lg:max-w-[500px] mx-auto">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label
                className="text-lg text-black font-semibold"
                htmlFor="username"
              >
                Username
              </label>
              <input
                className="bg-[#F2F2F2] w-full p-4 rounded-3xl"
                type="text"
                id="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="username"
              />
              {errors.username && (
                <p className="text-red-600 text-sm">{errors.username}</p>
              )}
            </div>

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
                value={formData.email}
                onChange={handleChange}
                placeholder="email"
              />
              {errors.email && (
                <p className="text-red-600 text-sm">{errors.email}</p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label
                className="text-lg text-black font-semibold"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="bg-[#F2F2F2] w-full p-4 rounded-3xl"
                type="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="password"
              />
              {errors.password && (
                <p className="text-red-600 text-sm">{errors.password}</p>
              )}
            </div>

            <Link
              to="/reset"
              className="text-[#7000FF] text-right font-bold my-4"
            >
              Forgot Password?
            </Link>

            <button className="w-full bg-[#7000FF] text-white p-3 rounded-full font-bold">
              Create Account
            </button>
          </form>
        </section>

        <p className="text-center max-w-[500px] mx-auto mb-4">
          By clicking Create account, you agree to
          <strong> MyLinkSpace's</strong> notice, T&Cs, and to receive offers,
          news, and updates.
        </p>

        <p className="text-center text-gray-400 font-bold">OR</p>
        <div className="flex flex-col gap-4 mb-8 mt-8">
          <button className="self-center inline-flex items-center gap-3 border border-gray-400 py-2 px-4 rounded-full justify-center font-bold text-md">
            <img src={google} alt="" width={30} />
            Sign up with Google
          </button>
          <button className="self-center inline-flex items-center gap-3 border border-gray-400 py-2 px-4 rounded-full justify-center font-bold text-md">
            <FaFacebook className="text-[#3B5998] text-3xl" />
            Sign up with Facebook
          </button>
        </div>
        <p className="text-center">
          Already have an account?{' '}
          <Link to="/login" className="text-[#7000FF] font-bold">
            Sign In
          </Link>
        </p>
      </div>

      {/* Right Section (stretches to fill the remaining space) */}
      <div className="flex-grow bg-[#87CEFA] hidden lg:flex items-center justify-center min-h-screen">
        <img
          src={registerImage}
          alt="register image"
          className="max-h-full object-contain"
        />
      </div>
    </div>
  );
};

export default Register;
