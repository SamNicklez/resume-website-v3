import { Cpu, Shield, GraduationCap } from 'lucide-react';

const highlights = [
  {
    icon: <Cpu size={22} className="text-blue-600" />,
    title: 'PLM & Defense Systems',
    description:
      'Leading Teamcenter RAC & Active Workspace customization for mission-critical USAF programs at Siemens Government Technologies — from BMIDE data modeling to full environment deployment.',
  },
  {
    icon: <Shield size={22} className="text-blue-600" />,
    title: 'Security & Compliance',
    description:
      'CompTIA Security+ and ASEP certified, with hands-on experience building secure, high-availability PLM solutions that meet the rigorous compliance standards of regulated defense environments.',
  },
  {
    icon: <GraduationCap size={22} className="text-blue-600" />,
    title: 'Engineering Foundation',
    description:
      'BSE in Computer Science & Engineering from the University of Iowa — covering software architecture, web development, databases, algorithms, and object-oriented design. Currently pursuing an MS in Systems Engineering at Weber State University, with a focus on MBSE, digital engineering, systems architecture, requirements analysis, and verification & validation.',
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-blue-600 font-semibold text-sm uppercase tracking-widest">
            About Me
          </span>
          <h2 className="text-4xl font-bold text-slate-900 mt-2">
            Full-Stack PLM.
          </h2>
          <p className="text-slate-500 mt-4 max-w-2xl mx-auto text-lg leading-relaxed">
            I approach PLM through the lens of the Digital Thread and Model-Based Systems
            Engineering — ensuring that every configuration decision, workflow, and data model
            is built for long-term scalability, not just today's requirement.
          </p>
        </div>

        {/* Highlight Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {highlights.map((item) => (
            <div
              key={item.title}
              className="bg-blue-50 rounded-2xl p-8 border border-blue-100 hover:shadow-lg hover:border-blue-300 transition-all duration-300"
            >
              <div className="bg-white rounded-xl w-12 h-12 flex items-center justify-center mb-5 shadow-sm border border-blue-100">
                {item.icon}
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">{item.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}