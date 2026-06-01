'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FileText, 
  Plus, 
  Edit2, 
  Trash2, 
  Eye, 
  EyeOff, 
  Check, 
  X, 
  Sparkles, 
  ArrowLeft,
  BookOpen
} from 'lucide-react'
import Link from 'next/link'

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<string | null>(null)
  const [form, setForm] = useState<any>({})
  const [saving, setSaving] = useState(false)

  useEffect(() => { load() }, [])

  async function load() {
    const { data } = await ((supabase.from as any)('blog_posts') as any).select('*').order('created_at', { ascending: false })
    setPosts(data || [])
    setLoading(false)
  }

  function startNew() {
    setEditing('new')
    setForm({ title: '', slug: '', excerpt: '', content: '', tags: '', is_published: false })
  }

  function startEdit(post: any) {
    setEditing(post.id)
    setForm({ 
      title: post.title, 
      slug: post.slug, 
      excerpt: post.excerpt || '', 
      content: post.content || '', 
      tags: (post.tags || []).join(', '), 
      is_published: post.is_published 
    })
  }

  async function save() {
    if (!form.title) return
    setSaving(true)
    const payload = {
      title: form.title,
      slug: form.slug || form.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, ''),
      excerpt: form.excerpt,
      content: form.content,
      tags: form.tags.split(',').map((t: string) => t.trim()).filter(Boolean),
      is_published: form.is_published,
      published_at: form.is_published ? new Date().toISOString() : null,
      updated_at: new Date().toISOString(),
    }
    if (editing === 'new') {
      await ((supabase.from as any)('blog_posts') as any).insert(payload)
    } else {
      await ((supabase.from as any)('blog_posts') as any).update(payload).eq('id', editing)
    }
    await load()
    setEditing(null)
    setSaving(false)
  }

  async function del(id: string) {
    if (!confirm('Delete this post?')) return
    await (supabase.from as any)('blog_posts').delete().eq('id', id)
    setPosts(prev => prev.filter(p => p.id !== id))
  }

  async function togglePublish(id: string, current: boolean) {
    await ((supabase.from as any)('blog_posts') as any).update({ 
      is_published: !current, 
      published_at: !current ? new Date().toISOString() : null 
    }).eq('id', id)
    setPosts(prev => prev.map(p => p.id === id ? { ...p, is_published: !current } : p))
  }

  return (
    <div className="p-8 md:p-12 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-12">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-3 mb-2">
            <Link href="/admin" className="text-white/40 hover:text-white transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="font-heading text-4xl font-bold tracking-tight text-white">
              Blog Posts
            </h1>
          </div>
          <p className="text-white/40 font-body">Publish articles, updates, and design tips.</p>
        </motion.div>

        <motion.button 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          onClick={startNew}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white text-black font-semibold hover:scale-[1.02] active:scale-[0.98] transition-all text-sm shadow-lg shadow-white/5 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Add Post
        </motion.button>
      </div>

      {/* Editor & List */}
      <div className="space-y-8">
        <AnimatePresence mode="wait">
          {editing && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="backdrop-blur-2xl bg-white/[0.02] border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl relative">
                <div className="absolute -inset-px opacity-100 bg-gradient-to-br from-white/5 to-transparent rounded-2xl pointer-events-none" />
                
                <h3 className="font-heading text-xl font-bold text-white mb-6 flex items-center gap-2 relative z-10">
                  <Sparkles className="w-5 h-5 text-amber-400" />
                  {editing === 'new' ? 'Create New Post' : 'Edit Blog Post'}
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 relative z-10">
                  <Field label="Post Title *">
                    <input 
                      className="w-full bg-transparent border-b border-white/15 px-0 py-2.5 text-white placeholder:text-white/20 focus:outline-none focus:border-white transition-colors" 
                      value={form.title} 
                      onChange={e => setForm({ ...form, title: e.target.value })} 
                      placeholder="e.g. Design Systems of the Future" 
                    />
                  </Field>
                  <Field label="Custom Slug (leave blank to auto-generate)">
                    <input 
                      className="w-full bg-transparent border-b border-white/15 px-0 py-2.5 text-white placeholder:text-white/20 focus:outline-none focus:border-white transition-colors" 
                      value={form.slug} 
                      onChange={e => setForm({ ...form, slug: e.target.value })} 
                      placeholder="e.g. design-systems-future" 
                    />
                  </Field>
                </div>

                <div className="mb-6 relative z-10">
                  <Field label="Short Excerpt / Summary">
                    <input 
                      className="w-full bg-transparent border-b border-white/15 px-0 py-2.5 text-white placeholder:text-white/20 focus:outline-none focus:border-white transition-colors" 
                      value={form.excerpt} 
                      onChange={e => setForm({ ...form, excerpt: e.target.value })} 
                      placeholder="e.g. A review of modern aesthetic design trends heading into 2027..." 
                    />
                  </Field>
                </div>

                <div className="mb-6 relative z-10">
                  <Field label="Content (Markdown supported)">
                    <textarea 
                      className="w-full bg-transparent border border-white/10 rounded-xl p-4 text-white placeholder:text-white/20 focus:outline-none focus:border-white/30 transition-colors h-64 resize-y font-mono text-sm leading-relaxed" 
                      value={form.content} 
                      onChange={e => setForm({ ...form, content: e.target.value })} 
                      placeholder="# Your Blog Post Starts Here..." 
                    />
                  </Field>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 relative z-10">
                  <Field label="Tags (comma-separated)">
                    <input 
                      className="w-full bg-transparent border-b border-white/15 px-0 py-2.5 text-white placeholder:text-white/20 focus:outline-none focus:border-white transition-colors" 
                      value={form.tags} 
                      onChange={e => setForm({ ...form, tags: e.target.value })} 
                      placeholder="e.g. design, tips, growth" 
                    />
                  </Field>

                  <div className="flex items-end pb-2">
                    <label className="flex items-center gap-3 cursor-pointer text-sm text-white/60 hover:text-white transition-colors select-none">
                      <input 
                        type="checkbox" 
                        checked={form.is_published} 
                        onChange={e => setForm({ ...form, is_published: e.target.checked })} 
                        className="w-4 h-4 rounded border-white/20 bg-transparent text-white focus:ring-0 focus:ring-offset-0"
                      />
                      Publish immediately
                    </label>
                  </div>
                </div>

                <div className="flex gap-3 relative z-10">
                  <button 
                    onClick={save} 
                    className="px-6 py-3 rounded-full bg-white text-black font-semibold text-sm hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 cursor-pointer"
                    disabled={saving}
                  >
                    {saving ? 'Saving...' : 'Save Post'}
                  </button>
                  <button 
                    onClick={() => setEditing(null)} 
                    className="px-6 py-3 rounded-full border border-white/10 hover:bg-white/5 text-white text-sm transition-all cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Posts List */}
        <div className="rounded-2xl bg-white/[0.02] border border-white/10 overflow-hidden shadow-xl">
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <h2 className="font-heading text-lg font-semibold text-white">All Articles</h2>
            <span className="text-sm text-white/40">{posts.length} Items</span>
          </div>

          <div className="divide-y divide-white/5">
            {loading ? (
              <div className="p-12 text-center text-white/30 text-sm">Loading articles...</div>
            ) : posts.length === 0 ? (
              <div className="p-12 text-center text-white/30 text-sm">No blog posts found.</div>
            ) : (
              posts.map((post) => (
                <div 
                  key={post.id} 
                  className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-white/[0.01] transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-white/40">
                      <BookOpen className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="font-medium text-white text-base">{post.title}</span>
                        <span className={`inline-flex items-center gap-1 text-[9px] uppercase tracking-widest font-bold px-2 py-0.5 rounded border ${
                          post.is_published 
                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                            : 'bg-white/5 text-white/40 border-white/10'
                        }`}>
                          {post.is_published ? 'Published' : 'Draft'}
                        </span>
                      </div>
                      
                      <p className="text-xs text-white/40 mb-2">
                        slug: /{post.slug} · Created on {new Date(post.created_at).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                      </p>
                      
                      {post.tags && post.tags.length > 0 && (
                        <div className="flex items-center gap-1.5 flex-wrap">
                          {post.tags.map((tag: string) => (
                            <span key={tag} className="text-[10px] bg-white/5 text-white/40 px-2 py-0.5 rounded border border-white/[0.02]">
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 self-end md:self-center">
                    <button 
                      onClick={() => togglePublish(post.id, post.is_published)} 
                      className={`p-2.5 rounded-lg border transition-all cursor-pointer ${
                        post.is_published 
                          ? 'border-emerald-500/15 hover:border-emerald-500/30 hover:bg-emerald-500/10 text-emerald-400' 
                          : 'border-white/10 hover:border-white/20 hover:bg-white/5 text-white/40 hover:text-white/70'
                      }`}
                      title={post.is_published ? 'Switch to Draft' : 'Publish Article'}
                    >
                      {post.is_published ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    </button>
                    
                    <button 
                      onClick={() => startEdit(post)} 
                      className="p-2.5 rounded-lg border border-white/10 hover:border-white/20 hover:bg-white/5 text-white/70 hover:text-white transition-all cursor-pointer"
                      title="Edit Post"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    
                    <button 
                      onClick={() => del(post.id)} 
                      className="p-2.5 rounded-lg border border-red-500/10 hover:border-red-500/30 hover:bg-red-500/10 text-red-400/70 hover:text-red-400 transition-all cursor-pointer"
                      title="Delete Post"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

    </div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <label className="text-[10px] uppercase tracking-widest text-white/40 font-semibold">
        {label}
      </label>
      {children}
    </div>
  )
}
