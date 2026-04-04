import Link from 'next/link';
import { redirect } from 'next/navigation';
import { createClient as createSupabaseServerClient } from '@/utils/supabase/server';

export default async function StudioAppHomePage() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/signin/studio');
  }

  return (
    <main style={{ minHeight: '100vh', background: '#040404', color: '#f5f2ec', padding: 22 }}>
      <style>{`
        .app-shell { max-width: 1320px; margin: 0 auto; display: grid; gap: 24px; }
        .app-topbar { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 14px 16px; border: 1px solid rgba(255,255,255,0.08); background: rgba(255,255,255,0.02); }
        .app-brand { display: flex; align-items: center; gap: 12px; }
        .app-mark { width: 34px; height: 34px; border-radius: 999px; border: 1px solid rgba(214,195,161,0.24); background: radial-gradient(circle at center, rgba(214,195,161,0.18), rgba(255,255,255,0.03)); box-shadow: 0 0 20px rgba(214,195,161,0.07); }
        .app-kicker { font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; color: rgba(245,242,236,0.42); }
        .app-muted { color: rgba(245,242,236,0.62); }
        .app-hero { display: grid; grid-template-columns: 1.02fr 0.98fr; gap: 22px; }
        .app-card { border: 1px solid rgba(255,255,255,0.08); background: linear-gradient(180deg, rgba(255,255,255,0.035), rgba(255,255,255,0.015)); box-shadow: 0 16px 40px rgba(0,0,0,0.18); }
        .app-copy { padding: 28px; display: grid; gap: 18px; }
        .app-title { margin: 0; font-size: 64px; line-height: 0.92; letter-spacing: -0.03em; font-family: var(--font-display), serif; }
        .app-actions { display: flex; gap: 10px; flex-wrap: wrap; }
        .app-btn { display: inline-flex; align-items: center; justify-content: center; text-decoration: none; padding: 13px 16px; border: 1px solid rgba(255,255,255,0.08); font-weight: 600; color: #f5f2ec; background: rgba(255,255,255,0.02); }
        .app-btn.primary { background: #f5f2ec; color: #050505; border: 0; }
        .app-grid { display: grid; grid-template-columns: repeat(3, minmax(0,1fr)); gap: 18px; }
        .app-panel { padding: 20px; display: grid; gap: 12px; }
        .app-step { padding: 14px 16px; border: 1px solid rgba(255,255,255,0.08); background: rgba(255,255,255,0.03); line-height: 1.66; }
        .app-stage { position: relative; overflow: hidden; min-height: 420px; padding: 28px; display: grid; align-content: end; }
        .app-stage::before { content: ''; position: absolute; inset: 0; background: radial-gradient(circle at 18% 18%, rgba(255,255,255,0.06), transparent 24%), radial-gradient(circle at 72% 22%, rgba(214,195,161,0.10), transparent 28%), radial-gradient(circle at 62% 74%, rgba(255,255,255,0.04), transparent 24%); }
        .app-stage > * { position: relative; z-index: 1; }
        .app-summarygrid { display: grid; grid-template-columns: repeat(2, minmax(0,1fr)); gap: 12px; }
        @media (max-width: 1080px) { .app-hero, .app-grid { grid-template-columns: 1fr; } .app-title { font-size: 48px; } }
        @media (max-width: 760px) { .app-title { font-size: 40px; } .app-summarygrid { grid-template-columns: 1fr; } .app-topbar { flex-direction: column; align-items: flex-start; } }
      `}</style>

      <div className='app-shell'>
        <header className='app-topbar'>
          <div className='app-brand'>
            <div className='app-mark' />
            <div style={{ display: 'grid', gap: 4 }}>
              <div className='app-kicker'>Signed in</div>
              <div>DEFRAG studio home</div>
            </div>
          </div>
          <div className='app-muted'>{user.email}</div>
        </header>

        <section className='app-hero'>
          <div className='app-card app-copy'>
            <div className='app-kicker'>Welcome back</div>
            <h1 className='app-title'>Continue inside the premium DEFRAG flow.</h1>
            <div className='app-muted' style={{ lineHeight: 1.78, fontSize: 18 }}>
              Move from baseline intake into the relationship workspace, then manage plans and billing from the same signed-in product surface.
            </div>
            <div className='app-actions'>
              <Link className='app-btn primary' href='/workspace'>Open workspace</Link>
              <Link className='app-btn' href='/intake'>Continue intake</Link>
              <Link className='app-btn' href='/billing'>Manage billing</Link>
            </div>
          </div>

          <div className='app-card app-stage'>
            <div className='app-summarygrid'>
              <div className='app-step'>Baseline intake and first profile summary</div>
              <div className='app-step'>Desktop and mobile relationship workspace</div>
              <div className='app-step'>Live billing portal and Stripe checkout</div>
              <div className='app-step'>Canonical premium entry flow on the preview branch</div>
            </div>
          </div>
        </section>

        <section className='app-grid'>
          <article className='app-card app-panel'>
            <div className='app-kicker'>Workspace</div>
            <div style={{ fontSize: 34, fontFamily: 'var(--font-display), serif' }}>Live field</div>
            <div className='app-muted' style={{ lineHeight: 1.72 }}>Open the premium workspace with chat, live field, and guided views.</div>
            <Link className='app-btn' href='/workspace'>Open workspace</Link>
          </article>
          <article className='app-card app-panel'>
            <div className='app-kicker'>Baseline</div>
            <div style={{ fontSize: 34, fontFamily: 'var(--font-display), serif' }}>Intake</div>
            <div className='app-muted' style={{ lineHeight: 1.72 }}>Generate or revisit the baseline that feeds the relationship workspace.</div>
            <Link className='app-btn' href='/intake'>Open intake</Link>
          </article>
          <article className='app-card app-panel'>
            <div className='app-kicker'>Billing</div>
            <div style={{ fontSize: 34, fontFamily: 'var(--font-display), serif' }}>Plans</div>
            <div className='app-muted' style={{ lineHeight: 1.72 }}>Upgrade, manage your subscription, or open the billing portal.</div>
            <Link className='app-btn' href='/billing'>Open billing</Link>
          </article>
        </section>
      </div>
    </main>
  );
}
