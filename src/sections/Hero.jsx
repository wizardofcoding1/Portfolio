import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'
import { FileText, ArrowRight, Terminal, Cpu, ShieldAlert, Sparkles, Send } from 'lucide-react'
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa'
import { personalInfo } from '../data/personalInfo'
import MagneticButton from '../components/ui/MagneticButton'

export default function Hero() {
  const [activeTab, setActiveTab] = useState('console') // 'console' | 'system' | 'ai'
  const [isFlipped, setIsFlipped] = useState(false)
  const [terminalHistory, setTerminalHistory] = useState([
    { type: 'input', text: 'systemctl start dev-server' },
    { type: 'output', text: '➜ Initializing Kartik Varma AI module...' },
    { type: 'output', text: '➜ Connecting to database: PostgreSQL (Port 5432)... OK' },
    { type: 'output', text: '➜ Clerk authentication service active.' },
    { type: 'output', text: '➜ Developer environment ready on http://localhost:3000' },
  ])
  const [inputValue, setInputValue] = useState('')
  const terminalEndRef = useRef(null)

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [terminalHistory])

  const handleCommandSubmit = (e) => {
    e.preventDefault()
    if (!inputValue.trim()) return

    const cmd = inputValue.trim().toLowerCase()
    let response = ''

    if (cmd === 'help') {
      response = 'Available CLI actions: skills | projects | info | clear'
    } else if (cmd === 'skills') {
      response = 'Proficiencies: React, Next.js, Node.js, Express, MongoDB, PostgreSQL, JWT, Supabase'
    } else if (cmd === 'projects') {
      response = 'Featured: Careerly (AI Platform) | FinTrack (Finance Tracker) | NEXUS-HR'
    } else if (cmd === 'info') {
      response = 'Kartik Ramesh Varma — Full Stack Developer based in Mumbai, India. GPA: 8.35/10.'
    } else if (cmd === 'clear') {
      setTerminalHistory([])
      setInputValue('')
      return
    } else {
      response = `Command not recognized: "${cmd}". Type "help" to see available actions.`
    }

    setTerminalHistory((prev) => [
      ...prev,
      { type: 'input', text: cmd },
      { type: 'output', text: response },
    ])
    setInputValue('')
  }

  const socialIcons = {
    github: FaGithub,
    linkedin: FaLinkedin,
    twitter: FaTwitter,
  }

  return (
    <section 
      id="hero" 
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden bg-transparent"
    >
      {/* Background radial overlays */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute -top-[10%] left-[20%] w-[550px] h-[550px] rounded-full opacity-[0.12] blur-[130px]"
          style={{
            background: 'radial-gradient(circle, #2563EB 0%, transparent 70%)',
          }}
        />
        <div 
          className="absolute bottom-[20%] right-[-10%] w-[450px] h-[450px] rounded-full opacity-[0.05] blur-[110px]"
          style={{
            background: 'radial-gradient(circle, #38BDF8 0%, transparent 70%)',
          }}
        />
      </div>

      <div className="container-custom relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">
        
        {/* Left Side: Identity Info */}
        <div className="lg:col-span-6 flex flex-col items-start text-left">
          {/* Availability Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#2563EB]/30 bg-[#2563EB]/5 text-xs font-grotesk text-[#2563EB] mb-6 select-none"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2563EB] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#2563EB]"></span>
            </span>
            {personalInfo.availability}
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl sm:text-6xl md:text-7xl font-black font-sora tracking-tight text-[#1E293B] mb-6 select-none leading-none"
          >
            I'm <span className="gradient-text">{personalInfo.firstName}</span>
            <br />
            <span className="font-extralight gradient-text">{personalInfo.lastName}</span>
          </motion.h1>

          {/* Roles */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-lg sm:text-xl md:text-2xl font-grotesk font-medium text-slate-600 mb-8 h-10"
          >
            A{' '}
            <span className="text-[#1E293B] border-b-2 border-[#2563EB] pb-1">
              <TypeAnimation
                sequence={[
                  ...personalInfo.roles.flatMap(role => [role, 2000]),
                ]}
                wrapper="span"
                cursor={true}
                repeat={Infinity}
              />
            </span>
          </motion.div>

          {/* Short introduction bio */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="text-sm sm:text-base font-grotesk text-slate-600 max-w-xl mb-10 leading-relaxed"
          >
            {personalInfo.bio}
          </motion.p>

          {/* Action Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-10 w-full sm:w-auto"
          >
            {/* CTA Contact */}
            <MagneticButton
              onClick={() => {
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="px-6 py-3.5 rounded-xl font-grotesk font-bold text-sm border border-[#2563EB]/30 bg-[#2563EB]/10 text-[#2563EB] hover:bg-[#2563EB]/20 transition-all flex items-center justify-center gap-2 cursor-none"
            >
              Contact Me
              <ArrowRight size={16} />
            </MagneticButton>

            {/* CTA Download Resume */}
            <a
              href={personalInfo.resumeUrl}
              download="Kartik_Varma_Resume.pdf"
              className="px-6 py-3.5 rounded-xl font-grotesk font-bold text-sm border border-slate-200 bg-slate-100/70 text-[#1E293B] hover:bg-slate-100/90 transition-all flex items-center justify-center gap-2 cursor-none text-center"
            >
              <FileText size={16} />
              Download Resume
            </a>
          </motion.div>

          {/* Social icons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="flex items-center gap-4"
          >
            {Object.entries(personalInfo.socials).map(([platform, url], index) => {
              const Icon = socialIcons[platform] || FaGithub
              return (
                <a
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl flex items-center justify-center border border-slate-200/50 bg-slate-100/70 text-slate-600 hover:text-[#2563EB] hover:border-[#2563EB]/30 hover:bg-[#2563EB]/5 transition-all duration-300"
                  aria-label={platform}
                >
                  <Icon size={16} />
                </a>
              )
            })}
          </motion.div>
        </div>

        {/* Right Side: Profile Photo + AI Console */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3, type: 'spring', stiffness: 100 }}
          className="lg:col-span-6 w-full flex flex-col gap-5"
        >
          {/* ── 3D Flip Profile Card ── */}
          <div
            className="relative cursor-pointer"
            style={{ perspective: '1100px', height: '118px' }}
            onClick={() => setIsFlipped(f => !f)}
            title={isFlipped ? 'Click to flip back' : 'Click to learn about me'}
          >
            <motion.div
              animate={{ rotateY: isFlipped ? 180 : 0 }}
              transition={{ duration: 0.62, ease: [0.22, 1, 0.36, 1] }}
              style={{ transformStyle: 'preserve-3d', width: '100%', height: '100%', position: 'relative' }}
            >

              {/* ── FRONT FACE ── */}
              <div
                className="absolute inset-0 rounded-2xl border border-slate-200 bg-white shadow-[0_4px_24px_rgba(37,99,235,0.10),0_1px_4px_rgba(0,0,0,0.04)] "
                style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
              >
                {/* Decorative background glow top-left */}
                <div
                  aria-hidden="true"
                  className="absolute -left-10 -top-10 w-44 h-44 rounded-full pointer-events-none"
                  style={{ background: 'radial-gradient(circle, rgba(37,99,235,0.09) 0%, transparent 70%)' }}
                />
                {/* Decorative dot grid top-right */}
                <div aria-hidden="true" className="absolute top-3 right-3 grid grid-cols-4 gap-[5px] opacity-[0.15]">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <span key={i} className="w-[3px] h-[3px] rounded-full bg-[#2563EB]" />
                  ))}
                </div>

                <div className="relative flex items-center gap-5 p-5 h-full z-10">
                  {/* Profile Photo */}
                  <div className="relative flex-shrink-0 animate-float-slow z-50">
                    <div
                      className="rounded-full p-[3px]"
                      style={{
                        background: 'linear-gradient(135deg, #2563EB 0%, #38BDF8 100%)',
                        boxShadow: '0 0 20px rgba(37,99,235,0.28), 0 0 48px rgba(56,189,248,0.10)',
                      }}
                    >
                      <div className="rounded-full p-[2px] bg-white">
                        <img
                          src="/profile_photo.jpg"
                          alt="Kartik Ramesh Varma — Full-Stack Developer"
                          className="w-[88px] h-[88px] rounded-full object-cover object-top block"
                        />
                      </div>
                    </div>
                    {/* Online status dot */}
                    <span className="absolute bottom-[6px] right-[4px] flex items-center justify-center w-[14px] h-[14px] rounded-full bg-white shadow">
                      <span className="relative flex w-[9px] h-[9px]">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex rounded-full w-[9px] h-[9px] bg-emerald-500" />
                      </span>
                    </span>
                  </div>

                  {/* Identity Info */}
                  <div className="flex flex-col gap-1.5 text-left z-10 flex-1 min-w-0">
                    <p className="text-[10px] font-grotesk font-extrabold text-[#2563EB] uppercase tracking-[0.15em]">
                      Full-Stack Developer
                    </p>
                    <h2 className="text-[18px] font-black font-sora text-[#0F172A] leading-tight truncate">
                      Kartik Ramesh Varma
                    </h2>
                    <p className="text-[11px] font-grotesk text-slate-500 leading-snug">
                      📍 Mumbai, India
                    </p>
                    <div className="flex gap-1.5 mt-1 flex-wrap">
                      {['React', 'Next.js', 'Node.js', 'MongoDB'].map((skill) => (
                        <span
                          key={skill}
                          className="px-2 py-[2px] text-[9px] font-grotesk font-bold rounded-full text-[#2563EB] border border-[#2563EB]/25"
                          style={{ backgroundColor: 'rgba(37,99,235,0.07)' }}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Flip hint */}
                  <div className="absolute bottom-2.5 right-3 text-[9px] font-grotesk font-bold text-slate-400 tracking-wider flex items-center gap-1">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 4v6h6M23 20v-6h-6"/><path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"/></svg>
                    click to flip
                  </div>
                </div>
              </div>

              {/* ── BACK FACE ── */}
              <div
                className="absolute inset-0 rounded-2xl overflow-hidden flex items-center"
                style={{
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)',
                  background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
                  border: '1px solid rgba(37,99,235,0.25)',
                  boxShadow: '0 0 0 1px rgba(37,99,235,0.15), 0 8px 32px rgba(0,0,0,0.3)',
                }}
              >
                {/* Left accent bar */}
                <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl"
                  style={{ background: 'linear-gradient(to bottom, #2563EB, #38BDF8)' }}
                />
                {/* Glow blob */}
                <div className="absolute top-0 right-0 w-40 h-40 rounded-full opacity-10 blur-3xl pointer-events-none"
                  style={{ background: 'radial-gradient(circle, #38BDF8, transparent)' }}
                />

                <div className="pl-7 pr-5 py-4 flex flex-col justify-center gap-2 w-full">
                  <p className="text-[9px] font-grotesk font-extrabold text-[#38BDF8] uppercase tracking-[0.18em] mb-0.5">
                    About Me
                  </p>
                  <p className="text-[12.5px] font-grotesk text-slate-300 leading-relaxed">
                    Passionate <span className="text-white font-bold">Full-Stack Developer</span> from Mumbai with a love for building scalable, beautiful web products. I specialize in React, Node.js &amp; AI-integrated systems.
                  </p>
                  <div className="flex gap-3 mt-1">
                    <span className="text-[10px] font-grotesk text-slate-400">🎓 B.Tech CSE • GPA 8.35</span>
                    <span className="text-[10px] font-grotesk text-slate-400">🚀 3+ Projects Shipped</span>
                  </div>
                </div>

                {/* Flip back hint */}
                <div className="absolute bottom-2.5 right-3 text-[9px] font-grotesk font-bold text-slate-500 tracking-wider flex items-center gap-1">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 4v6h6M23 20v-6h-6"/><path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"/></svg>
                  click to flip back
                </div>
              </div>

            </motion.div>
          </div>


          {/* Console Outer Frame */}
          <div className="w-full border border-slate-200 bg-[#FFFFFF]/80 rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.08)] flex flex-col" style={{ height: '300px' }}>
            
            {/* Header Tabs */}
            <div className="h-12 border-b border-slate-200/50 bg-[#F1F5F9] flex items-center justify-between px-4 select-none">
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-[#2563EB]/40 border border-[#2563EB]/80" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/40 border border-yellow-500/80" />
                <span className="w-3 h-3 rounded-full bg-green-500/40 border border-green-500/80" />
              </div>

              {/* Tab Selector Links */}
              <div className="flex gap-2">
                <button
                  onClick={() => setActiveTab('console')}
                  className={`px-3 py-1 rounded-md text-[10px] font-bold font-grotesk tracking-wider uppercase transition-colors ${
                    activeTab === 'console'
                      ? 'bg-[#2563EB]/10 text-[#2563EB] border border-[#2563EB]/30'
                      : 'text-slate-400 hover:text-slate-600'
                  }`}
                >
                  Console
                </button>
                <button
                  onClick={() => setActiveTab('system')}
                  className={`px-3 py-1 rounded-md text-[10px] font-bold font-grotesk tracking-wider uppercase transition-colors ${
                    activeTab === 'system'
                      ? 'bg-[#2563EB]/10 text-[#2563EB] border border-[#2563EB]/30'
                      : 'text-slate-400 hover:text-slate-600'
                  }`}
                >
                  Diagnostics
                </button>
                <button
                  onClick={() => setActiveTab('ai')}
                  className={`px-3 py-1 rounded-md text-[10px] font-bold font-grotesk tracking-wider uppercase transition-colors ${
                    activeTab === 'ai'
                      ? 'bg-[#2563EB]/10 text-[#2563EB] border border-[#2563EB]/30'
                      : 'text-slate-400 hover:text-slate-600'
                  }`}
                >
                  AI Shell
                </button>
              </div>
            </div>

            {/* Content Switcher */}
            <div className="p-5 flex-1 flex flex-col justify-between overflow-hidden">
              <AnimatePresence mode="wait">
                {activeTab === 'console' && (
                  /* TAB 1: CODE OUTPUT TERMINAL */
                  <motion.div
                    key="console"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col gap-2.5 font-mono text-[11px] sm:text-xs text-slate-600 overflow-y-auto h-[180px] text-left pr-1"
                  >
                    <div><span className="text-slate-800 font-bold">bash ~ </span> npm run start-agent-diagnostics</div>
                    <div className="text-slate-400">Loading server profile dependencies...</div>
                    <div>➜ Name: <span className="text-slate-800 font-semibold">Kartik Ramesh Varma</span></div>
                    <div>➜ Track: <span className="text-[#2563EB]">Full-Stack Web Dev</span></div>
                    <div>➜ Stack: React · Next.js · Node · Express · Mongo · Postgres</div>
                    <div>➜ Status: <span className="text-emerald-600 font-semibold">ONLINE</span></div>
                    <div>➜ Target: Clerk Auth sync check ... <span className="text-emerald-600 font-semibold">PASSED</span></div>
                    <div>➜ DB Link: Supabase WebSockets ... <span className="text-emerald-600 font-semibold">ESTABLISHED</span></div>
                    <div className="text-slate-400">All subsystems running at 100% efficiency. Ready for input.</div>
                  </motion.div>
                )}

                {activeTab === 'system' && (
                  /* TAB 2: SYSTEM DIAGNOSTIC MONITOR */
                  <motion.div
                    key="system"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col justify-between h-[180px] py-2"
                  >
                    <div className="grid grid-cols-2 gap-4">
                      {/* Stat item */}
                      <div className="p-3 border border-slate-200/50 bg-[#F1F5F9] rounded-xl flex items-center gap-3">
                        <Cpu className="text-[#2563EB]" size={18} />
                        <div className="text-left">
                          <span className="text-[9px] font-bold text-slate-500 uppercase block">SERVER STATUS</span>
                          <span className="text-xs font-bold text-slate-800 font-grotesk">ONLINE (12ms)</span>
                        </div>
                      </div>
                      {/* Stat item */}
                      <div className="p-3 border border-slate-200/50 bg-[#F1F5F9] rounded-xl flex items-center gap-3">
                        <Terminal className="text-[#10B981]" size={18} />
                        <div className="text-left">
                          <span className="text-[9px] font-bold text-slate-500 uppercase block">ACTIVE BRANCH</span>
                          <span className="text-xs font-bold text-slate-800 font-grotesk">main (Git)</span>
                        </div>
                      </div>
                    </div>

                    {/* Progress bars representing mock stats */}
                    <div className="flex flex-col gap-3.5 my-3 text-left">
                      <div className="flex flex-col gap-1">
                        <div className="flex justify-between text-[10px] font-grotesk text-slate-600 font-bold">
                          <span>MERN DEPLOYMENT ACCURACY</span>
                          <span className="text-slate-800">98%</span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-100/70 rounded-full overflow-hidden">
                          <div className="h-full bg-[#2563EB]" style={{ width: '98%' }} />
                        </div>
                      </div>

                      <div className="flex flex-col gap-1">
                        <div className="flex justify-between text-[10px] font-grotesk text-slate-600 font-bold">
                          <span>API ENDPOINT RELIABILITY</span>
                          <span className="text-slate-800">100%</span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-100/70 rounded-full overflow-hidden">
                          <div className="h-full bg-[#38BDF8]" style={{ width: '100%' }} />
                        </div>
                      </div>
                    </div>

                    {/* Diagnostic Footer */}
                    <div className="text-[10px] font-grotesk text-slate-400 border-t border-slate-200/50 pt-2 flex items-center gap-1.5 justify-start">
                      <ShieldAlert size={12} className="text-[#2563EB]" /> Subsystem protection protocols fully operational.
                    </div>
                  </motion.div>
                )}

                {activeTab === 'ai' && (
                  /* TAB 3: MOCK AI SHELL RUNNER */
                  <motion.div
                    key="ai"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col justify-between h-[180px]"
                  >
                    {/* Command Console Print */}
                    <div className="flex-1 overflow-y-auto flex flex-col gap-2 font-mono text-[11px] sm:text-xs text-left pr-1">
                      <div className="text-white/40">// Type commands below: help | skills | projects | info</div>
                      {terminalHistory.map((item, idx) => (
                        <div key={idx} className={item.type === 'input' ? 'text-white' : 'text-[#10B981]'}>
                          {item.type === 'input' ? 'guest$ ' : ''}{item.text}
                        </div>
                      ))}
                      <div ref={terminalEndRef} />
                    </div>

                    {/* Input Field Form */}
                    <form onSubmit={handleCommandSubmit} className="flex gap-2 border-t border-slate-200/50 pt-3">
                      <span className="font-mono text-xs text-slate-700 self-center">guest$</span>
                      <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Type standard command..."
                        className="flex-1 bg-transparent border-none text-white font-mono text-xs focus:outline-none placeholder-white/20"
                      />
                      <button type="submit" className="p-1 rounded bg-slate-100/70 border border-slate-200 text-slate-700 hover:text-slate-900 transition-colors">
                        <Send size={12} />
                      </button>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
