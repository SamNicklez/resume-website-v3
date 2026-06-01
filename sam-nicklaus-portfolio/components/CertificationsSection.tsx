'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

const mainCerts = [
  {
    name: 'CompTIA Security+',
    authority: 'CompTIA',
    logo: '/comptia-sec-plus.png',
    license: 'NZR7YFT5Y1FEQ2KR',
    verify: 'https://verify.comptia.org',
    expires: 'Nov 2027',
  },
  {
    name: 'Associate Systems Engineering Professional',
    authority: 'INCOSE',
    logo: '/incose-asep.png',
    license: '301578',
    verify: 'https://www.credential.net/2aec90da-94be-4d34-9aa2-5205f5a47957',
    expires: 'Dec 2030',
  },
];

const siemensCerts = [
  'Active Workspace Foundation',
  'Active Workspace Administration',
  'Program Planning in Active Workspace',
  'Document Management in Active Workspace',
  'Product Configurator & Variability Management',
  'Teamcenter Administration',
  'BMIDE — Business Modeler',
  'Server-Side Customization',
  'Client-Side Customization',
  'Advanced Workflow & Access Control',
  'Multi-BOM Management with Easy Plan',
  'Designing Parts in NX',
];

export default function CertificationsSection() {
  const bubblesRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.2 }
    );
    if (bubblesRef.current) observer.observe(bubblesRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="certifications" className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-blue-600 font-semibold text-sm uppercase tracking-widest">
            Credentials
          </span>
          <h2 className="text-4xl font-bold text-slate-900 mt-2">Certifications</h2>
        </div>

        {/* Main Certs with Logos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto mb-20">
          {mainCerts.map((cert) => (
            <a
              key={cert.name}
              href={cert.verify}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-5 bg-blue-50 border border-blue-100 rounded-2xl p-6 hover:shadow-lg hover:border-blue-300 transition-all duration-300 group"
            >
              <div className="w-16 h-16 relative shrink-0 bg-white rounded-xl border border-blue-100 shadow-sm flex items-center justify-center p-2">
                <Image
                  src={cert.logo}
                  alt={cert.name}
                  fill
                  sizes="64px"
                  className="object-contain p-1"
                />
              </div>
              <div>
                <p className="font-bold text-slate-800 text-sm group-hover:text-blue-700 transition-colors">
                  {cert.name}
                </p>
                <p className="text-xs text-blue-600 font-semibold mt-0.5">{cert.authority}</p>
                <p className="text-xs text-slate-400 mt-1">
                  License: {cert.license} · Expires {cert.expires}
                </p>
              </div>
            </a>
          ))}
        </div>

        {/* Siemens Certs Bubble Section */}
        <div className="text-center mb-10">
          <p className="text-slate-500 text-lg max-w-2xl mx-auto leading-relaxed">
            Additionally certified by{' '}
            <span className="text-blue-700 font-semibold">Siemens Digital Industries Software</span>{' '}
            across the full Teamcenter & Active Workspace ecosystem:
          </p>
        </div>

        <div
          ref={bubblesRef}
          className="flex flex-wrap justify-center gap-3"
        >
          {siemensCerts.map((cert, i) => (
            <span
              key={cert}
              className="bg-blue-50 border border-blue-200 text-blue-800 text-sm font-medium px-4 py-2 rounded-full shadow-sm transition-all duration-500"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(16px)',
                transitionDelay: `${i * 60}ms`,
              }}
            >
              {cert}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}