import React from 'react';
import { SectionHeading } from '../../components/common/SectionHeading';
import { Badge } from '../../components/common/Badge';
import type { CertificationsData } from '../../types';
import { Award, CheckCircle, ExternalLink, Calendar, ShieldCheck } from 'lucide-react';

interface CertificationsSectionProps {
  data: CertificationsData;
}

export const CertificationsSection: React.FC<CertificationsSectionProps> = ({ data }) => {
  return (
    <section id="certifications" className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto relative">
      <SectionHeading
        eyebrow="Credentials & Validation"
        title="Professional Certifications"
        subtitle="Industry-recognized credentials validating core enterprise cloud architecture and Microsoft technologies."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {data.certifications.map((cert) => (
          <div
            key={cert.id}
            className="p-6 sm:p-7 rounded-2xl bg-[#111827]/80 dark:bg-[#111827]/80 light:bg-white border border-white/5 light:border-slate-200 shadow-sm hover:border-primary-500/40 transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/10 dark:bg-blue-500/10 light:bg-blue-50 text-blue-400 light:text-blue-600 flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Award className="w-6 h-6" />
                  </div>
                  <div>
                    {cert.code && (
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-blue-500/15 text-blue-300 border border-blue-500/30">
                        {cert.code}
                      </span>
                    )}
                    <h3 className="mt-1 text-lg font-bold text-white dark:text-white light:text-slate-900 tracking-tight">
                      {cert.name}
                    </h3>
                  </div>
                </div>

                {cert.isVerified && (
                  <span
                    className="p-1 rounded-full text-emerald-400 bg-emerald-500/10 border border-emerald-500/20"
                    title="Verified Certification"
                  >
                    <ShieldCheck className="w-4 h-4" />
                  </span>
                )}
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-y-1 gap-x-4 text-xs font-mono text-slate-400">
                <span>Issuer: <strong className="text-white dark:text-white light:text-slate-800 font-semibold">{cert.issuer}</strong></span>
                <span>• Issue Date: <strong className="text-white dark:text-white light:text-slate-800 font-semibold">{cert.issueDate}</strong></span>
              </div>

              {/* Validated Skills */}
              {cert.skillsValidated && cert.skillsValidated.length > 0 && (
                <div className="mt-5 space-y-2">
                  <h4 className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
                    Validated Competencies
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {cert.skillsValidated.map((skill, sIdx) => (
                      <Badge key={sIdx} variant="subtle" size="sm">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {cert.credentialUrl && (
              <div className="mt-6 pt-4 border-t border-white/5 light:border-slate-200">
                <a
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary-400 hover:text-primary-300 transition-colors focus-visible:outline-none"
                >
                  <span>Verify Credential on Microsoft Learn</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};
