import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthShell from '../../components/ui/AuthShell';
import { Button, ErrorBanner, Input, Label, useToast } from '../../components/ui/kit';
import { forgotPassword } from '../../lib/api';

const PasswordReset = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const toast = useToast();

  const validate = () => {
    if (!email.trim()) {
      return 'Email is required';
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      return 'Email is not valid';
    }
    return '';
  };

  // Previously a console.log-only mock; now posts to POST /api/auth/forgot-password.
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }
    setSubmitting(true);
    const { error: apiError } = await forgotPassword(email.trim());
    setSubmitting(false);
    if (apiError) {
      setError(apiError);
      return;
    }
    setSent(true);
    toast('Reset instructions sent — check your inbox');
  };

  return (
    <AuthShell
      title="Reset your password"
      subtitle="Enter the email on the account and we'll send reset instructions."
      footerHint={
        <p className="mt-8 text-center text-[13.5px] text-mist-500">
          Remembered it after all?{' '}
          <Link to="/signin" className="font-medium text-ion hover:underline">
            Back to sign in
          </Link>
        </p>
      }
    >
      {sent ? (
        <div className="mt-7 rounded-xl border border-ion/25 bg-ion-dim p-5 text-[14px] leading-relaxed text-mist-100">
          <p className="font-semibold text-ion">Request received.</p>
          <p className="mt-1.5">
            If {email.trim()} matches an account, reset instructions are on their way. The
            email can take a few minutes to arrive — check the spam folder too.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-7 flex flex-col gap-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              value={email}
              invalid={Boolean(error)}
              placeholder="you@example.com"
              onChange={(e) => {
                setEmail(e.target.value);
                setError('');
              }}
            />
            {error && <p className="mt-1.5 text-xs text-rose-400">{error}</p>}
          </div>

          {error && error !== 'Email is required' && error !== 'Email is not valid' && (
            <ErrorBanner message={error} />
          )}

          <Button type="submit" size="lg" disabled={submitting} className="mt-1 w-full">
            {submitting ? 'Sending…' : 'Send reset link'}
          </Button>
        </form>
      )}
    </AuthShell>
  );
};

export default PasswordReset;
