"use client";

import { FormEvent, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';

export default function StudioSignInPage() {
  const router = useRouter();
  const supabase = createClient();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });

    if (signInError) {
      setError(signInError.message);
      setLoading(false);
      return;
    }

    router.push('/app/studio');
    router.refresh();
  }

  return (
    <main style={{ minHeight: '100vh', background: '#040404', color: '#f5f2ec', display: 'grid', placeItems: 'center', padding: 22 }}>
      <style>{`
        .signin-shell { width: min(1120px, 100%); display: grid; grid-template-columns: 1.02fr 0.98fr; gap: 22px; }
        .signin-card { border: 1px solid rgba(255,255,255,0.08); background: linear-gradient(180deg, rgba(255,255,255,0.035), rgba(255,255,255,0.015)); box-shadow: 0 16px 40px rgba(0,0,0,0.18); }
        .signin-kicker { font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; color: rgba(245,242,236,0.42); }
        .signin-muted { color: rgba(245,242,236,0.62); }
        .signin-title { font-size: 64px; line-height: 0.92; letter-spacing: -0.03em; font-family: var(--font-display), serif; margin: 0; }
        .signin-stage { position: relative; overflow: hidden; padding: 28px; display: grid; gap: 20px; }
        .signin-stage::before { content: ''; position: absolute; inset: 0; background: radial-gradient(circle at 20% 20%, rgba(255,255,255,0.06), transparent 24%), radial-gradient(circle at 70% 20%, rgba(214,195,161,0.10), transparent 28%), radial-gradient(circle at 65% 72%, rgba(255,255,255,0.04), transparent 22%); }
        .signin-stage > * { position: relative; z-index: 1; }
        .signin-node { width: 164px; height: 164px; border-radius: 999px; border: 1px solid rgba(255,255,255,0.14); background: radial-gradient(circle at center, rgba(255,255,255,0.09), rgba(255,255,255,0.015)); display: grid; place-items: center; text-align: center; box-shadow: 0 0 44px rgba(255,255,255,0.04); }
        .signin-step { padding: 14px 16px; border: 1px solid rgba(255,255,255,0.08); background: rgba(255,255,255,0.03); line-height: 1.68; }
        .signin-form { padding: 28px; display: grid; gap: 14px; }
        .signin-input { padding: 14px 16px; background: #0a0a0a; color: #f5f2ec; border: 1px solid rgba(255,255,255,0.1); }
        .signin-btn { border: 0; padding: 14px 18px; background: #f5f2ec; color: #050505; font-weight: 700; }
        @media (max-width: 920px) { .signin-shell { grid-template-columns: 1fr; } .signin-title { font-size: 46px; } }
      `}</style>

      <section className='signin-shell'>
        <div className='signin-card signin-stage'>
          <div className='signin-kicker'>Premium access</div>
          <h1 className='signin-title'>Return to your DEFRAG studio.</h1>
          <div className='signin-muted' style={{ lineHeight: 1.76, maxWidth: 560 }}>
            Sign in to continue your baseline, open the relationship workspace, and manage billing from one account.
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0,1fr))', gap: 12 }}>
            <div className='signin-step'>Baseline intake and profile</div>
            <div className='signin-step'>Relationship workspace and mobile view</div>
            <div className='signin-step'>Billing, plans, and account access</div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 12 }}>
            <div className='signin-node'>
              <div>
                <div className='signin-kicker' style={{ fontSize: 10 }}>Defrag</div>
                <div style={{ fontSize: 30, fontFamily: 'var(--font-display), serif' }}>Studio</div>
                <div className='signin-muted' style={{ fontSize: 13 }}>premium workspace</div>
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className='signin-card signin-form'>
          <div style={{ display: 'grid', gap: 8 }}>
            <div className='signin-kicker'>Access</div>
            <div style={{ fontSize: 36, fontFamily: 'var(--font-display), serif' }}>Sign in</div>
            <div className='signin-muted' style={{ lineHeight: 1.72 }}>Use your DEFRAG account to continue into the upgraded product flow.</div>
          </div>
          <input className='signin-input' value={email} onChange={(e) => setEmail(e.target.value)} type='email' placeholder='Email' required />
          <input className='signin-input' value={password} onChange={(e) => setPassword(e.target.value)} type='password' placeholder='Password' required />
          {error ? <div style={{ color: '#fca5a5' }}>{error}</div> : null}
          <button type='submit' disabled={loading} className='signin-btn'>{loading ? 'Signing in...' : 'Continue to studio'}</button>
          <div className='signin-muted' style={{ lineHeight: 1.7 }}>
            Need an account? <Link href='/signup' style={{ color: '#f5f2ec' }}>Create one</Link>
          </div>
        </form>
      </section>
    </main>
  );
}
