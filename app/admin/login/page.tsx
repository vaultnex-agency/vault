'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase/client'
import { motion } from 'framer-motion'
import { Lock } from 'lucide-react'

// Using the same premium background from the hero for the login portal
const VIDEO_URL = 'https://videos.pexels.com/video-files/3163534/3163534-hd_1920_1080_30fps.mp4'
const VIDEO_FALLBACK = 'https://videos.pexels.com/video-files/2759484/2759484-hd_1920_1080_30fps.mp4'

export default function AdminLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      router.push('/admin')
    }
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black selection:bg-white/30">
      
      {/* ─── VIDEO BACKGROUND ─── */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-60"
          style={{ transform: 'scale(1.05)', filter: 'grayscale(100%) blur(8px)' }}
        >
          <source src={VIDEO_URL} type="video/mp4" />
          <source src={VIDEO_FALLBACK} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-[420px] px-6"
      >
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-6">
            <Lock className="w-5 h-5 text-white/70" />
          </div>
          <h1 className="font-heading text-2xl font-bold tracking-tight text-white mb-2">
            Command Center
          </h1>
          <p className="text-sm text-white/40 font-body">
            Authorized personnel only.
          </p>
        </div>

        {/* Form Card */}
        <div className="backdrop-blur-2xl bg-black/40 border border-white/10 rounded-2xl p-8 shadow-2xl">
          <form onSubmit={handleLogin} className="flex flex-col gap-6">
            
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-[11px] uppercase tracking-widest text-white/50 font-medium">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                placeholder="admin@vaultnex.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-transparent border-b border-white/20 px-0 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-white transition-colors"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="password" className="text-[11px] uppercase tracking-widest text-white/50 font-medium">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-transparent border-b border-white/20 px-0 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-white transition-colors"
              />
            </div>

            {error && (
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-red-400 text-sm bg-red-400/10 border border-red-400/20 px-4 py-3 rounded-lg"
              >
                {error}
              </motion.p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-4 w-full bg-white text-black font-semibold rounded-full py-4 text-sm hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Authenticating...' : 'Sign In'}
            </button>
          </form>
        </div>

      </motion.div>
    </div>
  )
}
