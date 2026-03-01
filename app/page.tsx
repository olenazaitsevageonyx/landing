'use client';

import { useEffect, useState, useRef, useCallback } from 'react';

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showBtt, setShowBtt] = useState(false);
  const [formState, setFormState] = useState<'idle' | 'sending' | 'success'>('idle');
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
      await fetch('https://formspree.io/f/mykknngn', { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } });
    } catch { /* graceful fallback */ }
    setFormState('success');
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
            <h1 className="anim d2">AI recommends your <em>competitors</em>. Nobody on your team is measuring it.</h1>
            <p className="hero-sub anim d3">A buyer asks ChatGPT for the best solution in your category. Your competitor is first. You&apos;re third, or not mentioned at all. This happens thousands of times a day, and nobody on your team sees it.</p>
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

            <div className="mock-footer">GPT-4o + Claude 3.5 · 5 runs each · 30 days between measurements</div>
          </div>
        </div>
      </section>

      {/* ══════ STATS ══════ */}
      <section className="stat-bar">
        <div className="container">
          <div className="anim d2"><div className="stat-number">65%</div><div className="stat-label">of searches end without a click. Users get answers directly from AI.</div><div className="stat-source">Source: SparkToro / Datos, 2024</div></div>
          <div className="anim d3"><div className="stat-number">3+</div><div className="stat-label">major models form recommendations differently for the exact same query.</div></div>
          <div className="anim d4"><div className="stat-number">0</div><div className="stat-label">tools measure recommendation stability across runs, models, and intents.</div></div>
        </div>
      </section>

      <div className="social-proof"><div className="container"><div className="proof-dot" /><div className="proof-text">Private beta. Working with select B2B companies in blockchain infrastructure and venture capital.</div></div></div>

      {/* ══════ PROBLEM ══════ */}
      <section className="section section-light" id="problem">
        <div className="container">
          <div className="section-label reveal">The Problem</div>
          <div className="problem-grid">
            <div>
              <div className="section-title reveal">Tracking mentions isn&apos;t the problem. Understanding the structure behind recommendations is.</div>
              <p className="section-desc reveal" style={{marginBottom:32}}>Your competitor shows up first in ChatGPT, Gemini, and Claude. You don&apos;t know why, and you can&apos;t change what you can&apos;t measure.</p>
              <div className="problem-questions reveal">
                <div className="problem-q">Why does AI recommend my competitor over us?</div>
                <div className="problem-q">Why did our ranking drop after the last model update?</div>
                <div className="problem-q">Why are our facts wrong in comparison prompts?</div>
                <div className="problem-q">Why are we invisible in purchase-intent queries?</div>
              </div>
              <div className="problem-escalation reveal">
                <p><strong>Meanwhile, your teams spend blind.</strong> PR agencies propose media plans without knowing which publications AI trusts. Content teams write for keywords that AI answers directly. Budgets go to channels that no longer influence how buyers discover you.</p>
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
              <h3>Validate media spend against what regional AI models actually trust</h3>
              <p>Regional models like Jais and Falcon work exclusively with authorized, locally vetted sources. LinkedIn content is not indexed by most sovereign LLMs. A $40k LinkedIn thought leadership campaign in UAE may have zero influence on AI-mediated recommendations.</p>
              <p>We audit every proposed channel and publication against the authority sources that regional and global models actually cite. Down to specific journalists whose bylines appear in AI training signals.</p>
              <div className="uc-result">Result: redirect spend to channels AI trusts in your target region. Know which journalists to brief, not just which publications to pitch.</div>
            </div>
            <div className="uc-audit-mock">
              <div className="uc-audit-title">Media Plan Authority Audit</div>
              <div className="uc-audit-subtitle">Publication check</div>
              <div className="audit-row"><div className="audit-name">Arabian Business</div><div className="audit-model">Jais · Falcon · GPT-4o</div><div className="audit-status audit-yes">Cited</div></div>
              <div className="audit-row"><div className="audit-name">Gulf News</div><div className="audit-model">Jais · Falcon · GPT-4o</div><div className="audit-status audit-yes">Cited</div></div>
              <div className="audit-row"><div className="audit-name">Forbes Middle East</div><div className="audit-model">GPT-4o · Claude</div><div className="audit-status audit-partial">Partial</div></div>
              <div className="audit-row"><div className="audit-name">LinkedIn (organic)</div><div className="audit-model">Jais · Falcon</div><div className="audit-status audit-no">Not indexed</div></div>
              <div className="audit-row"><div className="audit-name">LinkedIn (sponsored)</div><div className="audit-model">All models</div><div className="audit-status audit-no">Not indexed</div></div>
              <div className="audit-divider" />
              <div className="uc-audit-subtitle">Journalist authority signals</div>
              <div className="audit-journalist-row"><div><span className="audit-journalist-name">Sarah Al-Rashid</span> <span className="audit-journalist-pub">· Arabian Business</span></div><div className="audit-journalist-score audit-yes">High</div></div>
              <div className="audit-journalist-row"><div><span className="audit-journalist-name">Omar Khaled</span> <span className="audit-journalist-pub">· Gulf News Tech</span></div><div className="audit-journalist-score audit-yes">High</div></div>
              <div className="audit-journalist-row"><div><span className="audit-journalist-name">James Thornton</span> <span className="audit-journalist-pub">· Forbes ME</span></div><div className="audit-journalist-score audit-partial">Medium</div></div>
              <div className="audit-footer">Fictional example. Real audits use validated DNS + HTTP citation checks across model responses.</div>
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
          <div className="section-title reveal">Four dimensions of how AI decides</div>
          <p className="section-desc reveal">We don&apos;t track mentions. We decompose the mechanics of why AI models choose one brand over another.</p>
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
          <div className="section-title reveal">Not a snapshot. A statistical measurement.</div>
          <p className="section-desc reveal">Every measurement is versioned. Every run is repeatable. Every shift is explained.</p>
          <div className="process-grid reveal">
            <div className="process-step"><div className="step-num">1</div><h3>Prompt Universe</h3><p>30+ version-controlled prompts across discovery, comparison, and commerce intent. Tailored to your competitive landscape.</p></div>
            <div className="process-step"><div className="step-num">2</div><h3>Multi-Model Runs</h3><p>Multiple models, multiple runs per prompt. We measure the statistical distribution of recommendations, not a single answer.</p></div>
            <div className="process-step"><div className="step-num">3</div><h3>Structural Analysis</h3><p>Share-of-Model, Win Rate, Stability Index, Authority Surface, and Knowledge Alignment. Decomposed and scored.</p></div>
            <div className="process-step"><div className="step-num">4</div><h3>Diagnose, Fix, Validate</h3><p>Specific diagnosis with recommended intervention. Your team or agency executes. We re-measure at 7 and 30 days. Only validated drivers are retained.</p></div>
          </div>
        </div>
      </section>

      {/* ══════ CALLOUT ══════ */}
      <div className="callout section-light">
        <div className="container">
          <p className="callout-text reveal">Your brand&apos;s most important audience <span>can&apos;t click a link</span>. It asks AI for an answer and gets your competitor&apos;s name.</p>
          <div className="callout-line reveal" />
        </div>
      </div>

      {/* ══════ DELIVERABLES ══════ */}
      <section className="section section-dark" id="deliverables">
        <div className="container">
          <div className="section-label reveal">What You Get</div>
          <div className="section-title reveal">Curated intelligence, not a dashboard to forget</div>
          <p className="section-desc reveal">No self-serve login. Your team receives analyst-grade reports with specific actions and clear metrics.</p>
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
          <div className="section-title reveal">What changes with recommendation intelligence</div>
          <table className="comp-table reveal">
            <thead><tr><th>What</th><th>Today</th><th>With Geonyx</th></tr></thead>
            <tbody>
              <tr><td>How you check AI</td><td>Ask ChatGPT manually, once</td><td>30+ prompts, multi-model, statistical distribution</td></tr>
              <tr><td>What you see</td><td>A single answer</td><td>Probability of recommendation across contexts</td></tr>
              <tr><td>Competitive intel</td><td>Anecdotal, inconsistent</td><td>Structured head-to-head with argument analysis</td></tr>
              <tr><td>When a model updates</td><td>You don&apos;t know anything changed</td><td>Model Update Impact Report: what shifted and why</td></tr>
              <tr><td>Agency proposals</td><td>Evaluated on gut feel</td><td>Validated against AI authority and intent data</td></tr>
              <tr><td>Revenue connection</td><td>No AI attribution</td><td>Controlled uplift experiments linking SOM to demand</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ══════ CTA ══════ */}
      <section className="cta-section section-dark" id="apply">
        <div className="container">
          <div className="cta-inner">
            <div className="cta-left reveal">
              <div className="section-label">Founding Cohort</div>
              <h2>We&apos;re selecting 3-5 companies to build this with</h2>
              <p>You get first access to AI recommendation data on your brand, across models, intents, and contexts. We get your feedback to build the right product.</p>
              <p className="cta-cohort-note">Early access is free. We&apos;re looking for B2B companies with clear competitors in English-language markets.</p>
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
              {formState !== 'success' ? (
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
                  <button type="submit" className="btn-primary form-submit" disabled={formState === 'sending'}>{formState === 'sending' ? 'Sending...' : 'Apply for Early Access'}</button>
                </form>
              ) : (
                <div className="form-success"><p>Application received.</p><span>We&apos;ll review your brand and reach out within 48 hours.</span></div>
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
