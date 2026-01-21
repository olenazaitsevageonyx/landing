'use client'

import React, { useState } from 'react'

export default function Home() {
  const [formData, setFormData] = useState({ name: '', email: '', company: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const models = [
    { name: 'Claude', provider: 'Anthropic', region: 'Global', flag: '🇺🇸', color: 'from-orange-500/20 to-orange-600/10', borderColor: 'hover:border-orange-400/40' },
    { name: 'GPT-4', provider: 'OpenAI', region: 'Global', flag: '🇺🇸', color: 'from-green-500/20 to-green-600/10', borderColor: 'hover:border-green-400/40' },
    { name: 'Gemini', provider: 'Google', region: 'Global', flag: '🇺🇸', color: 'from-blue-500/20 to-blue-600/10', borderColor: 'hover:border-blue-400/40' },
    { name: 'Mistral', provider: 'Mistral AI', region: 'Europe', flag: '🇫🇷', color: 'from-orange-500/20 to-red-600/10', borderColor: 'hover:border-orange-400/40' },
    { name: 'Llama', provider: 'Meta', region: 'Global', flag: '🇺🇸', color: 'from-blue-500/20 to-indigo-600/10', borderColor: 'hover:border-blue-400/40' },
    { name: 'Falcon', provider: 'TII', region: 'UAE', flag: '🇦🇪', color: 'from-red-500/20 to-green-600/10', borderColor: 'hover:border-red-400/40' },
    { name: 'Jais', provider: 'G42', region: 'MENA', flag: '🇦🇪', color: 'from-emerald-500/20 to-emerald-600/10', borderColor: 'hover:border-emerald-400/40' },
    { name: 'ERNIE', provider: 'Baidu', region: 'China', flag: '🇨🇳', color: 'from-red-500/20 to-red-600/10', borderColor: 'hover:border-red-400/40' },
    { name: 'HyperCLOVA', provider: 'Naver', region: 'Korea', flag: '🇰🇷', color: 'from-green-500/20 to-green-600/10', borderColor: 'hover:border-green-400/40' },
  ]

  const seoVsGeo = [
    { seo: 'Keyword density optimization', geo: 'Entity authority & context signals' },
    { seo: 'Backlink building', geo: 'Knowledge Graph presence' },
    { seo: 'Meta tag optimization', geo: 'Semantic fingerprint accuracy' },
    { seo: 'SERP position tracking', geo: 'Share of Model across LLMs' },
    { seo: 'Page load speed focus', geo: 'Narrative stability & consistency' },
    { seo: 'Click-through rate', geo: 'AI citation frequency' }
  ]

  const regions = [
    { name: 'North America', city: 'New York', status: 'HQ', top: 32, left: 24 },
    { name: 'Europe', city: 'London', status: 'Active', top: 28, left: 47 },
    { name: 'MENA', city: 'Dubai', status: 'Active', top: 42, left: 57 },
    { name: 'Asia Pacific', city: 'Singapore', status: 'Active', top: 55, left: 78 },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      const response = await fetch('https://formspree.io/f/mykknngn', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      if (response.ok) {
        setSubmitted(true)
        setFormData({ name: '', email: '', company: '', message: '' })
      }
    } catch (error) {
      console.error('Form submission error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-black text-white">
      
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-2xl font-bold tracking-tight hover:text-cyan-400 transition-colors">
            GEONYX
          </button>
          <div className="hidden md:flex items-center gap-6 text-sm text-gray-400">
            <button onClick={() => scrollTo('models')} className="hover:text-white transition-colors">Models</button>
            <button onClick={() => scrollTo('geo')} className="hover:text-white transition-colors">SEO to GEO</button>
            <button onClick={() => scrollTo('coverage')} className="hover:text-white transition-colors">Coverage</button>
            <button onClick={() => scrollTo('contact')} className="hover:text-white transition-colors">Contact</button>
          </div>
          {/* Mobile menu button */}
          <button className="md:hidden text-gray-400 hover:text-white" onClick={() => scrollTo('contact')}>
            <span className="text-sm">Request Access</span>
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-400/5 rounded-full blur-3xl"></div>
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.03) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl">
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-cyan-400 to-cyan-200 bg-clip-text text-transparent">
              GEONYX
            </h1>
            <p className="text-sm text-gray-500 mt-2 tracking-widest uppercase">Private Beta · Invite Only</p>
          </div>

          <h2 className="text-5xl md:text-7xl font-light tracking-tight mb-6">
            Wanna be
            <br />
            <span className="bg-gradient-to-r from-cyan-400 to-cyan-200 bg-clip-text text-transparent font-medium">
              visible for LLM?
            </span>
          </h2>
          
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-6 leading-relaxed">
            The world&apos;s first AI Visibility Index.
          </p>
          
          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-12 leading-relaxed">
            GEONYX transforms brands into first-class entities inside AI ecosystems, 
            capturing visibility at the model-decision layer.
          </p>

          <button 
            onClick={() => scrollTo('contact')} 
            className="px-8 py-4 bg-cyan-400 text-black font-medium rounded-full hover:bg-cyan-300 transition-all hover:scale-105"
          >
            Request Access
          </button>
        </div>
      </section>

      {/* Trusted By Fortune 500 */}
      <section className="py-16 px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <p className="text-center text-gray-400 text-sm mb-8 tracking-wider uppercase">Trusted by Fortune 500 companies</p>
          <div className="flex flex-wrap justify-center items-center gap-x-16 gap-y-6">
            {['Global Tech', 'Finance Corp', 'Energy Holdings', 'Media Group', 'Retail Inc'].map((company, i) => (
              <div key={i} className="text-gray-400 text-xl font-medium tracking-wide hover:text-gray-300 transition-colors">
                {company}
              </div>
            ))}
          </div>
          <p className="text-center text-gray-500 text-sm mt-8">Client identities protected under NDA</p>
        </div>
      </section>

      {/* Government-Ready + Designed For */}
      <section className="py-16 px-6 border-t border-white/5 bg-white/[0.01]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-cyan-400 text-sm font-medium tracking-wider uppercase mb-3">Government-Ready Infrastructure</p>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Compliance and security standards designed for sovereign entities and enterprise clients
            </p>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-4 mb-16">
            <div className="flex items-center gap-3 px-5 py-3 border border-white/10 rounded-full">
              <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span className="text-sm text-gray-300">SOC 2 Type II</span>
            </div>
            <div className="flex items-center gap-3 px-5 py-3 border border-white/10 rounded-full">
              <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm text-gray-300">GDPR Compliant</span>
            </div>
            <div className="flex items-center gap-3 px-5 py-3 border border-white/10 rounded-full">
              <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span className="text-sm text-gray-300">Enterprise Encryption</span>
            </div>
            <div className="flex items-center gap-3 px-5 py-3 border border-white/10 rounded-full">
              <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
              </svg>
              <span className="text-sm text-gray-300">ISO 27001</span>
            </div>
            <div className="flex items-center gap-3 px-5 py-3 border border-white/10 rounded-full">
              <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              <span className="text-sm text-gray-300">Gov-Grade Security</span>
            </div>
          </div>

          <div className="text-center mb-8">
            <p className="text-gray-400 text-sm tracking-wider uppercase mb-8">Designed For</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[
              { title: 'Brand Intelligence', desc: 'Marketing & Strategy Teams' },
              { title: 'Corporate Communications', desc: 'PR & Media Relations' },
              { title: 'Government & Public Sector', desc: 'Digital Offices & Ministries' },
              { title: 'Investor Relations', desc: 'Funds & Financial Institutions' }
            ].map((item, i) => (
              <div key={i} className="p-5 bg-white/[0.02] border border-white/5 rounded-2xl text-center hover:border-cyan-400/20 transition-all">
                <p className="font-medium text-white mb-1">{item.title}</p>
                <p className="text-xs text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Models Section */}
      <section id="models" className="py-32 px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-cyan-400 text-sm font-medium tracking-wider uppercase mb-4">Global Coverage</p>
            <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-6">
              Connected to AI Models Worldwide
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto">
              We analyze how your brand is interpreted across major foundation models, 
              including sovereign AI systems in MENA, Asia, and Europe.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {models.map((model) => (
              <div 
                key={model.name}
                className={`group relative p-5 bg-gradient-to-br ${model.color} border border-white/5 rounded-2xl ${model.borderColor} transition-all duration-300 cursor-default overflow-hidden`}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-white/5 to-transparent"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-3xl">{model.flag}</span>
                    <span className="px-2 py-1 bg-white/10 rounded-full text-xs text-gray-400">{model.region}</span>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-white mb-1">{model.name}</h3>
                  <p className="text-sm text-gray-400">{model.provider}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="text-center text-gray-500 text-sm mt-10">
            Direct API integrations with OpenAI, Anthropic, Google, Meta, and regional providers
          </p>
        </div>
      </section>

      {/* SEO vs GEO Section */}
      <section id="geo" className="py-32 px-6 bg-gradient-to-b from-black via-cyan-950/10 to-black">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-cyan-400 text-sm font-medium tracking-wider uppercase mb-4">The Paradigm Shift</p>
            <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-6">
              From SEO to
              <span className="bg-gradient-to-r from-cyan-400 to-cyan-200 bg-clip-text text-transparent"> GEO</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Search is no longer about blue links. It&apos;s about AI-generated answers. 
              <strong className="text-white"> 65% of searches</strong> now end without a click. 
              Your visibility depends on how LLMs interpret your brand.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-center">
                <span className="text-red-400 font-medium">Old SEO</span>
                <p className="text-xs text-gray-500 mt-1">Obsolete</p>
              </div>
              <div className="p-4 bg-cyan-500/10 border border-cyan-500/20 rounded-2xl text-center">
                <span className="text-cyan-400 font-medium">New GEO</span>
                <p className="text-xs text-gray-500 mt-1">Required</p>
              </div>
            </div>

            <div className="space-y-2">
              {seoVsGeo.map((item, i) => (
                <div key={i} className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl">
                    <p className="text-sm text-gray-400 line-through opacity-60">{item.seo}</p>
                  </div>
                  <div className="p-4 bg-white/[0.02] border border-cyan-400/20 rounded-xl">
                    <p className="text-sm text-white">{item.geo}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6 max-w-3xl mx-auto mt-16">
            <div className="text-center p-6 bg-white/[0.02] border border-white/5 rounded-2xl">
              <p className="text-4xl font-light text-cyan-400 mb-2">65%</p>
              <p className="text-xs text-gray-500">Zero-click searches</p>
            </div>
            <div className="text-center p-6 bg-white/[0.02] border border-white/5 rounded-2xl">
              <p className="text-4xl font-light text-cyan-400 mb-2">80%</p>
              <p className="text-xs text-gray-500">Queries trigger AI</p>
            </div>
            <div className="text-center p-6 bg-white/[0.02] border border-white/5 rounded-2xl">
              <p className="text-4xl font-light text-cyan-400 mb-2">9+</p>
              <p className="text-xs text-gray-500">LLMs analyzed</p>
            </div>
          </div>
        </div>
      </section>

      {/* Regional Coverage Map */}
      <section id="coverage" className="py-32 px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-cyan-400 text-sm font-medium tracking-wider uppercase mb-4">Global Presence</p>
            <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-6">
              Regional Coverage
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto">
              Monitoring AI visibility across key markets with local expertise and infrastructure.
            </p>
          </div>

          <div className="relative bg-white/[0.02] border border-white/5 rounded-3xl p-8 overflow-hidden">
            <div className="relative h-80 md:h-96">
              {/* Dotted World Map */}
              <svg viewBox="0 0 1000 500" className="w-full h-full">
                <defs>
                  <pattern id="dots" x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse">
                    <circle cx="2" cy="2" r="1.5" fill="#22d3ee" fillOpacity="0.4"/>
                  </pattern>
                  <mask id="worldMask">
                    {/* North America */}
                    <path d="M50,140 Q80,100 140,90 L180,85 Q220,80 250,90 L280,100 Q310,110 320,130 L325,150 Q330,170 320,190 L300,210 Q280,230 250,240 L220,245 Q190,250 160,255 L140,260 Q120,265 100,260 L80,250 Q60,240 50,220 L45,200 Q40,180 45,160 Z" fill="white"/>
                    <path d="M100,60 Q140,40 200,45 L260,50 Q300,55 320,70 L330,90 Q340,100 330,110 L300,115 Q260,120 220,115 L180,110 Q140,105 110,95 L90,85 Q75,75 80,65 Z" fill="white"/>
                    <path d="M120,260 Q140,255 160,260 L180,270 Q200,280 210,300 L215,320 Q220,340 210,350 L190,355 Q170,360 155,350 L140,335 Q125,320 120,300 L115,280 Q110,265 120,260 Z" fill="white"/>
                    {/* South America */}
                    <path d="M200,360 Q230,350 260,360 L280,380 Q300,400 305,430 L310,460 Q310,490 290,510 L260,525 Q230,535 200,520 L180,500 Q165,480 170,450 L175,420 Q180,390 185,370 Z" fill="white"/>
                    {/* Europe */}
                    <path d="M440,80 Q470,70 510,75 L550,85 Q580,95 590,115 L595,140 Q600,165 590,185 L575,200 Q555,215 525,220 L490,218 Q460,215 440,200 L425,180 Q410,160 415,135 L425,110 Q430,90 440,80 Z" fill="white"/>
                    <path d="M420,95 Q430,90 445,95 L455,105 Q460,115 455,125 L445,130 Q435,135 425,130 L420,120 Q415,110 420,100 Z" fill="white"/>
                    <path d="M480,45 Q500,40 520,50 L530,65 Q535,80 525,90 L510,95 Q495,98 485,90 L478,75 Q472,60 480,50 Z" fill="white"/>
                    {/* Africa */}
                    <path d="M460,220 Q490,210 530,220 L560,240 Q585,265 590,300 L595,340 Q595,380 580,410 L555,440 Q525,465 490,470 L455,465 Q425,455 410,425 L400,390 Q395,350 405,310 L420,270 Q440,240 460,220 Z" fill="white"/>
                    {/* Middle East */}
                    <path d="M560,180 Q590,170 620,180 L645,195 Q665,215 665,245 L660,275 Q650,300 625,310 L595,315 Q565,315 545,295 L535,270 Q530,245 540,220 L550,195 Q555,185 560,180 Z" fill="white"/>
                    {/* India */}
                    <path d="M680,200 Q710,190 740,200 L760,220 Q775,245 770,275 L760,305 Q745,330 715,340 L685,335 Q660,325 650,300 L645,270 Q645,240 660,220 Z" fill="white"/>
                    {/* China */}
                    <path d="M750,130 Q800,120 850,130 L890,150 Q920,175 915,210 L905,245 Q890,275 850,285 L810,290 Q770,290 745,270 L725,245 Q710,215 720,180 L735,150 Q745,135 750,130 Z" fill="white"/>
                    {/* Southeast Asia */}
                    <path d="M780,300 Q810,290 840,300 L860,320 Q875,345 870,375 L860,400 Q845,420 815,425 L785,420 Q760,410 755,385 L755,355 Q760,325 780,300 Z" fill="white"/>
                    {/* Japan */}
                    <path d="M900,160 Q920,155 935,165 L945,180 Q950,200 940,215 L925,225 Q905,230 895,220 L885,200 Q880,180 890,165 Z" fill="white"/>
                    {/* Korea */}
                    <path d="M875,175 Q885,170 895,178 L900,190 Q902,205 892,212 L880,215 Q870,212 868,200 L870,185 Q872,178 875,175 Z" fill="white"/>
                    {/* Australia */}
                    <path d="M820,420 Q860,405 910,415 L950,435 Q980,460 980,495 L970,530 Q955,560 915,570 L865,570 Q825,560 805,530 L795,495 Q795,455 820,420 Z" fill="white"/>
                    <path d="M960,540 Q975,535 985,545 L990,560 Q990,575 980,585 L965,588 Q950,585 950,570 L955,555 Q958,545 965,540 Z" fill="white"/>
                    {/* Indonesia */}
                    <path d="M800,380 Q830,375 860,385 L890,400 Q910,420 900,445 L870,455 Q840,460 815,450 L795,435 Q780,415 790,395 Z" fill="white"/>
                  </mask>
                </defs>
                
                <rect x="0" y="0" width="1000" height="500" fill="url(#dots)" mask="url(#worldMask)"/>
                
                <line x1="220" y1="150" x2="440" y2="115" stroke="#22d3ee" strokeWidth="1" strokeOpacity="0.3" strokeDasharray="4,4"/>
                <line x1="440" y1="115" x2="595" y2="225" stroke="#22d3ee" strokeWidth="1" strokeOpacity="0.3" strokeDasharray="4,4"/>
                <line x1="595" y1="225" x2="815" y2="360" stroke="#22d3ee" strokeWidth="1" strokeOpacity="0.3" strokeDasharray="4,4"/>
              </svg>

              {/* Region Markers */}
              {regions.map((region) => (
                <div 
                  key={region.name}
                  className="absolute group cursor-pointer"
                  style={{ top: `${region.top}%`, left: `${region.left}%` }}
                >
                  <div className="relative">
                    <div className={`w-3 h-3 rounded-full ${region.status === 'HQ' ? 'bg-cyan-400' : 'bg-cyan-400/80'}`}></div>
                    <div className={`absolute inset-0 w-3 h-3 rounded-full ${region.status === 'HQ' ? 'bg-cyan-400' : 'bg-cyan-400/60'} animate-ping`}></div>
                  </div>
                  <div className="absolute left-5 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/95 border border-cyan-400/30 rounded-lg px-3 py-2 whitespace-nowrap z-10">
                    <p className="text-sm font-medium text-white">{region.city}</p>
                    <p className="text-xs text-gray-400">{region.name}</p>
                    {region.status === 'HQ' && <p className="text-xs text-cyan-400 font-medium">Headquarters</p>}
                  </div>
                </div>
              ))}
            </div>

            {/* Region Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              {regions.map((region) => (
                <div key={region.name} className="p-4 bg-white/[0.03] border border-white/10 rounded-xl text-center hover:border-cyan-400/30 transition-all">
                  <p className="font-medium text-white">{region.city}</p>
                  <p className="text-sm text-gray-400">{region.name}</p>
                  {region.status === 'HQ' && (
                    <span className="inline-block mt-2 px-2 py-0.5 bg-cyan-400/20 text-cyan-400 text-xs rounded-full font-medium">HQ</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-32 px-6 border-t border-white/5 bg-gradient-to-b from-cyan-950/20 to-black">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-cyan-400 text-sm font-medium tracking-wider uppercase mb-4">GEONYX INDEX</p>
            <h2 className="text-4xl md:text-5xl font-light tracking-tight">How It Works</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: '01', title: 'AI Scanning', desc: 'Query multiple LLMs simultaneously about your brand', icon: '🔍' },
              { step: '02', title: 'Entity Analysis', desc: 'Verify factual accuracy of every attribute', icon: '✓' },
              { step: '03', title: 'GEO Clustering', desc: 'Map regional interpretation differences', icon: '🌍' },
              { step: '04', title: 'Index Score', desc: 'Get your unified GEONYX INDEX (0-1000)', icon: '📊' }
            ].map((item, i) => (
              <div key={i} className="relative p-6 bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/10 rounded-2xl hover:border-cyan-400/50 transition-all group">
                <div className="absolute left-0 top-6 bottom-6 w-1 bg-cyan-400 rounded-full"></div>
                <div className="text-5xl font-bold text-cyan-400/20 absolute top-4 right-4 group-hover:text-cyan-400/30 transition-colors">{item.step}</div>
                
                <div className="relative z-10 pl-4">
                  <div className="text-2xl mb-3">{item.icon}</div>
                  <h3 className="font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-400">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 px-6 bg-gradient-to-b from-black to-cyan-950/20">
        <div className="max-w-xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-cyan-400 text-sm font-medium tracking-wider uppercase mb-4">Get Started</p>
            <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-4">
              Request Access
            </h2>
            <p className="text-gray-400">
              Join leading organizations optimizing their AI visibility.
            </p>
          </div>

          {submitted ? (
            <div className="text-center p-12 bg-cyan-400/10 border border-cyan-400/30 rounded-3xl">
              <div className="w-16 h-16 bg-cyan-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-black text-2xl">✓</span>
              </div>
              <h3 className="text-xl font-medium mb-2">Thank You!</h3>
              <p className="text-gray-400">We&apos;ll be in touch within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl focus:border-cyan-400/50 focus:outline-none transition-colors placeholder:text-gray-600"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Work Email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl focus:border-cyan-400/50 focus:outline-none transition-colors placeholder:text-gray-600"
                />
              </div>
              <input
                type="text"
                name="company"
                placeholder="Company / Organization"
                value={formData.company}
                onChange={(e) => setFormData({...formData, company: e.target.value})}
                className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl focus:border-cyan-400/50 focus:outline-none transition-colors placeholder:text-gray-600"
              />
              <textarea
                name="message"
                placeholder="Tell us about your AI visibility goals..."
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl focus:border-cyan-400/50 focus:outline-none transition-colors placeholder:text-gray-600 resize-none"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-cyan-400 text-black font-medium rounded-xl hover:bg-cyan-300 transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Request'}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
            <div>
              <span className="text-2xl font-bold">GEONYX</span>
              <p className="text-gray-500 text-sm mt-1">AI Visibility Index</p>
            </div>
            <div className="flex items-center gap-6 text-sm text-gray-500">
              <button onClick={() => scrollTo('models')} className="hover:text-white transition-colors">Models</button>
              <button onClick={() => scrollTo('geo')} className="hover:text-white transition-colors">SEO to GEO</button>
              <button onClick={() => scrollTo('coverage')} className="hover:text-white transition-colors">Coverage</button>
              <button onClick={() => scrollTo('contact')} className="hover:text-white transition-colors">Contact</button>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-white/5">
            <p className="text-sm text-gray-500">
              © 2026 GEONYX. All rights reserved.
            </p>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span>SOC 2</span>
              <span>GDPR</span>
              <span>ISO 27001</span>
              <span>Gov-Ready</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
