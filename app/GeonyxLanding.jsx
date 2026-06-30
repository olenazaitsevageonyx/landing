'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

// Paste your Formspree form endpoint here to receive requests by email, e.g.
// 'https://formspree.io/f/abcdwxyz'. Leave empty to just show the success state.
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mykknngn';

// ⚠ Replace the placeholder figures below with real, client-approved data before publishing.
const PRICING = {
  scopedPrice: 'from $8,500',
  scopedTime: 'about 2 weeks',
};
const RESULTS = {
  headline: 'A fintech moved from 7th to 2nd in comparison-intent AI answers across three models in 60 days.',
  stats: [
    ['+31', 'Recommendation share gain, commerce intent'],
    ['7 → 2', 'Rank in “best platform for…” answers'],
    ['3 / 3', 'Global models now recommending it'],
  ],
  note: 'Sample result, pending a real client-approved case. Replace before publishing.',
};
const TRUST = [
  'U.S. company · GEONYX LLC',
  'Dedicated GPU via Crusoe',
  'NDA-first engagements',
  'Independent · no stake in execution',
];

const css = `
:root{
  --bg:#FFFFFF; --paper:#FAFAF8; --ink:#141414; --mut:#6B6B6B; --faint:#9A9A9A;
  --line:#E7E4DE; --grid:rgba(20,20,20,.045); --accent:#5F9AA2; --accent-soft:#EAF3F4;
  --accent-ink:#27474B;
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
.gx-navlinks{display:flex;gap:26px;align-items:center;}
.gx-navlinks a{font-size:13px;color:var(--mut);text-decoration:none;cursor:pointer;transition:color .2s;}
.gx-navlinks a:hover{color:var(--ink);}
.gx-btn{display:inline-block;border:none;cursor:pointer;font-family:inherit;font-size:13px;font-weight:600;
  padding:11px 22px;background:var(--ink);color:#fff;border-radius:999px;text-decoration:none;transition:background .2s;}
.gx-btn:hover{background:var(--accent);}
.gx-btn-ghost{background:transparent;color:var(--ink);border:1px solid var(--line);}
.gx-btn-ghost:hover{border-color:var(--accent);color:var(--accent);}
@media(max-width:980px){.gx-navlinks a:not(.gx-btn){display:none;}}

.gx-hero{padding:88px 0 76px;}
.gx-hero-grid{display:grid;grid-template-columns:1.12fr .88fr;gap:60px;align-items:center;}
.gx-h1{font-size:clamp(33px,4.4vw,52px);line-height:1.08;letter-spacing:-1.4px;font-weight:600;margin:22px 0 22px;}
.gx-h1 i{font-style:normal;color:var(--accent);}
.gx-lead{font-size:17px;color:var(--mut);line-height:1.65;max-width:520px;margin-bottom:26px;}
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
.gx-sec-head{max-width:660px;margin-bottom:46px;}
.gx-h2{font-size:clamp(24px,3vw,34px);line-height:1.18;letter-spacing:-.8px;font-weight:600;margin:16px 0 14px;}
.gx-sub{font-size:15px;color:var(--mut);line-height:1.65;}

/* Positioning anchor: who / what / what we do / what we don't */
.gx-anchor{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:var(--line);border:1px solid var(--line);border-radius:14px;overflow:hidden;margin-top:8px;}
.gx-anchor-cell{background:var(--bg);padding:26px 22px 28px;}
.gx-anchor-cell.accent{background:var(--accent-soft);}
.gx-anchor-k{font-family:var(--mono);font-size:10px;letter-spacing:1.5px;text-transform:uppercase;color:var(--accent);margin-bottom:13px;}
.gx-anchor-cell p{font-size:14px;line-height:1.55;color:var(--ink);}
.gx-anchor-cell.accent p{color:var(--accent-ink);font-weight:500;}
@media(max-width:880px){.gx-anchor{grid-template-columns:1fr 1fr;}}
@media(max-width:480px){.gx-anchor{grid-template-columns:1fr;}}

.gx-diff{display:flex;flex-wrap:wrap;gap:10px;margin-top:30px;}
.gx-diff span{font-family:var(--mono);font-size:11px;letter-spacing:.5px;color:var(--ink);
  border:1px solid var(--line);border-radius:999px;padding:8px 14px;background:var(--paper);}
.gx-diff span.neg{color:var(--mut);}
.gx-diff span.pos{border-color:var(--accent);color:var(--accent);}

/* Use cases */
.gx-uc{display:grid;grid-template-columns:1fr 1fr;gap:18px;}
.gx-uc-card{background:var(--bg);border:1px solid var(--line);border-radius:14px;padding:26px 26px 22px;transition:border-color .2s;}
.gx-uc-card:hover{border-color:var(--accent);}
.gx-uc-tag{font-family:var(--mono);font-size:10px;letter-spacing:1px;text-transform:uppercase;color:var(--accent);}
.gx-uc-card h3{font-size:18px;font-weight:600;letter-spacing:-.3px;margin:12px 0 10px;line-height:1.28;}
.gx-uc-card p{font-size:14px;color:var(--mut);line-height:1.62;}
.gx-uc-foot{margin-top:16px;padding-top:13px;border-top:1px solid var(--line);font-family:var(--mono);font-size:10.5px;color:var(--faint);letter-spacing:.3px;}
@media(max-width:760px){.gx-uc{grid-template-columns:1fr;}}

/* Methodology + named metrics */
.gx-metrics{margin-top:36px;border-top:1px solid var(--line);}
.gx-metric{display:grid;grid-template-columns:210px 1fr;gap:24px;padding:20px 0;border-bottom:1px solid var(--line);align-items:baseline;}
.gx-metric .m-name{font-weight:600;font-size:15px;letter-spacing:-.2px;}
.gx-metric .m-tag{display:block;font-family:var(--mono);font-size:9.5px;letter-spacing:1px;text-transform:uppercase;color:var(--accent);margin-top:5px;}
.gx-metric .m-desc{font-size:14px;color:var(--mut);line-height:1.6;}
.gx-metric.head{background:linear-gradient(90deg,var(--accent-soft),transparent);margin:0 -16px;padding:20px 16px;border-radius:8px;border-bottom:1px solid var(--line);}
.gx-metric.head .m-name{color:var(--accent-ink);}
@media(max-width:640px){.gx-metric{grid-template-columns:1fr;gap:7px;}.gx-metric.head{margin:0;}}

/* Regional coverage */
.gx-reg{display:grid;grid-template-columns:repeat(5,1fr);gap:1px;background:var(--line);border:1px solid var(--line);border-radius:14px;overflow:hidden;margin-top:8px;}
.gx-reg-col{background:var(--bg);padding:22px 16px 24px;}
.gx-reg-col.mena{background:var(--accent-soft);}
.gx-reg-k{font-family:var(--mono);font-size:10px;letter-spacing:1px;text-transform:uppercase;color:var(--ink);margin-bottom:3px;font-weight:600;}
.gx-reg-col.mena .gx-reg-k{color:var(--accent-ink);}
.gx-reg-lang{font-family:var(--mono);font-size:9.5px;color:var(--faint);letter-spacing:.5px;margin-bottom:14px;}
.gx-reg-m{font-size:12.5px;color:var(--ink);line-height:1.95;}
.gx-reg-note{font-family:var(--mono);font-size:9.5px;color:var(--faint);margin-top:12px;line-height:1.5;letter-spacing:.2px;}
@media(max-width:880px){.gx-reg{grid-template-columns:1fr 1fr 1fr;}}
@media(max-width:560px){.gx-reg{grid-template-columns:1fr 1fr;}}

/* Deliverables */
.gx-deliv{display:grid;grid-template-columns:1fr 1fr;gap:18px;margin-top:8px;}
.gx-deliv-card{background:var(--paper);border:1px solid var(--line);border-radius:14px;padding:26px;}
.gx-deliv-card .d-cad{font-family:var(--mono);font-size:10px;letter-spacing:1.5px;text-transform:uppercase;color:var(--accent);}
.gx-deliv-card h3{font-size:18px;font-weight:600;margin:10px 0 9px;letter-spacing:-.2px;}
.gx-deliv-card .d-int{font-size:13.5px;color:var(--mut);line-height:1.6;}
.gx-deliv-card ul{list-style:none;margin-top:15px;}
.gx-deliv-card li{font-size:13px;color:var(--ink);padding:8px 0 8px 18px;position:relative;line-height:1.45;border-top:1px solid var(--line);}
.gx-deliv-card li::before{content:'\\00B7';position:absolute;left:0;color:var(--accent);}
@media(max-width:760px){.gx-deliv{grid-template-columns:1fr;}}

/* Team: credentials for diagnosis */
.gx-team{display:grid;grid-template-columns:1fr 1fr;gap:1px;background:var(--line);border:1px solid var(--line);border-radius:14px;overflow:hidden;}
.gx-team-cell{background:var(--bg);padding:26px 26px 28px;}
.gx-team-cell .t-k{font-family:var(--mono);font-size:10px;letter-spacing:1px;text-transform:uppercase;color:var(--accent);}
.gx-team-cell .t-cred{font-family:var(--mono);font-size:11px;color:var(--faint);letter-spacing:.3px;margin:9px 0 13px;line-height:1.7;}
.gx-team-cell h3{font-size:15.5px;font-weight:600;letter-spacing:-.2px;margin-bottom:8px;line-height:1.3;}
.gx-team-cell p{font-size:13.5px;color:var(--mut);line-height:1.6;}
@media(max-width:760px){.gx-team{grid-template-columns:1fr;}}
.gx-team-note{font-size:13.5px;color:var(--mut);line-height:1.68;margin-top:24px;max-width:700px;}

.gx-scope{display:grid;grid-template-columns:1fr 1fr;gap:1px;background:var(--line);border:1px solid var(--line);border-radius:14px;overflow:hidden;}
.gx-scope-item{background:var(--bg);padding:28px 28px 30px;}
.gx-scope-item h3{font-size:17px;font-weight:600;letter-spacing:-.2px;margin-bottom:9px;}
.gx-scope-item p{font-size:14px;color:var(--mut);line-height:1.6;}
.gx-tag{display:inline-block;font-family:var(--mono);font-size:10px;font-weight:500;letter-spacing:1px;text-transform:uppercase;color:var(--accent);margin-bottom:13px;}
@media(max-width:720px){.gx-scope{grid-template-columns:1fr;}}

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

.gx-foot{padding:38px 0;border-top:1px solid var(--line);}
.gx-foot .gx-c{display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:14px;}
.gx-foot-l{font-family:var(--mono);font-size:11px;color:var(--faint);letter-spacing:.3px;}
.gx-foot-r{display:flex;gap:22px;}
.gx-foot-r a{font-size:12px;color:var(--mut);text-decoration:none;cursor:pointer;}
.gx-foot-r a:hover{color:var(--accent);}

/* Proof / results */
.gx-proof{background:var(--panel);border:1px solid var(--panel-line);border-radius:16px;padding:38px 36px;color:var(--panel-ink);}
.gx-proof-k{font-family:var(--mono);font-size:10px;letter-spacing:1.5px;text-transform:uppercase;color:var(--panel-mut);}
.gx-proof h3{color:#fff;font-size:clamp(19px,2.4vw,25px);font-weight:600;letter-spacing:-.4px;line-height:1.3;margin:12px 0 26px;max-width:760px;}
.gx-proof-stats{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-bottom:24px;}
.gx-pstat .pv{font-family:var(--mono);font-size:30px;font-weight:600;color:var(--panel-accent);letter-spacing:-1px;}
.gx-pstat .pl{font-size:12px;color:var(--panel-mut);line-height:1.45;margin-top:6px;}
.gx-proof-note{font-family:var(--mono);font-size:10px;color:var(--panel-mut);letter-spacing:.3px;border-top:1px solid var(--panel-line);padding-top:14px;}
@media(max-width:640px){.gx-proof-stats{grid-template-columns:1fr;gap:16px;}.gx-proof{padding:30px 24px;}}
.gx-trust{display:flex;flex-wrap:wrap;gap:10px;margin-top:24px;}
.gx-trust span{font-family:var(--mono);font-size:10.5px;letter-spacing:.4px;color:var(--mut);border:1px solid var(--line);border-radius:999px;padding:8px 14px;background:var(--bg);}

/* Contrast: dashboard vs geonyx */
.gx-contrast{border:1px solid var(--line);border-radius:14px;overflow:hidden;}
.gx-crow{display:grid;grid-template-columns:1fr 1fr;border-top:1px solid var(--line);}
.gx-crow:first-child{border-top:none;}
.gx-crow > div{padding:16px 22px;font-size:13.5px;line-height:1.5;}
.gx-crow .c-dash{color:var(--mut);background:var(--paper);border-right:1px solid var(--line);}
.gx-crow .c-gx{color:var(--ink);font-weight:500;}
.gx-chead{font-family:var(--mono);font-size:10px;letter-spacing:1px;text-transform:uppercase;}
.gx-crow.head > div{padding:13px 22px;}
.gx-crow.head .c-dash{color:var(--faint);}
.gx-crow.head .c-gx{color:var(--accent);}
@media(max-width:560px){.gx-crow{grid-template-columns:1fr;}.gx-crow .c-dash{border-right:none;border-bottom:1px solid var(--line);}.gx-crow.head{display:none;}}

/* Pricing tiers */
.gx-tiers{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;}
.gx-tier{background:var(--bg);border:1px solid var(--line);border-radius:14px;padding:26px 24px 24px;display:flex;flex-direction:column;}
.gx-tier.feat{border-color:var(--accent);box-shadow:0 0 0 1px var(--accent);}
.gx-tier-badge{font-family:var(--mono);font-size:9.5px;letter-spacing:1px;text-transform:uppercase;color:var(--accent);margin-bottom:10px;min-height:14px;}
.gx-tier h3{font-size:17px;font-weight:600;letter-spacing:-.2px;margin-bottom:6px;}
.gx-tier .t-price{font-family:var(--mono);font-size:15px;color:var(--ink);font-weight:600;margin-bottom:14px;}
.gx-tier .t-price span{color:var(--faint);font-weight:400;font-size:12px;}
.gx-tier p{font-size:13px;color:var(--mut);line-height:1.6;flex:1;}
.gx-tier .gx-btn{margin-top:18px;text-align:center;}
@media(max-width:760px){.gx-tiers{grid-template-columns:1fr;}}

/* Validated-change loop */
.gx-loop{display:flex;flex-wrap:wrap;align-items:center;gap:10px;margin-top:30px;padding:18px 22px;background:var(--accent-soft);border-radius:12px;}
.gx-loop b{font-family:var(--mono);font-size:11px;letter-spacing:.5px;color:var(--accent-ink);font-weight:600;}
.gx-loop i{font-style:normal;color:var(--accent);font-family:var(--mono);}

/* Report spread mock */
.gx-report{border:1px solid var(--line);border-radius:14px;overflow:hidden;margin-bottom:26px;background:var(--bg);}
.gx-report-top{display:flex;justify-content:space-between;align-items:center;padding:15px 22px;border-bottom:1px solid var(--line);background:var(--paper);gap:10px;flex-wrap:wrap;}
.gx-report-top .r-t{font-size:13px;font-weight:600;}
.gx-report-top .r-m{font-family:var(--mono);font-size:10px;color:var(--faint);letter-spacing:.5px;}
.gx-report-body{display:grid;grid-template-columns:auto 1fr;gap:30px;padding:24px 22px;align-items:center;}
.gx-report-idx{text-align:center;padding-right:30px;border-right:1px solid var(--line);}
.gx-report-idx .ri-v{font-family:var(--mono);font-size:46px;font-weight:600;color:var(--accent);letter-spacing:-2px;line-height:1;}
.gx-report-idx .ri-l{font-family:var(--mono);font-size:9.5px;letter-spacing:1px;text-transform:uppercase;color:var(--faint);margin-top:6px;}
.gx-report-comp{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;}
.gx-report-comp div b{display:block;font-family:var(--mono);font-size:9.5px;letter-spacing:.8px;text-transform:uppercase;color:var(--mut);margin-bottom:5px;}
.gx-report-comp div span{font-family:var(--mono);font-size:20px;font-weight:600;color:var(--ink);}
@media(max-width:560px){.gx-report-body{grid-template-columns:1fr;gap:18px;}.gx-report-idx{border-right:none;border-bottom:1px solid var(--line);padding:0 0 18px;}.gx-report-comp{grid-template-columns:1fr 1fr;}}

/* Numeric spec strip */
.gx-spec{background:var(--bg);border:1px solid var(--line);border-radius:14px;padding:28px 30px;margin-bottom:10px;}
.gx-spec-k{font-family:var(--mono);font-size:10px;letter-spacing:1.5px;text-transform:uppercase;color:var(--accent);}
.gx-spec h3{font-size:clamp(17px,2.2vw,22px);font-weight:600;letter-spacing:-.4px;margin:10px 0 22px;line-height:1.25;}
.gx-spec-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:var(--line);border:1px solid var(--line);border-radius:10px;overflow:hidden;}
.gx-spec-grid > div{background:var(--bg);padding:18px 16px;}
.gx-spec-grid b{display:block;font-family:var(--mono);font-size:30px;font-weight:600;color:var(--accent);letter-spacing:-1px;line-height:1;}
.gx-spec-grid span{display:block;font-size:11.5px;color:var(--mut);margin-top:8px;line-height:1.35;}
.gx-spec-foot{margin-top:18px;font-size:13px;color:var(--mut);line-height:1.6;}
@media(max-width:640px){.gx-spec-grid{grid-template-columns:1fr 1fr;}.gx-spec{padding:24px 22px;}}

/* Hero model chips */
.gx-chips{display:flex;flex-wrap:wrap;align-items:center;gap:8px;margin-bottom:30px;}
.gx-chips-k{font-family:var(--mono);font-size:10px;letter-spacing:1px;text-transform:uppercase;color:var(--faint);margin-right:4px;}
.gx-chip-m{font-family:var(--mono);font-size:11px;letter-spacing:.3px;color:var(--ink);border:1px solid var(--line);border-radius:999px;padding:5px 11px;background:var(--paper);}
.gx-chip-m.sov{border-color:var(--accent);color:var(--accent-ink);background:var(--accent-soft);}
.gx-chips-tag{font-family:var(--mono);font-size:10px;color:var(--faint);letter-spacing:.3px;}

/* Enemy line */
.gx-enemy{padding:72px 0 0;}
.gx-enemy-line{font-size:clamp(22px,3vw,32px);line-height:1.3;letter-spacing:-.6px;font-weight:500;max-width:880px;color:var(--mut);}
.gx-enemy-line b{color:var(--ink);font-weight:600;}
.gx-hero-foot{margin-top:22px;max-width:520px;}
.gx-hero-roles{font-size:13.5px;color:var(--ink);line-height:1.5;}
.gx-hero-trust{font-family:var(--mono);font-size:10.5px;letter-spacing:.3px;color:var(--faint);margin-top:9px;}
`;

const MODELS = [
  { id: 'chatgpt', name: 'ChatGPT', lens: 'global', search: true },
  { id: 'gemini', name: 'Gemini', lens: 'global', search: true },
  { id: 'perplexity', name: 'Perplexity', lens: 'global', search: true },
  { id: 'claude', name: 'Claude', lens: 'global', search: true },
  { id: 'qwen', name: 'Qwen', lens: 'regional', search: true },
  { id: 'falcon', name: 'Falcon-Arabic', lens: 'regional', search: false },
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

const USE_CASES = [
  {
    tag: 'Media & PR allocation',
    h: 'Which journalists and outlets to back, and where to publish',
    p: 'We run your media list through the engine and rank who the models actually recognize and cite, mapped to your goals, regions and languages. You stop spending PR budget on coverage AI ignores.',
    foot: 'from a real engagement · journalists scored global + regional',
  },
  {
    tag: 'Independent vendor review',
    h: 'Is this agency proposal any good, measured against your goals?',
    p: 'We pressure-test an incoming proposal or compare bidders: what each covers, what it misses, and whether its headline claims hold up in the models and regions it never tested. We have no stake in who wins the work, which keeps the read honest.',
    foot: 'from a real engagement · goal-by-goal coverage map',
  },
  {
    tag: 'Competitive recommendation gap',
    h: 'Why AI names your competitor as the answer, even when you are the official one',
    p: 'Prompt by prompt, we measure where a rival owns the recommendation and decompose why: comparative framing, fact distortion, the sources AI trusts. We have seen an official category partner stay invisible to AI while two rivals were named in every answer.',
    foot: 'live competitive case · named-competitor head-to-head',
  },
  {
    tag: 'AI investor-lens audit',
    h: 'What AI tells investors about you, in every region you are raising in',
    p: 'Before you raise in the US, the Gulf or Asia, we measure how the AI tools investors use for first-pass diligence describe and rank you, region by region, model by model, language by language. You fix the gaps before the roadshow, not after.',
    foot: 'measures the AI-mediated layer of perception, not human sentiment',
  },
];

const REGIONS = [
  { k: 'USA', lang: 'English', models: ['ChatGPT', 'Claude', 'Gemini', 'Perplexity'], note: 'Global frontier, where most funds start. Strong here can hide weakness everywhere else.' },
  { k: 'China', lang: 'Mandarin · behind the firewall', models: ['ERNIE', 'Qwen', 'DeepSeek', 'Hunyuan'], note: 'A separate world. Visibility in global models means nothing here.' },
  { k: 'South Korea', lang: 'Korean', models: ['HyperCLOVA X', 'EXAONE', 'Solar', 'A.X'], note: 'Sovereign models, measured in Korean.' },
  { k: 'India', lang: 'Hindi · English', models: ['Sarvam', 'Krutrim', 'BharatGen', '+ global'], note: 'Sovereign stack exists, but global models still dominate usage.' },
  { k: 'MENA', lang: 'Arabic · English', mena: true, models: ['Falcon', 'Jais', 'Qwen'], note: 'On dedicated GPU. Coverage no API-only tool can offer.' },
];

const METRICS = [
  { name: 'Stability Score', tag: 'proprietary · headline', desc: 'How reproducible your recommendation is across repeated runs of the same prompt. LLMs are non-deterministic, so a single answer is noise. This is the number no monitoring tool reports.', head: true },
  { name: 'GEONYX Index', tag: 'composite · 0–100', desc: 'A single executive read, always shown with its components beneath it. The composite sells; the components defend.' },
  { name: 'Intent-weighted SOM', tag: 'proprietary', desc: 'Recommendation share weighted toward commerce intent, where revenue happens, not a flat average across every prompt.' },
  { name: 'Authority Surface', tag: 'proprietary filter', desc: 'Share of citations that come from real, verified sources, after fabricated citations are filtered out by validation.' },
  { name: 'Confabulation control', tag: 'engine layer', desc: 'Separates genuine recognition from confident invention, so a fabricated answer is never counted as visibility.' },
];

const TEAM = [
  { k: 'Creative direction & brand standard', cred: '15+ years · 2 Red Dot · 3 Pentawards', h: 'Why our reports read like a scientific instrument', p: 'The same restraint that earned Red Dot and Pentawards recognition is what makes a diagnostic legible to a CMO and defensible to a CTO. We design the result to be acted on, not decorated.' },
  { k: 'Search & intent', cred: '7+ years · organic search, semantic research', h: 'Why we measure intent, not a flat prompt list', p: 'Years inside commercial search intent are the reason our methodology separates discovery, comparison and commerce, and finds where in the buying journey a brand actually loses.' },
  { k: 'AI discovery & recommendation signals', cred: '7+ years · inside the U.S. AI ecosystem', h: 'Why we can diagnose the signals behind a recommendation', p: 'We understand entity signals, source authority and content structure deeply, which is what lets us isolate which factors move a model and which do not. We measure the signal; acting on it is your team’s work, never ours.' },
  { k: 'Editorial & factual accuracy', cred: '7+ years · editorial judgment', h: 'Why we can tell when a model gets your facts wrong', p: 'Editorial expertise powers our truth-set and Fact Precision layer, comparing what a model claims about you against an approved set of facts, and flagging distortion before it costs you.' },
  { k: 'Engineering & infrastructure', cred: '7+ years · dedicated GPU via Crusoe', h: 'Why we can measure models no API can reach', p: 'Our engineers built the multi-model, multi-run engine and operate it on dedicated GPU, the reason we can diagnose sovereign models like Falcon, Jais and Qwen that API-only tools cannot access.' },
  { k: 'How you work with us', cred: 'Senior at every stage · no junior layers', h: 'One senior team, on your side of the table', p: 'You work directly with the specialists who run your measurement. And because we have no stake in who executes the work we recommend, the read stays independent.' },
];

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
            <a onClick={() => go('#identity')}>What we are</a>
            <a onClick={() => go('#cases')}>Use cases</a>
            <a onClick={() => go('#method')}>Methodology</a>
            <a onClick={() => go('#team')}>Team</a>
            <a onClick={() => go('#start')}>Pricing</a>
            <a className="gx-btn" onClick={() => go('#request')}>Request collaboration</a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <header className="gx-hero">
        <div className="gx-c gx-hero-grid">
          <div className="gx-rev gx-in">
            <div className="gx-eyebrow">AI Recommendation Intelligence for B2B teams</div>
            <h1 className="gx-h1">AI recommends your competitors. We measure <i>why</i>, and what to change.</h1>
            <p className="gx-lead">An independent U.S. firm for the teams whose reputation AI now decides. We measure how models recommend, cite and represent you, across competitors, media, vendors and investor diligence, on global and sovereign models, and turn it into decisions you can act on.</p>
            <div className="gx-telemetry">
              <b>models</b> 7 &nbsp;·&nbsp; <b>lenses</b> 2 &nbsp;·&nbsp; <b>runs/probe</b> K&ge;5<br />
              <b>signals/probe</b> ~40 &nbsp;·&nbsp; <b>infra</b> dedicated GPU
            </div>
            <div className="gx-chips gx-rev">
              <span className="gx-chips-k">measured across</span>
              <span className="gx-chip-m">ChatGPT</span>
              <span className="gx-chip-m">Claude</span>
              <span className="gx-chip-m">Gemini</span>
              <span className="gx-chip-m">Perplexity</span>
              <span className="gx-chip-m sov">Falcon</span>
              <span className="gx-chip-m sov">Jais</span>
              <span className="gx-chip-m sov">Qwen</span>
              <span className="gx-chips-tag">sovereign · no public API</span>
            </div>
            <div className="gx-hero-actions">
              <button className="gx-btn" onClick={() => go('#request')}>Request a scoped diagnostic</button>
              <button className="gx-btn gx-btn-ghost" onClick={() => go('#start')}>See your AI recommendation gap</button>
            </div>
            <div className="gx-hero-foot gx-rev">
              <div className="gx-hero-roles">Built for CMOs, heads of communications, founders raising capital, and the agencies serving them.</div>
              <div className="gx-hero-trust">Engagements under NDA · we work with a limited number of organizations at a time.</div>
            </div>
          </div>

          <div className="gx-rev gx-in gx-card" aria-hidden="true">
            <div className="gx-card-top">
              <span className="gx-fig">Fig.00 · recommendation share</span>
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
            <div className="gx-card-foot">example read · global + regional models, multiple runs each</div>
          </div>
        </div>
      </header>

      {/* POSITIONING ANCHOR */}
      <section className="gx-sec gx-sec-light" id="identity">
        <div className="gx-c">
          <div className="gx-sec-head gx-rev">
            <div className="gx-eyebrow">Who we are</div>
            <div className="gx-rule" />
            <h2 className="gx-h2">A measurement instrument, not an agency, not a dashboard.</h2>
            <p className="gx-sub">An instrument with its own methodology and index, not a content shop. We never execute the work we recommend, which is what keeps the diagnosis honest.</p>
          </div>

          <div className="gx-anchor gx-rev">
            <div className="gx-anchor-cell">
              <div className="gx-anchor-k">Who we are</div>
              <p>An independent AI recommendation intelligence firm. U.S. company, MENA reach.</p>
            </div>
            <div className="gx-anchor-cell">
              <div className="gx-anchor-k">What we are</div>
              <p>A measurement instrument with a proprietary methodology and index, not a content shop.</p>
            </div>
            <div className="gx-anchor-cell">
              <div className="gx-anchor-k">What we do</div>
              <p>Measure and explain why AI recommends one entity over another, across global and sovereign models, and identify what to change.</p>
            </div>
            <div className="gx-anchor-cell accent">
              <div className="gx-anchor-k">What we don&rsquo;t do</div>
              <p>We don&rsquo;t write content, run SEO, build websites or place PR. That independence is what keeps the read objective.</p>
            </div>
          </div>

          <div className="gx-diff gx-rev">
            <span className="neg">Not SEO</span>
            <span className="neg">Not a visibility dashboard</span>
            <span className="neg">Not an agency</span>
            <span className="pos">Proprietary index</span>
            <span className="pos">Multi-model + sovereign</span>
            <span className="pos">Independent by design</span>
          </div>
        </div>
      </section>

      {/* ENEMY LINE */}
      <section className="gx-enemy">
        <div className="gx-c">
          <p className="gx-enemy-line gx-rev">Monitoring tools tell you that AI mentioned you. <b>None tell you why it recommended someone else, or what to change.</b></p>
        </div>
      </section>

      {/* USE CASES */}
      <section className="gx-sec" id="cases">
        <div className="gx-c">
          <div className="gx-sec-head gx-rev">
            <div className="gx-eyebrow">What we deliver</div>
            <div className="gx-rule" />
            <h2 className="gx-h2">Decisions, not dashboards.</h2>
            <p className="gx-sub">Each engagement answers a specific question a leader is already asking. These are drawn from real work: the same engine, pointed at a different decision.</p>
          </div>

          <div className="gx-uc gx-rev">
            {USE_CASES.map((u) => (
              <div className="gx-uc-card" key={u.tag}>
                <div className="gx-uc-tag">{u.tag}</div>
                <h3>{u.h}</h3>
                <p>{u.p}</p>
                <div className="gx-uc-foot">{u.foot}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROOF / RESULTS */}
      <section className="gx-sec" id="proof">
        <div className="gx-c">
          <div className="gx-proof gx-rev">
            <div className="gx-proof-k">Result · selected engagement</div>
            <h3>{RESULTS.headline}</h3>
            <div className="gx-proof-stats">
              {RESULTS.stats.map(([v, l]) => (
                <div className="gx-pstat" key={l}><div className="pv">{v}</div><div className="pl">{l}</div></div>
              ))}
            </div>
            <div className="gx-proof-note">{RESULTS.note}</div>
          </div>
          <div className="gx-trust gx-rev">
            {TRUST.map((t) => <span key={t}>{t}</span>)}
          </div>
        </div>
      </section>

      {/* METHODOLOGY + METRICS */}
      <section className="gx-sec gx-sec-light" id="method">
        <div className="gx-c">
          <div className="gx-sec-head gx-rev" style={{ maxWidth: 720 }}>
            <div className="gx-eyebrow">Our own methodology, index and metrics</div>
            <div className="gx-rule" />
            <h2 className="gx-h2">A measurement discipline of our own.</h2>
            <p className="gx-sub">We built a proprietary methodology, our own scoring index, and a multi-model dataset that grows with every scan. The metrics below are ours: named, defined and reported consistently. The exact prompts, weights and calibration are a trade secret and stay with GEONYX LLC.</p>
          </div>

          <div className="gx-spec gx-rev">
            <div className="gx-spec-k">Per probe</div>
            <h3>7 models &times; 5+ runs &times; 2 lenses. 35+ measurements behind one score.</h3>
            <div className="gx-spec-grid">
              <div><b>7</b><span>models queried</span></div>
              <div><b>2</b><span>lenses · global + sovereign</span></div>
              <div><b>5+</b><span>runs per model</span></div>
              <div><b>~40</b><span>signals per probe</span></div>
            </div>
            <div className="gx-spec-foot">Confabulated mentions and fabricated citations are dropped before scoring. The result is decomposed by intent, verified against a client-approved truth-set, and returned as a 0&ndash;100 index with its components and the exact prompts where you lose.</div>
          </div>

          <div className="gx-metrics gx-rev">
            {METRICS.map((m) => (
              <div className={`gx-metric${m.head ? ' head' : ''}`} key={m.name}>
                <div className="m-name">{m.name}<span className="m-tag">{m.tag}</span></div>
                <div className="m-desc">{m.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SYSTEM PIPELINE */}
      <section className="gx-sys" id="system">
        <div className="gx-sys-corner gx-fig">Fig.01 · pipeline</div>
        <div className="gx-c">
          <div className="gx-sec-head gx-rev">
            <div className="gx-eyebrow">The system behind the score</div>
            <div className="gx-rule" />
            <h2 className="gx-h2">A measurement engine, not a survey.</h2>
            <p className="gx-sub">Each score is the output of a versioned pipeline. The stages below show the data flow. The prompts, scoring rules and calibrated weights are proprietary and stay with GEONYX LLC.</p>
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

      {/* REGIONAL COVERAGE */}
      <section className="gx-sec" id="coverage">
        <div className="gx-c">
          <div className="gx-sec-head gx-rev">
            <div className="gx-eyebrow">Coverage by region</div>
            <div className="gx-rule" />
            <h2 className="gx-h2">Global tools reach 4 models. We measure 7, including 3 with no public API.</h2>
            <p className="gx-sub">ChatGPT, Gemini, Perplexity and Claude are one slice. The sovereign and Arabic models buyers trust in the Gulf, Falcon, Jais and Qwen, sit behind no public API. We run them on dedicated GPU, in-language, so a gap that is invisible to every API-only tool comes back as a measured number.</p>
          </div>

          <div className="gx-reg gx-rev">
            {REGIONS.map((r) => (
              <div className={`gx-reg-col${r.mena ? ' mena' : ''}`} key={r.k}>
                <div className="gx-reg-k">{r.k}</div>
                <div className="gx-reg-lang">{r.lang}</div>
                <div className="gx-reg-m">{r.models.map((m) => <div key={m}>{m}</div>)}</div>
                <div className="gx-reg-note">{r.note}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY NOT A DASHBOARD */}
      <section className="gx-sec" id="why">
        <div className="gx-c">
          <div className="gx-sec-head gx-rev">
            <div className="gx-eyebrow">Why this is not a $200 tool</div>
            <div className="gx-rule" />
            <h2 className="gx-h2">A monitoring tool counts mentions. We measure recommendation, and explain it.</h2>
            <p className="gx-sub">The price gap is a capability gap. Here is what a dashboard physically cannot do.</p>
          </div>
          <div className="gx-contrast gx-rev">
            <div className="gx-crow head"><div className="c-dash gx-chead">A monitoring dashboard</div><div className="c-gx gx-chead">GEONYX</div></div>
            {[
              ['Tells you if AI mentions you.', 'Tells you why AI picks someone else, and what to change.'],
              ['Takes a single answer as fact.', 'Runs many times per model and reports how stable the answer is.'],
              ['Global API models only.', 'Global plus sovereign models, Falcon, Jais and Qwen, on dedicated GPU.'],
              ['Counts any mention, even invented ones.', 'Filters fabricated claims and citations before scoring.'],
              ['A login you check once.', 'An analyst read tied to your goals, with the next move spelled out.'],
            ].map(([d, g]) => (
              <div className="gx-crow" key={d}><div className="c-dash">{d}</div><div className="c-gx">{g}</div></div>
            ))}
          </div>
        </div>
      </section>

      {/* DELIVERABLES */}
      <section className="gx-sec gx-sec-light" id="deliverables">
        <div className="gx-c">
          <div className="gx-sec-head gx-rev">
            <div className="gx-eyebrow">What you receive</div>
            <div className="gx-rule" />
            <h2 className="gx-h2">Analyst-grade intelligence with clear instructions, not a login.</h2>
            <p className="gx-sub">A report your team reads and acts on carries more weight than a dashboard visited once and forgotten. Every report tells you what to do next, why, and how we will verify it.</p>
          </div>

          <div className="gx-report gx-rev">
            <div className="gx-report-top"><span className="r-t">Executive Snapshot · sample layout</span><span className="r-m">format only · not a client result</span></div>
            <div className="gx-report-body">
              <div className="gx-report-idx"><div className="ri-v">63</div><div className="ri-l">GEONYX Index</div></div>
              <div className="gx-report-comp">
                <div><b>Global vis</b><span>71</span></div>
                <div><b>Regional vis</b><span>48</span></div>
                <div><b>Stability</b><span>66</span></div>
                <div><b>Win rate</b><span>2 / 5</span></div>
                <div><b>Gap to leader</b><span>&minus;23</span></div>
                <div><b>Authority surface</b><span>54%</span></div>
              </div>
            </div>
          </div>
          <div className="gx-deliv gx-rev">
            <div className="gx-deliv-card">
              <div className="d-cad">Monthly</div>
              <h3>Executive Snapshot</h3>
              <p className="d-int">One page for leadership: the read at a glance, plus the single most important move.</p>
              <ul>
                <li>Visibility change, global and regional</li>
                <li>Win rate and Stability Score</li>
                <li>Gap to the category leader</li>
                <li>The month&rsquo;s risk flag and next action</li>
              </ul>
            </div>
            <div className="gx-deliv-card">
              <div className="d-cad">Quarterly</div>
              <h3>Deep Diagnostic</h3>
              <p className="d-int">Ten to fifteen pages of structural decomposition and a prioritized plan.</p>
              <ul>
                <li>Decomposition by discovery / comparison / commerce</li>
                <li>Head-to-head against named competitors</li>
                <li>Fact and authority-source analysis</li>
                <li>Interventions, each with expected impact</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* HOW TO START */}
      <section className="gx-sec gx-sec-light" id="start">
        <div className="gx-c">
          <div className="gx-sec-head gx-rev">
            <div className="gx-eyebrow">How to start</div>
            <div className="gx-rule" />
            <h2 className="gx-h2">Start small. Scale into a program.</h2>
            <p className="gx-sub">Begin with a scoped diagnostic on one category. It is a real read, not a demo, and it tells you whether a deeper program is worth it before you commit.</p>
          </div>
          <div className="gx-tiers gx-rev">
            <div className="gx-tier feat">
              <div className="gx-tier-badge">Start here</div>
              <h3>Scoped Diagnostic</h3>
              <div className="t-price">{PRICING.scopedPrice} <span>· {PRICING.scopedTime}</span></div>
              <p>One category, the core models, your top competitors. A real read on where you stand and why, with the single most important move to make.</p>
              <button className="gx-btn" onClick={() => go('#request')}>Request a diagnostic</button>
            </div>
            <div className="gx-tier">
              <div className="gx-tier-badge"></div>
              <h3>Foundational Audit</h3>
              <div className="t-price">Custom scope</div>
              <p>The full baseline: every intent, global and regional lenses, sovereign models, competitor decomposition and a prioritized plan you can act on.</p>
              <button className="gx-btn gx-btn-ghost" onClick={() => go('#request')}>Discuss scope</button>
            </div>
            <div className="gx-tier">
              <div className="gx-tier-badge"></div>
              <h3>Ongoing Program</h3>
              <div className="t-price">Monthly <span>+ quarterly</span></div>
              <p>Executive Snapshot each month, Deep Diagnostic each quarter. We diagnose, you act, we re-measure and confirm what moved.</p>
              <button className="gx-btn gx-btn-ghost" onClick={() => go('#request')}>Discuss a program</button>
            </div>
          </div>
          <div className="gx-loop gx-rev">
            <b>Diagnose</b><i>&rarr;</i><b>You act</b><i>&rarr;</i><b>We re-measure</b><i>&rarr;</i><b>Confirm what moved</b>
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className="gx-sec" id="team">
        <div className="gx-c">
          <div className="gx-sec-head gx-rev">
            <div className="gx-eyebrow">The disciplines behind the measurement</div>
            <div className="gx-rule" />
            <h2 className="gx-h2">Senior specialists who lived inside the systems that now decide recommendations.</h2>
            <p className="gx-sub">We don&rsquo;t sell these disciplines as services. We turned them into a measurement discipline of our own. Knowing how these systems work from the inside is exactly what lets us diagnose why a model recommends your competitor.</p>
          </div>

          <div className="gx-team gx-rev">
            {TEAM.map((t) => (
              <div className="gx-team-cell" key={t.k}>
                <div className="t-k">{t.k}</div>
                <div className="t-cred">{t.cred}</div>
                <h3>{t.h}</h3>
                <p>{t.p}</p>
              </div>
            ))}
          </div>

          <p className="gx-team-note gx-rev">One senior team across brand, search, content, AI and engineering, pointed at a single question. We measure why your recommendation moves, and prove what changed it. We don&rsquo;t execute the work.</p>
        </div>
      </section>

      {/* WHO WE WORK WITH */}
      <section className="gx-sec gx-sec-light" id="scope">
        <div className="gx-c">
          <div className="gx-sec-head gx-rev">
            <div className="gx-eyebrow">Who we work with</div>
            <div className="gx-rule" />
            <h2 className="gx-h2">Organizations whose reputation is now shaped by AI.</h2>
            <p className="gx-sub">A focused set of B2B organizations in competitive or regulated categories, plus founders raising capital where AI now shapes the first impression.</p>
          </div>
          <div className="gx-scope gx-rev">
            <div className="gx-scope-item"><span className="gx-tag">Brands &amp; enterprises</span><h3>Companies in competitive categories</h3><p>See why AI recommends a competitor, where you disappear in purchase-intent queries, and what specifically moves the ranking.</p></div>
            <div className="gx-scope-item"><span className="gx-tag">Communications &amp; PR</span><h3>In-house teams and their agencies</h3><p>Validate media plans, publications and vendor proposals against the sources AI actually cites, before you commit budget.</p></div>
            <div className="gx-scope-item"><span className="gx-tag">Founders raising capital</span><h3>Teams heading into a round</h3><p>Know what AI tells investors about you, region by region, before the roadshow, and close the gaps that show up in first-pass diligence.</p></div>
            <div className="gx-scope-item"><span className="gx-tag">Gulf &amp; MENA</span><h3>Regional and sovereign-AI users</h3><p>Diagnostics across sovereign and Arabic models such as Falcon, Jais and Qwen, on dedicated GPU. Coverage no API-only tool can offer.</p></div>
          </div>
        </div>
      </section>

      {/* LIVE PROBE */}
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
              <div className="gx-agg"><b>Stability Score</b><span className="gx-num muted">{agg ? agg.S : '··'}</span></div>
              <div className="gx-agg"><b>GEONYX Index</b><span className="gx-num">{agg ? agg.idx : '··'}</span></div>
            </div>
            <div className="gx-probe-foot">single probe · live engagements use K≥5 runs per model on dedicated GPU, under NDA</div>
          </div>
        </div>
      </section>

      {/* REQUEST */}
      <section className="gx-sec gx-sec-light" id="request">
        <div className="gx-c gx-coop">
          <div className="gx-rev">
            <div className="gx-eyebrow">Cooperation by request</div>
            <div className="gx-rule" />
            <h2 className="gx-h2">We work with a few organizations at a time.</h2>
            <p className="gx-coop-note">Every engagement begins with a request and a scoped diagnostic. We review each one personally. If it is a fit, we move to a full assessment, under NDA.</p>
            <ul className="gx-steps">
              <li><b>01</b><span>Send a request with your company and competitive field.</span></li>
              <li><b>02</b><span>We run a scoped scan and share what we find.</span></li>
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
                <p>We read every request and reply within a few days. If it is a fit, we will share a scoped diagnostic.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <footer className="gx-foot">
        <div className="gx-c">
          <div className="gx-foot-l">© 2026 GEONYX LLC · AI Recommendation Intelligence · United States</div>
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
