"use client";

import Link from 'next/link';
import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';

const PREVIEW_ENV_ERROR =
  'Account creation is unavailable in this preview environment. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to continue.';

export default function StudioSignUpPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    if (password.length < 8) {
      setError('Password must be at least 8 characters.');
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      setLoading(false);
      return;
    }

    let supabase;
    try {
      supabase = createClient();
    } catch {
      setError(PREVIEW_ENV_ERROR);
      setLoading(false);
      return;
    }

    const { error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/app/studio`,
      },
    });

    if (signUpError) {
      setError(signUpError.message);
      setLoading(false);
      return;
    }

    router.push('/app/studio');
    router.refresh();
  }

  return (
    <main style={{ minHeight: '100vh', background: '#040404', color: '#f5f2ec', display: 'grid', placeItems: 'center', padding: 22 }}>
      <style>{`
        .signup-shell { width: min(1120px, 100%); display: grid; grid-template-columns: 1.02fr 0.98fr; gap: 22px; }
        .signup-card { border: 1px solid rgba(255,255,255,0.08); background: linear-gradient(180deg, rgba(255,255,255,0.035), rgba(255,255,255,0.015)); box-shadow: 0 16px 40px rgba(0,0,0,0.18); }
        .signup-kicker { font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; color: rgba(245,242,236,0.42); }
        .signup-muted { color: rgba(245,242,236,0.62); }
        .signup-title { font-size: 60px; line-height: 0.92; letter-spacing: -0.03em; font-family: var(--font-display), serif; margin: 0; }
        .signup-stage { position: relative; overflow: hidden; padding: 28px; display: grid; gap: 18px; }
        .signup-stage::before { content: ''; position: absolute; inset: 0; background: radial-gradient(circle at 18% 18%, rgba(255,255,255,0.06), transparent 24%), radial-gradient(circle at 72% 22%, rgba(214,195,161,0.10), transparent 28%), radial-gradient(circle at 66% 76%, rgba(255,255,255,0.04), transparent 24%); }
        .signup-stage > * { position: relative; z-index: 1; }
        .signup-step { padding: 14px 16px; border: 1px solid rgba(255,255,255,0.08); background: rgba(255,255,255,0.03); line-height: 1.68; }
        .signup-form { padding: 28px; display: grid; gap: 14px; }
        .signup-input { padding: 14px 16px; background: #0a0a0a; color: #f5f2ec; border: 1px solid rgba(255,255,255,0.1); }
        .signup-btn { border: 0; padding: 14px 18px; background: #f5f2ec; color: #050505; font-weight: 700; }
        @media (max-width: 920px) { .signup-shell { grid-template-columns: 1fr; } .signup-title { font-size: 44px; } }
      `}</style>

      <section className='signup-shell'>
        <div className='signup-card signup-stage'>
          <div className='signup-kicker'>Create account</div>
          <h1 className='signup-title'>Create your Defrag studio account.</h1>
          <div className='signup-muted' style={{ lineHeight: 1.78 }}>
            Create one account so baseline, workspace access, and billing stay connected in one premium flow.
          </div>
          <div style={{ display: 'grid', gap: 10 }}>
            <div className='signup-step'>One account for baseline, workspace, and billing</div>
            <div className='signup-step'>Premium studio surfaces across public and signed-in pages</div>
            <div className='signup-step'>Built for ongoing use across intake, workspace, and account tools</div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className='signup-card signup-form'>
          <div style={{ display: 'grid', gap: 8 }}>
            <div className='signup-kicker'>Access</div>
            <div style={{ fontSize: 36, fontFamily: 'var(--font-display), serif' }}>Create account</div>
          </div>
          <input className='signup-input' value={email} onChange={(e) => setEmail(e.target.value)} type='email' placeholder='Email' required />
          <input className='signup-input' value={password} onChange={(e) => setPassword(e.target.value)} type='password' placeholder='Password' required />
          <input className='signup-input' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} type='password' placeholder='Confirm password' required />
          {error ? <div style={{ color: '#fca5a5', lineHeight: 1.6 }}>{error}</div> : null}
          <button type='submit' disabled={loading} className='signup-btn'>{loading ? 'Creating account...' : 'Create account'}</button>
          <div className='signup-muted' style={{ lineHeight: 1.7 }}>
            Already have an account? <Link href='/signin/studio' style={{ color: '#f5f2ec' }}>Sign in</Link>
          </div>
        </form>
      </section>
    </main>
  );
}
