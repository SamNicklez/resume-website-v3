import { ArrowDown } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center text-center px-6 pt-24 bg-gradient-to-br from-white via-blue-50 to-sky-100">

      {/* Heading */}
      <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 mb-4 leading-tight">
        Sam{' '}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-sky-400">
          Nicklaus
        </span>
      </h1>

      {/* Subheading */}
      <p className="text-xl md:text-2xl text-slate-600 font-medium mb-4 max-w-2xl">
        PLM Consultant & Defense Systems Specialist
      </p>

      {/* Description — Updated */}
      <p className="text-base md:text-lg text-slate-500 max-w-2xl mb-10 leading-relaxed">
        Delivering enterprise Teamcenter solutions across the full PLM stack — from BMIDE data
        modeling and Active Workspace customization to workflow automation and CI/CD pipeline
        architecture. Trusted by defense programs to build secure, scalable systems that work
        in mission-critical environments. ASEP & CompTIA Security+ certified.
      </p>

      {/* CTA Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 mb-16">
        <a
          href="#contact"
          className="bg-blue-600 text-white px-8 py-3.5 rounded-full font-semibold text-base hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-blue-200"
        >
          Work With Me
        </a>
        <a
          href="#about"
          className="border-2 border-blue-300 text-blue-700 px-8 py-3.5 rounded-full font-semibold text-base hover:bg-blue-50 transition-all duration-200"
        >
          Learn More
        </a>
      </div>

      {/* Scroll Indicator */}
      <a href="#about" className="animate-bounce text-blue-400 hover:text-blue-600 transition-colors">
        <ArrowDown size={28} />
      </a>
    </section>
  );
}