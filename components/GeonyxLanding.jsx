'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

// Paste your Formspree form endpoint here to receive requests by email, e.g.
// 'https://formspree.io/f/abcdwxyz'. Leave empty to just show the success state.
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mykknngn';

const css = `
:root{
  --bg:#FFFFFF; --paper:#FAFAF8; --ink:#141414; --mut:#6B6B6B; --faint:#9A9A9A;
  --line:#E7E4DE; --grid:rgba(20,20,20,.045); --accent:#5F9AA2; --accent-soft:#EAF3F4;
  --ok-bg:#EAF3EC; --ok-fg:#2E6B43; --am-bg:#FBF3E2; --am-fg:#8A6D2F;
  --panel:#0E1417; --panel-2:#121A1E; --panel-line:#22312F; --panel-ink:#CBD6D5; --panel-mut:#6E8484;
  --panel-accent:#7FD4DE; --p-ok:#6FCF97; --p-am:#E2C275; --p-no:#E0897E;
  --mono:var(--font-mono),ui-monospace,SFMono-Regular,Menlo,monospace;
}
*,*::before,*::after{margin:0;padding:0;box-sizing:border-box;}
html{scroll-behavior:smooth;}
body{font-family:var(--font-inter),system-ui,sans-serif;background:var(--bg);color:var(--ink);-webkit-font-smoothing:antialiased;line-height:1.6;}
.gx-wrap{overflow-x:hidden;}
.gx-c{max-width:1080px;margin:0 auto;padding:0 32px;}
@media(max-width:640px){.gx-c{padding:0 20px;}}

.gx-eyebrow{font-family:var(--mono);font-size:11px;letter-spacing:2px;text-transform:uppercase;color:var(--accent);font-weight:500;}
.gx-rule{height:1.5px;width:44px;background:var(--ink);margin:14px 0 0;}
.gx-mono{font-family:var(--mono);}
.gx-fig{font-family:var(--mono);font-size:10px;letter-spacing:1.5px;text-transform:uppercase;color:var(--faint);}

@keyframes gx-up{from{opacity:0;transform:translateY(16px);}to{opacity:1;transform:translateY(0);}}
@keyframes gx-blink{0%,100%{opacity:1;}50%{opacity:.25;}}
.gx-rev{opacity:0;}
.gx-rev.gx-in{animation:gx-up .7s cubic-bezier(.22,.61,.36,1) forwards;}
@media(prefers-reduced-motion:reduce){.gx-rev{opacity:1;animation:none;}}

.gx-nav{position:sticky;top:0;z-index:50;background:rgba(255,255,255,.86);backdrop-filter:blur(12px);border-bottom:1px solid var(--line);}
.gx-nav .gx-c{display:flex;align-items:center;justify-content:space-between;height:64px;}
.gx-logo{font-weight:700;letter-spacing:3px;font-size:15px;cursor:pointer;}
.gx-logo b{color:var(--accent);}
.gx-navlinks{display:flex;gap:28px;align-items:center;}
.gx-navlinks a{font-size:13px;color:var(--mut);text-decoration:none;cursor:pointer;transition:color .2s;}
.gx-navlinks a:hover{color:var(--ink);}
.gx-btn{display:inline-block;border:none;cursor:pointer;font-family:inherit;font-size:13px;font-weight:600;
  padding:11px 22px;background:var(--ink);color:#fff;border-radius:999px;text-decoration:none;transition:background .2s;}
.gx-btn:hover{background:var(--accent);}
.gx-btn-ghost{background:transparent;color:var(--ink);border:1px solid var(--line);}
.gx-btn-ghost:hover{border-color:var(--accent);color:var(--accent);}
@media(max-width:820px){.gx-navlinks a:not(.gx-btn){display:none;}}

.gx-hero{padding:90px 0 78px;}
.gx-hero-grid{display:grid;grid-template-columns:1.12fr .88fr;gap:60px;align-items:center;}
.gx-h1{font-size:clamp(33px,4.4vw,52px);line-height:1.08;letter-spacing:-1.4px;font-weight:600;margin:22px 0 22px;}
.gx-h1 i{font-style:normal;color:var(--accent);}
.gx-lead{font-size:17px;color:var(--mut);line-height:1.65;max-width:480px;margin-bottom:26px;}
.gx-telemetry{font-family:var(--mono);font-size:11.5px;color:var(--faint);letter-spacing:.3px;margin-bottom:30px;line-height:1.9;}
.gx-telemetry b{color:var(--ink);font-weight:600;}
.gx-hero-actions{display:flex;gap:12px;flex-wrap:wrap;}
@media(max-width:880px){.gx-hero-grid{grid-template-columns:1fr;gap:40px;}}

.gx-card{background:var(--paper);border:1px solid var(--line);border-radius:14px;padding:24px;}
.gx-card-top{display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;}
.gx-card-q{font-size:12.5px;color:var(--mut);background:#fff;border:1px solid var(--line);border-radius:8px;padding:11px 13px;margin-bottom:18px;line-height:1.45;}
.gx-card-q span{color:var(--faint);}
.gx-lens-tag{font-family:var(--mono);font-size:10px;letter-spacing:1px;text-transform:uppercase;color:var(--accent);border:1px solid var(--accent-soft);background:var(--accent-soft);padding:3px 8px;border-radius:6px;}
.gx-row{display:flex;align-items:center;gap:10px;margin-bottom:11px;}
.gx-rk{font-family:var(--mono);font-size:11px;font-weight:500;color:var(--faint);width:14px;}
.gx-rname{font-size:13px;font-weight:500;width:108px;flex-shrink:0;}
.gx-track{height:6px;background:#ECEAE4;border-radius:5px;overflow:hidden;flex:1;}
.gx-fill{height:100%;border-radius:5px;background:#C9C6BF;}
.gx-rval{font-family:var(--mono);font-size:12px;font-weight:500;width:30px;text-align:right;}
.gx-row.gx-you .gx-rname{color:var(--accent);} .gx-row.gx-you .gx-fill{background:var(--accent);} .gx-row.gx-you .gx-rval{color:var(--accent);}
.gx-card-foot{margin-top:16px;padding-top:13px;border-top:1px solid var(--line);font-family:var(--mono);font-size:10.5px;color:var(--faint);}

.gx-sec{padding:84px 0;}
.gx-sec-light{background:var(--paper);}
.gx-sec-head{max-width:640px;margin-bottom:46px;}
.gx-h2{font-size:clamp(24px,3vw,34px);line-height:1.18;letter-spacing:-.8px;font-weight:600;margin:16px 0 14px;}
.gx-sub{font-size:15px;color:var(--mut);line-height:1.65;}

.gx-scope{display:grid;grid-template-columns:1fr 1fr;gap:1px;background:var(--line);border:1px solid var(--line);border-radius:14px;overflow:hidden;}
.gx-scope-item{background:var(--bg);padding:28px 28px 30px;}
.gx-scope-item h3{font-size:17px;font-weight:600;letter-spacing:-.2px;margin-bottom:9px;}
.gx-scope-item p{font-size:14px;color:var(--mut);line-height:1.6;}
.gx-tag{display:inline-block;font-family:var(--mono);font-size:10px;font-weight:500;letter-spacing:1px;text-transform:uppercase;color:var(--accent);margin-bottom:13px;}
@media(max-width:720px){.gx-scope{grid-template-columns:1fr;}}
.gx-value{display:grid;grid-template-columns:repeat(4,1fr);gap:26px;margin-top:50px;}
.gx-value div{font-size:13.5px;color:var(--ink);line-height:1.5;padding-top:15px;border-top:2px solid var(--accent);}
.gx-value b{display:block;font-size:12px;letter-spacing:.3px;margin-bottom:5px;}
@media(max-width:720px){.gx-value{grid-template-columns:1fr 1fr;gap:18px;}}

.gx-sys{position:relative;background:var(--paper);
  background-image:linear-gradient(var(--grid) 1px,transparent 1px),linear-gradient(90deg,var(--grid) 1px,transparent 1px);
  background-size:30px 30px;padding:84px 0;}
.gx-sys-corner{position:absolute;top:18px;right:32px;}
.gx-pipe{display:flex;flex-wrap:wrap;align-items:stretch;gap:8px;margin-top:8px;}
.gx-node{flex:1 1 120px;min-width:118px;background:var(--bg);border:1px solid var(--line);border-radius:9px;padding:13px 13px 14px;}
.gx-node .gx-nidx{font-family:var(--mono);font-size:10px;color:var(--accent);letter-spacing:1px;}
.gx-node .gx-ntitle{font-size:12.5px;font-weight:600;margin:4px 0 5px;line-height:1.25;}
.gx-node .gx-nio{font-family:var(--mono);font-size:9.5px;color:var(--faint);line-height:1.45;}
.gx-arrow{align-self:center;color:var(--accent);font-family:var(--mono);font-size:14px;flex:0 0 auto;}
@media(max-width:720px){.gx-arrow{transform:rotate(90deg);width:100%;text-align:center;}.gx-node{flex-basis:100%;}}

.gx-tech-grid{display:grid;grid-template-columns:1fr 1fr;gap:18px;margin-top:34px;}
@media(max-width:760px){.gx-tech-grid{grid-template-columns:1fr;}}
.gx-panel{background:var(--panel);border:1px solid var(--panel-line);border-radius:12px;padding:20px 22px;font-family:var(--mono);color:var(--panel-ink);}
.gx-panel-h{display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;}
.gx-panel-h .gx-plabel{font-size:10px;letter-spacing:1.5px;text-transform:uppercase;color:var(--panel-mut);}
.gx-panel-h .gx-pdot{font-size:10px;color:var(--panel-accent);}
.gx-code{font-size:12px;line-height:1.85;white-space:pre;overflow-x:auto;color:var(--panel-ink);}
.gx-code .c{color:var(--panel-mut);}
.gx-code .a{color:var(--panel-accent);}
.gx-code .v{color:var(--p-ok);}
.gx-panel-note{margin-top:14px;padding-top:12px;border-top:1px solid var(--panel-line);font-size:10px;color:var(--panel-mut);letter-spacing:.3px;}

.gx-probe{background:var(--panel);border:1px solid var(--panel-line);border-radius:14px;overflow:hidden;}
.gx-probe-bar{display:flex;align-items:center;gap:12px;padding:16px 20px;border-bottom:1px solid var(--panel-line);background:var(--panel-2);flex-wrap:wrap;}
.gx-probe-bar .gx-plabel{font-family:var(--mono);font-size:10px;letter-spacing:1.5px;text-transform:uppercase;color:var(--panel-mut);}
.gx-probe-input{flex:1;min-width:160px;background:#0A1012;border:1px solid var(--panel-line);border-radius:8px;color:var(--panel-ink);
  font-family:var(--mono);font-size:13px;padding:9px 12px;outline:none;}
.gx-probe-input:focus{border-color:var(--panel-accent);}
.gx-probe-run{border:none;cursor:pointer;background:var(--panel-accent);color:#06232A;font-family:var(--mono);font-weight:600;
  font-size:12px;letter-spacing:.5px;padding:9px 18px;border-radius:8px;transition:opacity .2s;}
.gx-probe-run:hover{opacity:.85;}
.gx-probe-body{padding:14px 20px 4px;}
.gx-prow{display:grid;grid-template-columns:142px 64px 1fr auto;gap:10px;align-items:center;font-family:var(--mono);
  font-size:12px;padding:8px 0;border-bottom:1px solid rgba(255,255,255,.04);}
.gx-pname{color:var(--panel-ink);font-weight:500;}
.gx-plens{font-size:9.5px;letter-spacing:.5px;text-transform:uppercase;color:var(--panel-mut);}
.gx-pstatus{font-size:11px;letter-spacing:.3px;}
.gx-s-queued{color:var(--panel-mut);}
.gx-s-querying{color:var(--p-am);animation:gx-blink 1s infinite;}
.gx-s-done{color:var(--panel-mut);}
.gx-presult{display:flex;gap:8px;align-items:center;justify-content:flex-end;font-size:11px;}
.gx-chip{font-size:10px;padding:2px 7px;border-radius:5px;letter-spacing:.3px;}
.gx-chip-rec{background:rgba(111,207,151,.14);color:var(--p-ok);}
.gx-chip-no{background:rgba(224,137,126,.14);color:var(--p-no);}
.gx-chip-vp{background:rgba(127,212,222,.12);color:var(--panel-accent);}
.gx-chip-conf{background:rgba(226,194,117,.14);color:var(--p-am);}
.gx-probe-agg{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;padding:18px 20px;border-top:1px solid var(--panel-line);background:var(--panel-2);}
.gx-agg b{display:block;font-family:var(--mono);font-size:9.5px;letter-spacing:1px;text-transform:uppercase;color:var(--panel-mut);margin-bottom:5px;}
.gx-agg .gx-num{font-family:var(--mono);font-size:24px;font-weight:600;color:var(--panel-accent);letter-spacing:-.5px;}
.gx-agg .gx-num.muted{color:var(--panel-ink);}
.gx-probe-foot{padding:12px 20px;font-family:var(--mono);font-size:10px;color:var(--panel-mut);letter-spacing:.3px;border-top:1px solid var(--panel-line);}
@media(max-width:560px){.gx-prow{grid-template-columns:1fr auto;}.gx-plens{display:none;}.gx-probe-agg{grid-template-columns:1fr 1fr;}}

.gx-coop{display:grid;grid-template-columns:1fr 1fr;gap:58px;align-items:start;}
.gx-coop-note{font-size:14px;color:var(--mut);line-height:1.7;margin-top:18px;}
.gx-steps{list-style:none;margin-top:24px;}
.gx-steps li{display:flex;gap:14px;font-size:14px;color:var(--ink);margin-bottom:13px;line-height:1.5;}
.gx-steps li b{color:var(--accent);flex-shrink:0;font-weight:700;font-family:var(--mono);}
.gx-form{background:var(--paper);border:1px solid var(--line);border-radius:14px;padding:26px;}
.gx-field{margin-bottom:15px;}
.gx-field label{display:block;font-family:var(--mono);font-size:10px;letter-spacing:.5px;text-transform:uppercase;color:var(--mut);font-weight:500;margin-bottom:6px;}
.gx-field input,.gx-field textarea{width:100%;font-family:inherit;font-size:14px;color:var(--ink);background:#fff;
  border:1px solid var(--line);border-radius:8px;padding:11px 13px;outline:none;transition:border-color .2s;}
.gx-field input:focus,.gx-field textarea:focus{border-color:var(--accent);}
.gx-field textarea{resize:vertical;min-height:62px;}
.gx-2{display:grid;grid-template-columns:1fr 1fr;gap:13px;}
.gx-submit{width:100%;margin-top:4px;text-align:center;}
.gx-success{text-align:center;padding:28px 14px;}
.gx-tick{width:42px;height:42px;border-radius:50%;background:var(--ok-bg);color:var(--ok-fg);display:flex;align-items:center;justify-content:center;font-size:20px;margin:0 auto 13px;}
.gx-success h4{font-size:16px;font-weight:600;margin-bottom:6px;}
.gx-success p{font-size:13.5px;color:var(--mut);line-height:1.6;}
@media(max-width:820px){.gx-coop{grid-template-columns:1fr;gap:38px;}}

.gx-diff{display:flex;flex-wrap:wrap;gap:10px;margin-top:6px;}
.gx-diff span{font-family:var(--mono);font-size:11px;letter-spacing:.5px;color:var(--ink);
  border:1px solid var(--line);border-radius:999px;padding:8px 14px;background:var(--paper);}
.gx-diff span:nth-child(3),.gx-diff span:nth-child(5){border-color:var(--accent);color:var(--accent);}
.gx-foot{padding:38px 0;border-top:1px solid var(--line);}
.gx-foot .gx-c{display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:14px;}
.gx-foot-l{font-family:var(--mono);font-size:11px;color:var(--faint);letter-spacing:.3px;}
.gx-foot-r{display:flex;gap:22px;}
.gx-foot-r a{font-size:12px;color:var(--mut);text-decoration:none;cursor:pointer;}
.gx-foot-r a:hover{color:var(--accent);}
`;

const MODELS = [
  { id: 'chatgpt', name: 'ChatGPT', lens: 'global', search: true },
  { id: 'gemini', name: 'Gemini', lens: 'global', search: true },
  { id: 'perplexity', name: 'Perplexity', lens: 'global', search: true },
  { id: 'claude', name: 'Claude', lens: 'global', search: true },
  { id: 'qwen', name: 'Qwen', lens: 'regional', search: true },
  { id: 'falcon', name: 'Falcon-H1-Arabic', lens: 'regional', search: false },
  { id: 'jais', name: 'Jais', lens: 'regional', search: false },
];

function hashStr(s) { let h = 2166136261; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }
function rnd(seed) { const x = Math.sin(seed) * 43758.5453; return x - Math.floor(x); }

function simulate(entity) {
  const seed = hashStr((entity || 'Acme').toLowerCase()) % 100000;
  return MODELS.map((m, i) => {
    const r = rnd(seed + i * 97.13);
    const r2 = rnd(seed * 1.7 + i * 13.7);
    let recognized, vp, fab = false;
    if (m.search) {
      recognized = r > 0.12;
      vp = recognized ? (r > 0.5 ? 3 : 2) : 0;
    } else {
      recognized = r > 0.45;
      fab = recognized ? r2 < 0.55 : r2 < 0.4;
      vp = !recognized ? 0 : (fab ? 1 : 2);
    }
    return { ...m, recognized, vp, fab };
  });
}
function aggregate(sim) {
  const mean = (a) => (a.length ? a.reduce((x, y) => x + y, 0) / a.length : 0);
  const g = sim.filter((m) => m.lens === 'global').map((m) => m.vp);
  const r = sim.filter((m) => m.lens === 'regional').map((m) => m.vp);
  const all = sim.map((m) => m.vp);
  const mu = mean(all) || 0.0001;
  const sd = Math.sqrt(mean(all.map((v) => (v - mu) ** 2)));
  const CV = sd / mu;
  const G = Math.round((mean(g) / 3) * 100);
  const R = Math.round((mean(r) / 3) * 100);
  const S = Math.round(100 * Math.exp(-1.5 * CV));
  const idx = Math.round(0.4 * G + 0.35 * R + 0.25 * S);
  return { G, R, S, idx };
}

export default function GeonyxLanding() {
  const [form, setForm] = useState({ name: '', company: '', email: '', does: '', field: '' });
  const [sent, setSent] = useState(false);
  const [entity, setEntity] = useState('Acme Compliance');
  const [rows, setRows] = useState(MODELS.map((m) => ({ ...m, status: 'queued' })));
  const [agg, setAgg] = useState(null);
  const timers = useRef([]);

  const clearTimers = () => { timers.current.forEach(clearTimeout); timers.current = []; };

  const run = useCallback((ent) => {
    clearTimers();
    const e = (ent ?? entity) || 'Acme Compliance';
    const sim = simulate(e);
    setRows(sim.map((m) => ({ ...m, status: 'queued' })));
    setAgg(null);
    const reduce = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const step = reduce ? 0 : 330;
    sim.forEach((m, i) => {
      timers.current.push(setTimeout(() => setRows((p) => p.map((r, j) => (j === i ? { ...m, status: 'querying' } : r))), step * i + 1));
      timers.current.push(setTimeout(() => setRows((p) => p.map((r, j) => (j === i ? { ...m, status: 'done' } : r))), step * i + (reduce ? 1 : 230)));
    });
    timers.current.push(setTimeout(() => setAgg(aggregate(sim)), step * sim.length + (reduce ? 2 : 250)));
  }, [entity]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && e.target.classList.add('gx-in')),
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    document.querySelectorAll('.gx-rev').forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  useEffect(() => { run('Acme Compliance'); return clearTimers; }, []); // eslint-disable-line

  const go = useCallback((id) => {
    const el = document.querySelector(id);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - 64, behavior: 'smooth' });
  }, []);
  const submit = async () => {
    if (!form.name || !form.email) return;
    if (FORMSPREE_ENDPOINT) {
      try {
        await fetch(FORMSPREE_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(form),
        });
      } catch (e) { /* show success regardless; wire monitoring if needed */ }
    }
    setSent(true);
  };
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  return (
    <div className="gx-wrap">
      <style>{css}</style>

      <nav className="gx-nav">
        <div className="gx-c">
          <div className="gx-logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>GEONYX<b>.</b></div>
          <div className="gx-navlinks">
            <a onClick={() => go('#what')}>What we do</a>
            <a onClick={() => go('#own')}>Methodology</a>
            <a onClick={() => go('#scope')}>Who we work with</a>
            <a onClick={() => go('#system')}>System</a>
            <a onClick={() => go('#probe')}>Live probe</a>
            <a className="gx-btn" onClick={() => go('#request')}>Request collaboration</a>
          </div>
        </div>
      </nav>

      <header className="gx-hero">
        <div className="gx-c gx-hero-grid">
          <div className="gx-rev gx-in">
            <div className="gx-eyebrow">AI Recommendation Intelligence</div>
            <h1 className="gx-h1">AI recommends your competitors. We measure <i>why</i>, and which sources AI trusts.</h1>
            <p className="gx-lead">A U.S. AI recommendation-intelligence company. We instrument how models recognize, recommend and cite entities, across global and sovereign systems, and quantify what to change.</p>
            <div className="gx-telemetry">
              <b>models</b> 7 &nbsp;·&nbsp; <b>lenses</b> 2 &nbsp;·&nbsp; <b>runs/probe</b> K&ge;5<br />
              <b>signals/probe</b> ~40 &nbsp;·&nbsp; <b>infra</b> dedicated GPU
            </div>
            <div className="gx-hero-actions">
              <button className="gx-btn" onClick={() => go('#probe')}>See a probe run</button>
              <button className="gx-btn gx-btn-ghost" onClick={() => go('#request')}>Request collaboration</button>
            </div>
          </div>

          <div className="gx-rev gx-in gx-card" aria-hidden="true">
            <div className="gx-card-top">
              <span className="gx-fig">Fig.00 — recommendation share</span>
              <span className="gx-lens-tag">commerce intent</span>
            </div>
            <div className="gx-card-q"><span>buyer asks AI:</span> &ldquo;best compliance platform for a mid-market fintech?&rdquo;</div>
            {[['1', 'Competitor A', 82, false], ['2', 'Competitor B', 64, false], ['5', 'You', 28, true]].map(([k, n, w, you]) => (
              <div className={`gx-row${you ? ' gx-you' : ''}`} key={n}>
                <span className="gx-rk">{k}</span><span className="gx-rname">{n}</span>
                <span className="gx-track"><span className="gx-fill" style={{ width: `${w}%` }} /></span>
                <span className="gx-rval">{w}</span>
              </div>
            ))}
            <div className="gx-card-foot">illustrative · global + regional models · multiple runs each</div>
          </div>
        </div>
      </header>

      <section className="gx-sec gx-sec-light" id="what">
        <div className="gx-c">
          <div className="gx-sec-head gx-rev">
            <div className="gx-eyebrow">What we do</div>
            <div className="gx-rule" />
            <h2 className="gx-h2">Most tools tell you whether AI mentions you. We tell you why it chooses someone else.</h2>
            <p className="gx-sub">We quantify where you are invisible across the buying journey, which sources AI treats as authoritative, and what specifically moves the recommendation. Across many models and repeated runs, in both a global and a regional lens. Curated diagnostics, backed by a measurement engine, not a dashboard you log into once and forget.</p>
          </div>
        </div>
      </section>


      <section className="gx-sec" id="own">
        <div className="gx-c">
          <div className="gx-sec-head gx-rev" style={{ maxWidth: 720 }}>
            <div className="gx-eyebrow">Our own methodology, index and data</div>
            <div className="gx-rule" />
            <h2 className="gx-h2">Not SEO. Not a visibility dashboard. A measurement discipline of our own.</h2>
            <p className="gx-sub">We built a proprietary methodology, our own scoring index, and our own multi-model dataset that grows with every scan. We sit at the intersection of measurement and strategy: we read how AI describes you, then connect it directly to your goals, your audiences and your competitors. The depth, the parallels and the index are ours, and they are not something a visibility tool can reproduce.</p>
          </div>
          <div className="gx-diff gx-rev">
            <span>Not SEO</span><span>Not a visibility dashboard</span><span>Proprietary index</span>
            <span>Multi-model + sovereign</span><span>Tied to your goals</span>
          </div>
        </div>
      </section>

      <section className="gx-sec" id="scope">
        <div className="gx-c">
          <div className="gx-sec-head gx-rev">
            <div className="gx-eyebrow">Who we work with</div>
            <div className="gx-rule" />
            <h2 className="gx-h2">Organizations whose reputation is now shaped by AI.</h2>
            <p className="gx-sub">A focused set of B2B organizations in competitive or regulated categories, where how AI describes you carries real weight.</p>
          </div>
          <div className="gx-scope gx-rev">
            <div className="gx-scope-item"><span className="gx-tag">Brands &amp; enterprises</span><h3>Companies in competitive categories</h3><p>See why AI recommends a competitor, where you disappear in purchase-intent queries, and what specifically moves the ranking.</p></div>
            <div className="gx-scope-item"><span className="gx-tag">Communications &amp; PR</span><h3>In-house teams and their agencies</h3><p>Validate media plans, publications and placements against the sources AI actually cites, before you commit budget.</p></div>
            <div className="gx-scope-item"><span className="gx-tag">Institutions &amp; government</span><h3>Bodies that need a defensible read</h3><p>Understand what AI says about you and your sector, with sources verified and reproducible enough to stand behind.</p></div>
            <div className="gx-scope-item"><span className="gx-tag">Gulf &amp; MENA</span><h3>Regional and sovereign-AI users</h3><p>Diagnostics across sovereign and Arabic models such as Falcon, Jais and Qwen, run on dedicated GPU infrastructure. Coverage no API-only tool can offer.</p></div>
          </div>
          <div className="gx-value gx-rev">
            <div><b>The why, not mentions</b>We decompose the reasons behind a ranking.</div>
            <div><b>Multi-model, multi-run</b>A distribution across models, never one answer.</div>
            <div><b>Sovereign coverage</b>Falcon, Jais and Qwen on dedicated GPU.</div>
            <div><b>Validated change</b>Diagnose, you act, we re-measure and confirm.</div>
          </div>
        </div>
      </section>

      <section className="gx-sys" id="system">
        <div className="gx-sys-corner gx-fig">Fig.01 — pipeline</div>
        <div className="gx-c">
          <div className="gx-sec-head gx-rev">
            <div className="gx-eyebrow">The system behind the score</div>
            <div className="gx-rule" />
            <h2 className="gx-h2">A measurement engine, not a survey.</h2>
            <p className="gx-sub">Each score is the output of a versioned pipeline. The stages below show the data flow. The prompts, scoring rules and calibrated weights are proprietary and stay with GEONYX.</p>
          </div>

          <div className="gx-pipe gx-rev">
            {[
              ['01', 'Prompt universe', 'in: intents, EN/AR'],
              ['02', 'Multi-run exec', 'M models × K runs'],
              ['03', 'Parser', 'LLM → JSON'],
              ['04', 'Signal extraction', '~40 signals/probe'],
              ['05', 'Confabulation filter', 'real vs fabricated'],
              ['06', 'Authority validation', 'DNS / known-works'],
              ['07', 'Composite index', 'out: 0–100 + components'],
            ].map((n, i, arr) => (
              <Node key={n[0]} n={n} last={i === arr.length - 1} />
            ))}
          </div>

          <div className="gx-tech-grid gx-rev">
            <div className="gx-panel">
              <div className="gx-panel-h"><span className="gx-plabel">metrics · selected</span><span className="gx-pdot">§ scoring</span></div>
              <div className="gx-code">{`vp(probe)    = rule(recognition, accuracy, citation)  ∈ {0,1,2,3}
Visibility_L = 100/3 · mean_k( vp )          per lens L
Stability    = 100 · e^(−λ · CV)     CV = σ_rank / μ_rank
Gap          = Visibility_global − Visibility_regional
Index        = Σ wᵢ · normᵢ          `}<span className="c">{`// weights proprietary`}</span></div>
              <div className="gx-panel-note">λ, weights and rules calibrated on real scans. Not disclosed.</div>
            </div>
            <div className="gx-panel">
              <div className="gx-panel-h"><span className="gx-plabel">parser output · one probe</span><span className="gx-pdot">§ schema</span></div>
              <div className="gx-code">{`{
  `}<span className="a">&quot;entity&quot;</span>{`: `}<span className="v">&quot;Acme Compliance&quot;</span>{`,
  `}<span className="a">&quot;model&quot;</span>{`:  `}<span className="v">&quot;gpt-4o-2024-08-06&quot;</span>{`,
  `}<span className="a">&quot;lens&quot;</span>{`:   `}<span className="v">&quot;global&quot;</span>{`,  `}<span className="a">&quot;run&quot;</span>{`: `}<span className="v">4</span>{`,
  `}<span className="a">&quot;signals&quot;</span>{`: {
    `}<span className="a">&quot;recognized&quot;</span>{`: `}<span className="v">true</span>{`,  `}<span className="a">&quot;outlet_ok&quot;</span>{`: `}<span className="v">true</span>{`,
    `}<span className="a">&quot;articles_offered&quot;</span>{`: `}<span className="v">3</span>{`,
    `}<span className="a">&quot;articles_verified&quot;</span>{`: `}<span className="v">2</span>{`,
    `}<span className="a">&quot;fabrication&quot;</span>{`: `}<span className="v">false</span>{`
  },
  `}<span className="a">&quot;vp&quot;</span>{`: `}<span className="v">3</span>{`
}`}</div>
              <div className="gx-panel-note">Every response is reduced to structured signals before scoring.</div>
            </div>
          </div>
        </div>
      </section>

      <section className="gx-sec" id="probe">
        <div className="gx-c">
          <div className="gx-sec-head gx-rev">
            <div className="gx-eyebrow">Live probe</div>
            <div className="gx-rule" />
            <h2 className="gx-h2">Watch one probe run across the model set.</h2>
            <p className="gx-sub">Type an entity and run a single probe. Each model is queried, parsed and scored, then reconciled into a visibility read. This is an illustrative simulation of the pipeline. Live engagements run real models on dedicated GPU infrastructure, under NDA.</p>
          </div>

          <div className="gx-probe gx-rev">
            <div className="gx-probe-bar">
              <span className="gx-plabel">probe · entity</span>
              <input className="gx-probe-input" value={entity} onChange={(e) => setEntity(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && run()} placeholder="Type a brand or company" />
              <button className="gx-probe-run" onClick={() => run()}>RUN ▸</button>
            </div>
            <div className="gx-probe-body">
              {rows.map((r) => (
                <div className="gx-prow" key={r.id}>
                  <span className="gx-pname">{r.name}</span>
                  <span className="gx-plens">{r.lens}{r.search ? '' : ' · no-search'}</span>
                  <span className={`gx-pstatus gx-s-${r.status}`}>
                    {r.status === 'queued' ? 'queued' : r.status === 'querying' ? 'querying ·· parsing' : 'scored'}
                  </span>
                  <span className="gx-presult">
                    {r.status === 'done' && (
                      <>
                        <span className={`gx-chip ${r.recognized ? 'gx-chip-rec' : 'gx-chip-no'}`}>{r.recognized ? 'REC ✓' : 'REC ✗'}</span>
                        <span className="gx-chip gx-chip-vp">vp {r.vp}</span>
                        {r.fab && <span className="gx-chip gx-chip-conf">CONF</span>}
                      </>
                    )}
                  </span>
                </div>
              ))}
            </div>
            <div className="gx-probe-agg">
              <div className="gx-agg"><b>Global vis</b><span className="gx-num">{agg ? agg.G : '··'}</span></div>
              <div className="gx-agg"><b>Regional vis</b><span className="gx-num">{agg ? agg.R : '··'}</span></div>
              <div className="gx-agg"><b>Stability</b><span className="gx-num muted">{agg ? agg.S : '··'}</span></div>
              <div className="gx-agg"><b>Index</b><span className="gx-num">{agg ? agg.idx : '··'}</span></div>
            </div>
            <div className="gx-probe-foot">illustrative simulation · single probe · real engagements use K≥5 runs per model on dedicated GPU infrastructure</div>
          </div>
        </div>
      </section>

      <section className="gx-sec gx-sec-light" id="request">
        <div className="gx-c gx-coop">
          <div className="gx-rev">
            <div className="gx-eyebrow">Cooperation by request</div>
            <div className="gx-rule" />
            <h2 className="gx-h2">We work with a few organizations at a time.</h2>
            <p className="gx-coop-note">Every engagement begins with a request and a scoped diagnostic of your AI visibility. We review each request personally. If it is a fit, we move to a full assessment, under NDA.</p>
            <ul className="gx-steps">
              <li><b>01</b><span>Send a request with your company and competitive field.</span></li>
              <li><b>02</b><span>We run a scoped visibility scan and share what we find.</span></li>
              <li><b>03</b><span>If it is a fit, we agree on scope and begin, under NDA.</span></li>
            </ul>
          </div>
          <div className="gx-rev">
            {!sent ? (
              <div className="gx-form">
                <div className="gx-2">
                  <div className="gx-field"><label>Name</label><input value={form.name} onChange={set('name')} placeholder="Your name" /></div>
                  <div className="gx-field"><label>Company</label><input value={form.company} onChange={set('company')} placeholder="Company" /></div>
                </div>
                <div className="gx-field"><label>Work email</label><input type="email" value={form.email} onChange={set('email')} placeholder="you@company.com" /></div>
                <div className="gx-field"><label>What your company does</label><input value={form.does} onChange={set('does')} placeholder="One line is enough" /></div>
                <div className="gx-field"><label>Main competitors or region</label><textarea value={form.field} onChange={set('field')} placeholder="e.g. UAE / GCC, or two or three competitors" /></div>
                <button className="gx-btn gx-submit" onClick={submit}>Send request</button>
              </div>
            ) : (
              <div className="gx-form gx-success">
                <div className="gx-tick">✓</div>
                <h4>Request received</h4>
                <p>We read every request and reply within a few days. If it is a fit, we will share a scoped diagnostic of your AI visibility.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <footer className="gx-foot">
        <div className="gx-c">
          <div className="gx-foot-l">© 2026 GEONYX · AI Recommendation Intelligence · United States</div>
          <div className="gx-foot-r">
            <a href="mailto:hello@geonyx.ai">hello@geonyx.ai</a>
            <a onClick={() => go('#request')}>Request collaboration</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function Node({ n, last }) {
  return (
    <>
      <div className="gx-node">
        <div className="gx-nidx">{n[0]}</div>
        <div className="gx-ntitle">{n[1]}</div>
        <div className="gx-nio">{n[2]}</div>
      </div>
      {!last && <span className="gx-arrow">&rarr;</span>}
    </>
  );
}
