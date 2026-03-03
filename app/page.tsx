'use client';

import { useEffect, useState, useRef, useCallback } from 'react';

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showBtt, setShowBtt] = useState(false);
  const [formState, setFormState] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [emailError, setEmailError] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  /* ── Scroll reveal ── */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.08, rootMargin: '0px 0px -32px 0px' },
    );
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  /* ── Back to top ── */
  useEffect(() => {
    const h = () => setShowBtt(window.scrollY > 600);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);

  /* ── Lock body on menu ── */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  /* ── Smooth scroll ── */
  const scrollTo = useCallback((id: string) => {
    setMenuOpen(false);
    if (id === '#') { window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
    const el = document.querySelector(id);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - 80, behavior: 'smooth' });
  }, []);

  /* ── Email validation ── */
  const freeProviders = ['gmail.com','yahoo.com','hotmail.com','outlook.com','aol.com','icloud.com','mail.com','protonmail.com','yandex.com','mail.ru'];
  const isWorkEmail = (v: string) => { const d = v.split('@')[1]; return d ? !freeProviders.includes(d.toLowerCase()) : false; };

  /* ── Form submit ── */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = formRef.current;
    if (!form) return;
    const email = (form.querySelector('#email') as HTMLInputElement).value;
    if (!isWorkEmail(email)) { setEmailError(true); return; }
    setFormState('sending');
    try {
      const res = await fetch('https://formspree.io/f/mykknngn', {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });
      if (res.ok) {
        setFormState('success');
      } else {
        setFormState('error');
      }
    } catch {
      setFormState('error');
    }
  };

  return (
    <>
      {/* ══════ NAV ══════ */}
      <nav className="g-nav">
        <div className="container">
          <a className="logo" onClick={() => scrollTo('#')}>Geonyx<span>.</span></a>
          <ul className="nav-links">
            <li><a onClick={() => scrollTo('#problem')}>Problem</a></li>
            <li><a onClick={() => scrollTo('#usecases')}>Use Cases</a></li>
            <li><a onClick={() => scrollTo('#diagnostics')}>Diagnostics</a></li>
            <li><a onClick={() => scrollTo('#deliverables')}>Deliverables</a></li>
            <li><a className="nav-cta" onClick={() => scrollTo('#apply')}>Apply for Early Access</a></li>
          </ul>
          <button className={`hamburger${menuOpen ? ' active' : ''}`} onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
            <span /><span /><span />
          </button>
        </div>
      </nav>

      <div className={`mobile-menu${menuOpen ? ' active' : ''}`}>
        <a onClick={() => scrollTo('#problem')}>Problem</a>
        <a onClick={() => scrollTo('#usecases')}>Use Cases</a>
        <a onClick={() => scrollTo('#diagnostics')}>Diagnostics</a>
        <a onClick={() => scrollTo('#deliverables')}>Deliverables</a>
        <a className="btn-primary" onClick={() => scrollTo('#apply')}>Apply for Early Access</a>
      </div>

      {/* ══════ HERO ══════ */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-label anim d1">AI Recommendation Intelligence</div>
            <h1 className="anim d2">AI recommends your <em>competitors</em>. Your team tracks mentions. Nobody diagnoses why.</h1>
            <p className="hero-sub anim d3">A buyer asks ChatGPT for the best solution in your category. Your competitor is first. You&apos;re third, or absent. 35+ tools will confirm this. Only GEONYX explains why and validates what to change.</p>
            <div className="hero-actions anim d4">
              <a className="btn-primary" onClick={() => scrollTo('#apply')}>Apply for Early Access</a>
              <a className="btn-ghost" onClick={() => scrollTo('#usecases')}>See Use Cases</a>
            </div>
          </div>

          <div className="hero-mock anim d5">
            <div className="mock-header">
              <div className="mock-title">Recommendation Share</div>
              <div className="mock-badge">Commerce Intent</div>
            </div>
            <div className="mock-prompt-bar"><span>Prompt:</span> &quot;Best compliance platform for a mid-market fintech&quot;</div>
            <div className="mock-label-row">
              <div className="mock-label-tag mock-label-before">Before</div>
              <div className="mock-label-tag mock-label-after">After intervention</div>
            </div>

            <div className="mock-brand-row leader">
              <div className="mock-num">1</div>
              <div className="mock-bar-wrap"><div className="mock-bar-name">Vanta</div><div className="mock-bar"><div className="mock-bar-fill" style={{width:'78%',background:'var(--cyan)'}} /></div><div className="mock-bar-pct" style={{color:'var(--cyan)'}}>78%</div></div>
              <div className="mock-bar-wrap"><div className="mock-bar"><div className="mock-bar-fill" style={{width:'62%',background:'var(--gray-500)'}} /></div><div className="mock-bar-pct" style={{color:'var(--gray-400)'}}>62%</div></div>
            </div>
            <div className="mock-brand-row comp">
              <div className="mock-num">2</div>
              <div className="mock-bar-wrap"><div className="mock-bar-name">Drata</div><div className="mock-bar"><div className="mock-bar-fill" style={{width:'64%',background:'var(--gray-500)'}} /></div><div className="mock-bar-pct" style={{color:'var(--gray-400)'}}>64%</div></div>
              <div className="mock-bar-wrap"><div className="mock-bar"><div className="mock-bar-fill" style={{width:'58%',background:'var(--gray-500)'}} /></div><div className="mock-bar-pct" style={{color:'var(--gray-400)'}}>58%</div></div>
            </div>
            <div className="mock-brand-row you-before">
              <div className="mock-num">3</div>
              <div className="mock-bar-wrap"><div className="mock-bar-name">You</div><div className="mock-bar"><div className="mock-bar-fill" style={{width:'31%'}} /></div><div className="mock-bar-pct">31%</div></div>
              <div className="mock-bar-wrap"><div className="mock-bar"><div className="mock-bar-fill" style={{width:'71%',background:'var(--green)'}} /></div><div className="mock-bar-pct" style={{color:'var(--green)'}}>71%</div></div>
            </div>

            <div className="mock-footer">GPT-4o + Claude 3.5 + Falcon · 5 runs each · 30 days between measurements</div>
          </div>
        </div>
      </section>

      {/* ══════ STATS ══════ */}
      <section className="stat-bar">
        <div className="container">
          <div className="anim d2"><div className="stat-number">65%</div><div className="stat-label">of searches end without a click. Users get answers directly from AI.</div><div className="stat-source">Source: SparkToro / Datos, 2024</div></div>
          <div className="anim d3"><div className="stat-number">3+</div><div className="stat-label">major models form recommendations differently for the exact same query.</div></div>
          <div className="anim d4"><div className="stat-number">35+</div><div className="stat-label">tools track AI mentions. Zero diagnose why AI recommends your competitor instead.</div></div>
        </div>
      </section>

      <div className="social-proof"><div className="container"><div className="proof-dot" /><div className="proof-text">Sovereign model diagnostics on dedicated GPU. Coverage across global and regional LLMs including Falcon, Jais, and open-source models.</div></div></div>

      {/* ══════ PROBLEM ══════ */}
      <section className="section section-light" id="problem">
        <div className="container">
          <div className="section-label reveal">The Problem</div>
          <div className="problem-grid">
            <div>
              <div className="section-title reveal">Dozens of tools track AI mentions. None explain the structure behind recommendations.</div>
              <p className="section-desc reveal" style={{marginBottom:32}}>Your competitor shows up first in ChatGPT, Gemini, and Claude. Visibility dashboards confirm what you already suspect. But they can&apos;t tell you why, and you can&apos;t change what you don&apos;t understand.</p>
              <div className="problem-questions reveal">
                <div className="problem-q">Why does AI recommend my competitor over us?</div>
                <div className="problem-q">Why did our ranking drop after the last model update?</div>
                <div className="problem-q">Why are our facts wrong in comparison prompts?</div>
                <div className="problem-q">Why are we invisible in purchase-intent queries?</div>
              </div>
              <div className="problem-escalation reveal">
                <p><strong>Meanwhile, your teams spend blind.</strong> PR agencies propose media plans without knowing which publications AI cites. Content teams write for keywords that AI answers directly. Visibility dashboards confirm the problem but can&apos;t explain it. Budgets go to channels that no longer influence how buyers discover you.</p>
              </div>
            </div>
            <div className="problem-right reveal">
              <div className="problem-stat-big">65%</div>
              <div className="problem-stat-title">Zero-click searches</div>
              <div className="problem-stat-desc">Users get answers from AI without visiting your site. The buyer who asks AI for &quot;best compliance platform&quot; never sees a link. They see a recommendation. The question isn&apos;t &quot;are we visible?&quot; It&apos;s &quot;what does AI say about us when we&apos;re not in the room?&quot;</div>
              <div className="problem-stat-source">Source: SparkToro / Datos, 2024</div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════ USE CASES ══════ */}
      <section className="section section-dark" id="usecases">
        <div className="container">
          <div className="uc-section-intro reveal">
            <div><div className="section-label">How Teams Use Geonyx</div><div className="section-title">Your agency sends a plan. We tell you what AI actually trusts.</div></div>
            <p className="section-desc">Budgets go to publications, content, and keywords. Geonyx validates which of those investments actually influence AI recommendations before you spend.</p>
          </div>

          <div className="uc-featured reveal">
            <div className="uc-featured-text">
              <div className="uc-situation">Your PR agency proposes a $120k media plan for MENA. 12 publications, heavy LinkedIn campaign, 3 sponsored features.</div>
              <h3>Validate media spend against what regional AI models actually cite</h3>
              <p>Sovereign models like Falcon and Jais work with locally vetted, authorized sources. LinkedIn content is not indexed by most sovereign LLMs. A $40k LinkedIn thought leadership campaign in UAE may have zero influence on AI-mediated recommendations in the region.</p>
              <p>We run sovereign models on dedicated GPU infrastructure and audit every proposed channel against the authority sources that both regional and global models actually cite. Before you spend, you know which placements influence AI recommendations and which don&apos;t.</p>
              <div className="uc-result">Result: redirect spend to channels AI trusts in your target region. Know which publications to prioritize before committing budget.</div>
            </div>
            <div className="uc-audit-mock">
              <div className="uc-audit-title">Media Plan Authority Audit</div>
              <div className="uc-audit-subtitle">Publication check: MENA</div>
              <div className="audit-row"><div className="audit-name">Arabian Business</div><div className="audit-model">Falcon · Jais · GPT-4o</div><div className="audit-status audit-yes">Cited</div></div>
              <div className="audit-row"><div className="audit-name">Gulf News</div><div className="audit-model">Falcon · Jais · GPT-4o</div><div className="audit-status audit-yes">Cited</div></div>
              <div className="audit-row"><div className="audit-name">Forbes Middle East</div><div className="audit-model">GPT-4o · Claude</div><div className="audit-status audit-partial">Partial</div></div>
              <div className="audit-row"><div className="audit-name">LinkedIn (organic)</div><div className="audit-model">Falcon · Jais</div><div className="audit-status audit-no">Not indexed</div></div>
              <div className="audit-row"><div className="audit-name">LinkedIn (sponsored)</div><div className="audit-model">All models</div><div className="audit-status audit-no">Not indexed</div></div>
              <div className="audit-divider" />
              <div className="uc-audit-subtitle">Intervention validation</div>
              <div className="audit-journalist-row"><div><span className="audit-journalist-name">Comparison page added</span> <span className="audit-journalist-pub">· Day 0 → Day 30</span></div><div className="audit-journalist-score audit-yes">Validated ↑</div></div>
              <div className="audit-journalist-row"><div><span className="audit-journalist-name">Arabian Business feature</span> <span className="audit-journalist-pub">· Day 0 → Day 30</span></div><div className="audit-journalist-score audit-yes">Validated ↑</div></div>
              <div className="audit-journalist-row"><div><span className="audit-journalist-name">LinkedIn campaign</span> <span className="audit-journalist-pub">· Day 0 → Day 30</span></div><div className="audit-journalist-score audit-partial">No change</div></div>
              <div className="audit-footer">Fictional example. Real audits use validated citation checks across sovereign and global model responses.</div>
            </div>
          </div>

          <div className="uc-secondary reveal">
            <div className="uc-card">
              <div className="uc-situation">Your content team plans Q3 topics based on keyword volume and competitor blogs.</div>
              <h3>Prioritize content by AI recommendation gaps</h3>
              <p>We show which intent clusters your competitors dominate and where you&apos;re structurally absent. Instead of guessing topics, build content that fills the exact gaps AI models expose.</p>
              <div className="uc-card-spacer" />
              <div className="uc-result">Result: content calendar optimized for AI recommendation coverage, not just organic traffic.</div>
            </div>
            <div className="uc-card">
              <div className="uc-situation">Your SEO team invests in keywords where 80% of users now get answers from AI without clicking.</div>
              <h3>Separate keywords that still drive clicks from those AI answers directly</h3>
              <p>For queries where AI gives direct answers, SEO investment goes to waste. We map which queries still drive site traffic and which ones need an AI recommendation strategy instead.</p>
              <div className="uc-card-spacer" />
              <div className="uc-result">Result: reallocate budget from dead-end SEO to AI-optimized positioning.</div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════ DIAGNOSTICS ══════ */}
      <section className="section section-light" id="diagnostics">
        <div className="container">
          <div className="section-label reveal">Structural Diagnostics</div>
          <div className="section-title reveal">Four dimensions no visibility tool measures</div>
          <p className="section-desc reveal">35+ tools answer &quot;are you mentioned?&quot; None answer &quot;why does AI choose your competitor?&quot; We decompose the mechanics behind every recommendation.</p>
          <div className="diag-grid reveal">
            <div className="diag-card"><div className="diag-index">01</div><h3>Where you&apos;re invisible</h3><p>We test discovery, comparison, and purchase prompts separately. You might rank well for &quot;what is X&quot; but disappear when someone asks &quot;best X for mid-market.&quot;</p><div className="diag-technical">Cluster Weakness Detection</div></div>
            <div className="diag-card"><div className="diag-index">02</div><h3>Why competitors win head-to-head</h3><p>When AI compares you to a competitor, it builds an argument for each side. We measure whose argument is structurally stronger and what drives the asymmetry.</p><div className="diag-technical">Comparative Framing Asymmetry</div></div>
            <div className="diag-card"><div className="diag-index">03</div><h3>What AI gets wrong about you</h3><p>Models state facts about your product that aren&apos;t true, miss differentiators, or confuse you with competitors. We extract every claim and check it against your truth-set.</p><div className="diag-technical">Knowledge Misalignment Index</div></div>
            <div className="diag-card"><div className="diag-index">04</div><h3>Who AI trusts more</h3><p>Models cite sources when forming recommendations. We validate which are real, which are hallucinated, and whether your competitor dominates the high-trust references.</p><div className="diag-technical">Authority Surface Dominance</div></div>
          </div>
        </div>
      </section>

      {/* ══════ METHODOLOGY ══════ */}
      <section className="section section-dark">
        <div className="container">
          <div className="section-label reveal">Methodology</div>
          <div className="section-title reveal">Not a snapshot. A closed-loop diagnostic system.</div>
          <p className="section-desc reveal">Every measurement is versioned. Every run is repeatable. Every intervention is validated. Methodology documented in full. Whitepaper with real data in progress.</p>
          <div className="process-grid reveal">
            <div className="process-step"><div className="step-num">1</div><h3>Prompt Universe</h3><p>30+ version-controlled prompts across discovery, comparison, and commerce intent. Tailored to your competitive landscape.</p></div>
            <div className="process-step"><div className="step-num">2</div><h3>Multi-Model Runs</h3><p>Global models (GPT-4o, Claude, Gemini) and sovereign models (Falcon, Jais) on dedicated GPU. Multiple runs per prompt. We measure the distribution, not a single answer.</p></div>
            <div className="process-step"><div className="step-num">3</div><h3>Structural Analysis</h3><p>Share-of-Model, Win Rate, Stability Index, Authority Surface, and Knowledge Alignment. Decomposed and scored.</p></div>
            <div className="process-step"><div className="step-num">4</div><h3>Diagnose → Fix → Validate</h3><p>Specific diagnosis with intervention plan. Your team or agency executes. We re-measure at 30 days. Only validated drivers are retained. Unproven hypotheses are discarded. No other tool closes this loop.</p></div>
          </div>
        </div>
      </section>

      {/* ══════ CALLOUT ══════ */}
      <div className="callout section-light">
        <div className="container">
          <p className="callout-text reveal">The average enterprise spends $120k+ on media plans without knowing which channels AI actually cites. <span>One diagnostic audit pays for itself</span> by redirecting the first misallocated budget.</p>
          <div className="callout-line reveal" />
        </div>
      </div>

      {/* ══════ DELIVERABLES ══════ */}
      <section className="section section-dark" id="deliverables">
        <div className="container">
          <div className="section-label reveal">What You Get</div>
          <div className="section-title reveal">Analyst-grade intelligence, not a dashboard to forget</div>
          <p className="section-desc reveal">Visibility dashboards become wallpaper. You log in once, then forget. Your team receives curated reports with structural analysis, specific actions, and validated results.</p>
          <div className="deliv-grid reveal">
            <div className="deliv-card">
              <div className="deliv-tag">Monthly</div>
              <h3>Executive Snapshot</h3>
              <p>One-page briefing for CMO / VP Growth review.</p>
              <div className="mini-mock">
                <div className="mini-mock-row"><div className="mini-mock-label">Share-of-Model<span className="mini-mock-explain">How often AI puts you in Top 3</span></div><div className="mini-mock-value val-up">67% → 72% ↑</div></div>
                <div className="mini-mock-row"><div className="mini-mock-label">Win Rate<span className="mini-mock-explain">How often you&apos;re recommended #1</span></div><div className="mini-mock-value val-neutral">38%</div></div>
                <div className="mini-mock-row"><div className="mini-mock-label">Stability<span className="mini-mock-explain">Variance across repeated runs</span></div><div className="mini-mock-value val-warn">Medium</div></div>
                <div className="mini-mock-row"><div className="mini-mock-label">vs. Top Competitor<span className="mini-mock-explain">Gap to category leader</span></div><div className="mini-mock-value val-down">-4%</div></div>
                <div className="mini-mock-row"><div className="mini-mock-label">Risk Flag<span className="mini-mock-explain">Clusters that need attention</span></div><div className="mini-mock-value val-down">Commerce intent drop</div></div>
              </div>
            </div>
            <div className="deliv-card">
              <div className="deliv-tag">Quarterly</div>
              <h3>Deep Diagnostic Report</h3>
              <p>10-15 page structural decomposition with intervention plan.</p>
              <div className="mini-mock">
                <div className="mini-mock-row"><div className="mini-mock-label">Intent Breakdown<span className="mini-mock-explain">Performance per question type</span></div><div className="mini-mock-value val-neutral">3 clusters</div></div>
                <div className="mini-mock-row"><div className="mini-mock-label">Competitive Analysis<span className="mini-mock-explain">Head-to-head positioning</span></div><div className="mini-mock-value val-neutral">5 competitors</div></div>
                <div className="mini-mock-row"><div className="mini-mock-label">Fact Precision<span className="mini-mock-explain">% of claims AI gets right about you</span></div><div className="mini-mock-value val-warn">71%</div></div>
                <div className="mini-mock-row"><div className="mini-mock-label">Authority Score<span className="mini-mock-explain">How trusted your citation sources are</span></div><div className="mini-mock-value val-up">High</div></div>
                <div className="mini-mock-row"><div className="mini-mock-label">Interventions<span className="mini-mock-explain">Specific actions ranked by impact</span></div><div className="mini-mock-value val-neutral">8 prioritized</div></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════ COMPARISON ══════ */}
      <section className="section section-light">
        <div className="container">
          <div className="section-label reveal">Why Geonyx</div>
          <div className="section-title reveal">Visibility tools tell you the temperature. We diagnose why you&apos;re sick.</div>
          <table className="comp-table reveal">
            <thead><tr><th>What</th><th>Visibility Tools</th><th>Geonyx</th></tr></thead>
            <tbody>
              <tr><td>Methodology</td><td>Single snapshot per prompt</td><td>Multi-run statistical distribution across models</td></tr>
              <tr><td>What you learn</td><td>Mentioned or not mentioned</td><td>Why AI recommends your competitor and what drives it</td></tr>
              <tr><td>Intent analysis</td><td>Flat prompt list</td><td>Discovery / comparison / commerce decomposition</td></tr>
              <tr><td>When a model updates</td><td>New snapshot, no explanation</td><td>Model Update Impact Report: what shifted and why</td></tr>
              <tr><td>Action loop</td><td>Dashboard to check periodically</td><td>Diagnose → intervene → re-measure → validate what worked</td></tr>
              <tr><td>Fact accuracy</td><td>Sentiment score</td><td>Claim-by-claim truth-set validation</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ══════ CTA ══════ */}
      <section className="cta-section section-dark" id="apply">
        <div className="container">
          <div className="cta-inner">
            <div className="cta-left reveal">
              <div className="section-label">Early Access</div>
              <h2>Get a free preliminary scan</h2>
              <p>Apply and receive an AI recommendation scan: your brand vs. 2 competitors, 10 prompts, 2 models. See where you stand before committing to anything.</p>
              <p className="cta-cohort-note">Priority access for B2B companies operating in MENA, EU, and global markets with clear competitive landscapes.</p>
              <div className="cta-after">
                <div className="cta-after-title">After you apply</div>
                <div className="cta-after-steps">
                  <div className="cta-after-step"><div className="cta-after-num">1</div><div>We review your brand and competitive landscape within 48 hours.</div></div>
                  <div className="cta-after-step"><div className="cta-after-num">2</div><div>We run a preliminary AI recommendation scan across 2 models.</div></div>
                  <div className="cta-after-step"><div className="cta-after-num">3</div><div>We share initial findings on a 30-minute call. No commitment needed.</div></div>
                </div>
              </div>
            </div>

            <div className="reveal">
              {formState === 'success' ? (
                <div className="form-success"><p>Application received.</p><span>We&apos;ll review your brand and reach out within 48 hours.</span></div>
              ) : (
                <form ref={formRef} onSubmit={handleSubmit} className="cta-form">
                  <div className="form-row">
                    <div className="form-group"><label className="form-label" htmlFor="name">Name</label><input type="text" className="form-input" id="name" name="name" placeholder="Jane Smith" required /></div>
                    <div className="form-group"><label className="form-label" htmlFor="company">Company</label><input type="text" className="form-input" id="company" name="company" placeholder="Acme Corp" required /></div>
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="email">Work Email</label>
                    <input type="email" className={`form-input${emailError ? ' error' : ''}`} id="email" name="email" placeholder="jane@acme.com" required onInput={() => setEmailError(false)} />
                    {emailError && <div className="form-error">Please enter a valid work email address.</div>}
                  </div>
                  <div className="form-group"><label className="form-label" htmlFor="description">What does your company do?</label><input type="text" className="form-input" id="description" name="description" placeholder="Compliance platform for mid-market fintech" required /></div>
                  <div className="form-group"><label className="form-label" htmlFor="competitors">Top 2-3 competitors</label><input type="text" className="form-input" id="competitors" name="competitors" placeholder="Vanta, Drata, Secureframe" /></div>
                  <input type="text" name="_gotcha" style={{display:'none'}} />
                  {formState === 'error' && <div className="form-error">Something went wrong. Please try again or email us at hello@geonyx.ai</div>}
                  <button type="submit" className="btn-primary form-submit" disabled={formState === 'sending'}>{formState === 'sending' ? 'Sending...' : 'Apply for Free Scan'}</button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ══════ FOOTER ══════ */}
      <footer className="g-footer">
        <div className="container">
          <div className="footer-copy">© 2026 Geonyx. AI Recommendation Intelligence.</div>
          <ul className="footer-links">
            <li><a href="mailto:hello@geonyx.ai">Contact</a></li>
            <li><a href="#">Privacy</a></li>
          </ul>
        </div>
      </footer>

      {/* ══════ BACK TO TOP ══════ */}
      <button className={`back-to-top${showBtt ? ' show' : ''}`} onClick={() => window.scrollTo({top:0,behavior:'smooth'})} aria-label="Back to top">
        <svg viewBox="0 0 24 24" fill="none" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M18 15l-6-6-6 6" /></svg>
      </button>
    </>
  );
}
