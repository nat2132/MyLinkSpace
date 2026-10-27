import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthShell from '../../components/ui/AuthShell';
import { Button, ErrorBanner, Input, Label } from '../../components/ui/kit';
import { login } from '../../lib/api';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({ email: '', password: '' });
  const [submitting, setSubmitting] = useState(false);
  const [apiError, setApiError] = useState('');

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
    setErrors({ ...errors, [id]: '' });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is not valid';
    }
    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError('');
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      setSubmitting(true);
      const { data, error } = await login(formData.email, formData.password);
      setSubmitting(false);
      if (error) {
        setApiError(error);
        return;
      }
      navigate('/dashboard');
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <AuthShell
      title="Welcome back"
      subtitle="Sign in to manage your links, your page and your theme."
      footerHint={
        <p className="mt-8 text-center text-[13.5px] text-mist-500">
          New here?{' '}
          <Link to="/signup" className="font-medium text-ion hover:underline">
            Create an account
          </Link>
        </p>
      }
    >
      <form onSubmit={handleSubmit} className="mt-7 flex flex-col gap-4">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            value={formData.email}
            invalid={Boolean(errors.email)}
            placeholder="you@example.com"
            onChange={handleChange}
          />
          {errors.email && <p className="mt-1.5 text-xs text-rose-400">{errors.email}</p>}
        </div>

        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            autoComplete="current-password"
            value={formData.password}
            invalid={Boolean(errors.password)}
            placeholder="Your password"
            onChange={handleChange}
          />
          {errors.password && <p className="mt-1.5 text-xs text-rose-400">{errors.password}</p>}
        </div>

        <div className="flex justify-end">
          <Link to="/reset" className="text-[13px] font-medium text-mist-300 hover:text-ion">
            Forgot password?
          </Link>
        </div>

        {apiError && <ErrorBanner message={apiError} />}

        <Button type="submit" size="lg" disabled={submitting} className="mt-1 w-full">
          {submitting ? 'Signing in…' : 'Sign in'}
        </Button>
      </form>
    </AuthShell>
  );
};

export default Login;
