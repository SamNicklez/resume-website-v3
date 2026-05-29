'use client';

import { useState } from 'react';
import { Menu, X, Search } from 'lucide-react';
import { useRouter } from 'next/navigation';

const navLinks = [
  { label: 'About', href: '/#about' },
  { label: 'Skills', href: '/#skills' },
  { label: 'Experience', href: '/#experience' },
  { label: 'Contact', href: '/#contact' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState('');
  const router = useRouter();

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!query.trim()) return;
    router.push(`/blog/search?q=${encodeURIComponent(query.trim())}`);
    setQuery('');
    setMenuOpen(false);
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-blue-100 shadow-sm">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between gap-6">

        {/* ── Logo ── */}
        <a href="/#" className="text-xl font-bold text-blue-700 tracking-tight shrink-0">
          Sam Nicklaus
        </a>

        {/* ── Desktop Links + Search ── */}
        <ul className="hidden md:flex items-center gap-6 ml-auto">
          {navLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="text-slate-600 hover:text-blue-600 font-medium transition-colors duration-200"
              >
                {link.label}
              </a>
            </li>
          ))}

          {/* ── Blog Pill ── */}
          <li>
            <a
              href="/blog"
              className="bg-blue-600 text-white px-4 py-1.5 rounded-full text-sm font-semibold hover:bg-blue-700 transition-colors duration-200"
            >
              Blog
            </a>
          </li>

          {/* ── Search Bar ── */}
          <li>
            <form onSubmit={handleSearch} className="flex items-center gap-1 bg-slate-100 border border-blue-100 rounded-full px-3 py-1.5">
              
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search posts..."
                className="bg-transparent text-sm text-slate-700 placeholder-slate-400 focus:outline-none w-36"
              />
            </form>
          </li>
        </ul>

        {/* ── Mobile: Menu Toggle ── */}
        <button
          className="md:hidden text-slate-700"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* ── Mobile Dropdown ── */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-blue-100 px-6 pb-4">
          <ul className="flex flex-col gap-4 mt-4">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-slate-600 hover:text-blue-600 font-medium transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}

            {/* ── Blog Pill ── */}
            <li>
              <a
                href="/blog"
                onClick={() => setMenuOpen(false)}
                className="inline-block bg-blue-600 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-blue-700 transition-colors duration-200"
              >
                Blog
              </a>
            </li>

            {/* ── Let's Connect ── */}
            <li>
              <a
                href="/#contact"
                onClick={() => setMenuOpen(false)}
                className="inline-block bg-slate-700 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-slate-800 transition-colors"
              >
                Let's Connect
              </a>
            </li>

            {/* ── Mobile Search ── */}
            <li>
              <form onSubmit={handleSearch} className="flex items-center gap-2 bg-slate-100 border border-blue-100 rounded-full px-4 py-2">
                
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search posts..."
                  className="bg-transparent text-sm text-slate-700 placeholder-slate-400 focus:outline-none flex-1"
                />
              </form>
            </li>

          </ul>
        </div>
      )}
    </nav>
  );
}