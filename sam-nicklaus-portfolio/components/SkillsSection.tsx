const skillGroups = [
  {
    category: 'Siemens PLM Suite',
    skills: [
      'Teamcenter RAC',
      'Active Workspace',
      'BMIDE',
      'Workflow Designer',
      'Polarion ALM',
      'Mendix',
      'Teamcenter Enterprise Manager',
      'Easy Plan',
      'Siemens NX',
    ],
  },
  {
    category: 'PLM & Systems Engineering',
    skills: [
      'Product Lifecycle Management',
      'Digital Thread',
      'Digital Twins',
      'MBSE',
      'BOM Management',
      'Requirements Engineering',
      'Workflow Design',
      'System Integration',
      'Industry 4.0',
    ],
  },
  {
    category: 'Development & Customization',
    skills: [
      'C++',
      'Java',
      'JavaScript',
      'Python',
      'SQL',
      'XML',
      'REST APIs',
      'Node.js',
      '.NET Framework',
    ],
  },
  {
    category: 'DevOps & Tooling',
    skills: [
      'GitLab CI/CD',
      'Git',
      'GitHub',
      'Jira',
      'Confluence',
      'Postman',
      'Eggplant Functional',
      'Linux',
    ],
  },
  {
    category: 'Defense & Compliance',
    skills: [
      'Defense Contracting',
      'Cybersecurity',
      'Regulatory Compliance',
      'Verification & Validation',
      'Mission-Critical Systems',
      'Software Configuration Management',
    ],
  },
];

export default function SkillsSection() {
  return (
    <section id="skills" className="py-24 px-6 bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-blue-600 font-semibold text-sm uppercase tracking-widest">
            Technical Expertise
          </span>
          <h2 className="text-4xl font-bold text-slate-900 mt-2">Skills & Tools</h2>
          <p className="text-slate-500 mt-4 max-w-xl mx-auto">
            Focused on the tools and disciplines that drive enterprise PLM delivery in defense environments.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillGroups.map((group) => (
            <div
              key={group.category}
              className="bg-white rounded-2xl p-6 border border-blue-100 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <h3 className="text-blue-700 font-bold text-sm uppercase tracking-widest mb-4">
                {group.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="bg-blue-50 text-blue-800 text-xs font-medium px-3 py-1.5 rounded-full border border-blue-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}