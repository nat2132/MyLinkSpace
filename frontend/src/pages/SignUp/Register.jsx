import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthShell from '../../components/ui/AuthShell';
import { Button, ErrorBanner, Input, Label } from '../../components/ui/kit';
import { register } from '../../lib/api';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({ username: '', email: '', password: '' });
  const [submitting, setSubmitting] = useState(false);
  const [apiError, setApiError] = useState('');

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
    setErrors({ ...errors, [id]: '' });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.username.trim()) {
      newErrors.username = 'Name is required';
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError('');
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      setSubmitting(true);
      // The backend /api/register endpoint expects a "name" field.
      const { error } = await register(formData.username, formData.email, formData.password);
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
      title="Create your space"
      subtitle="One account, one page, unlimited destinations. It takes under a minute."
      footerHint={
        <p className="mt-8 text-center text-[13px] text-mist-700">
          By creating an account you agree to MyLinkSpace's terms of service and privacy policy.
        </p>
      }
    >
      <form onSubmit={handleSubmit} className="mt-7 flex flex-col gap-4">
        <div>
          <Label htmlFor="username">Your name</Label>
          <Input
            id="username"
            type="text"
            autoComplete="name"
            value={formData.username}
            invalid={Boolean(errors.username)}
            placeholder="Natoli — shown as your display name"
            onChange={handleChange}
          />
          {errors.username && <p className="mt-1.5 text-xs text-rose-400">{errors.username}</p>}
        </div>

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
          <Label htmlFor="password" hint="At least 6 characters">
            Password
          </Label>
          <Input
            id="password"
            type="password"
            autoComplete="new-password"
            value={formData.password}
            invalid={Boolean(errors.password)}
            placeholder="Choose something memorable"
            onChange={handleChange}
          />
          {errors.password && <p className="mt-1.5 text-xs text-rose-400">{errors.password}</p>}
        </div>

        {apiError && <ErrorBanner message={apiError} />}

        <Button type="submit" size="lg" disabled={submitting} className="mt-1 w-full">
          {submitting ? 'Creating account…' : 'Create account'}
        </Button>
      </form>

      <p className="mt-6 text-center text-[13.5px] text-mist-500">
        Already have an account?{' '}
        <Link to="/signin" className="font-medium text-ion hover:underline">
          Sign in
        </Link>
      </p>
    </AuthShell>
  );
};

export default Register;
