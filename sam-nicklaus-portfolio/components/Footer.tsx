export default function Footer() {
  return (
    <footer className="bg-white border-t border-blue-100 py-8 text-center text-sm text-slate-400">
      <p>© {new Date().getFullYear()} Sam Nicklaus · Built with Next.js & Tailwind CSS</p>
    </footer>
  );
}