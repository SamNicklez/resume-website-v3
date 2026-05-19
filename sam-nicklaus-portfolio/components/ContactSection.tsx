'use client';

import { useState } from 'react';
import emailjs from 'emailjs-com';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';

export default function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          from_name: form.name,
          from_email: form.email,
          message: form.message,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );
      setStatus('success');
      setForm({ name: '', email: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="py-24 px-6 bg-gradient-to-br from-blue-50 to-sky-100">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-blue-600 font-semibold text-sm uppercase tracking-widest">
            Get In Touch
          </span>
          <h2 className="text-4xl font-bold text-slate-900 mt-2">Let's Work Together</h2>
          <p className="text-slate-500 mt-4 text-lg">
            Interested in consulting, collaboration, or just want to connect? Send me a message.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-3xl p-8 shadow-xl border border-blue-100 space-y-6"
        >
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              placeholder="Your full name"
              className="w-full border border-blue-200 rounded-xl px-4 py-3 text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="your@email.com"
              className="w-full border border-blue-200 rounded-xl px-4 py-3 text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Message</label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              required
              rows={5}
              placeholder="Tell me about your project or opportunity..."
              className="w-full border border-blue-200 rounded-xl px-4 py-3 text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full bg-blue-600 text-white py-3.5 rounded-xl font-semibold text-base hover:bg-blue-700 transition-all duration-200 shadow-md flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {status === 'loading' ? (
              'Sending...'
            ) : (
              <>
                <Send size={18} /> Send Message
              </>
            )}
          </button>

          {status === 'success' && (
            <div className="flex items-center gap-2 text-green-600 bg-green-50 border border-green-200 rounded-xl px-4 py-3 text-sm font-medium">
              <CheckCircle size={18} /> Message sent! I'll get back to you soon.
            </div>
          )}
          {status === 'error' && (
            <div className="flex items-center gap-2 text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm font-medium">
              <AlertCircle size={18} /> Something went wrong. Please try again or email me directly.
            </div>
          )}
        </form>

        {/* Direct Links */}
        <div className="flex justify-center gap-6 mt-8 text-sm text-slate-500">
          <a href="mailto:SamuelNicklaus@proton.me" className="hover:text-blue-600 transition-colors">
            SamuelNicklaus@proton.me
          </a>
          <span>·</span>
          <a
            href="https://linkedin.com/in/sam-nicklaus"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-600 transition-colors"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
}