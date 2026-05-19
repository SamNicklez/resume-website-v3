const experiences = [
  {
    company: 'Siemens Government Technologies',
    role: 'Software Implementation Consultant — PLM Configuration Specialist',
    duration: '2+ Years in Defense PLM',
    description:
      'Leading end-to-end Teamcenter PLM delivery for mission-critical U.S. Air Force programs. Work spans BMIDE data modeling, Active Workspace customization, workflow handler development in C++ and Perl, and CI/CD pipeline architecture using GitLab — reducing deployment cycles from 8 hours to under 60 minutes. Collaborates directly with Solutions Architects to translate complex defense requirements into functional specifications and enterprise-grade system designs.',
  },
  {
    company: 'Collins Aerospace',
    role: 'Software Engineering Intern',
    duration: 'Year long stint through their Mission Systems Business Unit',
    description:
      'Developed multi-threaded file synchronization software deployed across 30+ machines and built internal web applications to improve management visibility and employee engagement. Led a critical server migration from local infrastructure to an off-site virtual machine and engineered automated inventory management tooling that streamlined warehouse operations.',
  },
  {
    company: 'Raytheon (RTX)',
    role: 'Project Management Intern',
    duration: 'Summer through the RTX Digital Leadership Development Program',
    description:
      'Consolidated and restructured enterprise knowledge-base articles to improve organization-wide troubleshooting efficiency. Developed a Microsoft Outlook add-in that automated meeting detail population, reducing scheduling overhead for teams across the business unit.',
  },
];

export default function ExperienceSection() {
  return (
    <section id="experience" className="py-24 px-6 bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-blue-600 font-semibold text-sm uppercase tracking-widest">
            Career History
          </span>
          <h2 className="text-4xl font-bold text-slate-900 mt-2">Experience</h2>
          <p className="text-slate-500 mt-4 max-w-xl mx-auto">
            Built across defense primes, aerospace contractors, and enterprise software — always at the intersection of systems and software.
          </p>
        </div>

        <div className="space-y-8">
          {experiences.map((exp) => (
            <div
              key={exp.company}
              className="bg-white rounded-2xl p-8 border border-blue-100 shadow-sm hover:shadow-md hover:border-blue-300 transition-all duration-300"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                <h3 className="text-lg font-bold text-slate-900">{exp.role}</h3>
                <span className="text-xs font-semibold text-blue-500 bg-blue-50 border border-blue-200 px-3 py-1 rounded-full mt-2 sm:mt-0 w-fit">
                  {exp.duration}
                </span>
              </div>
              <p className="text-blue-700 font-semibold text-sm mb-3">{exp.company}</p>
              <p className="text-slate-500 text-sm leading-relaxed">{exp.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}