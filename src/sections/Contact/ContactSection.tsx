import React, { useState } from 'react';
import { SectionHeading } from '../../components/common/SectionHeading';
import { DynamicIcon } from '../../components/common/DynamicIcon';
import type { SocialLinkItem, ContactConfig } from '../../types';
import {
  Mail,
  Send,
  CheckCircle,
  AlertCircle,
  Loader2,
  MapPin,
  Clock,
  Sparkles,
  Download,
} from 'lucide-react';
import { cn } from '../../utils/cn';

interface ContactSectionProps {
  contactConfig: ContactConfig;
  socialLinks: SocialLinkItem[];
  cvUrl?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  contactConfig,
  socialLinks,
  cvUrl,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const validate = () => {
    const errors: Record<string, string> = {};
    if (!formData.name.trim()) errors.name = 'Full name is required.';
    if (!formData.email.trim()) {
      errors.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address.';
    }
    if (!formData.subject.trim()) errors.subject = 'Subject is required.';
    if (!formData.message.trim()) {
      errors.message = 'Message content is required.';
    } else if (formData.message.trim().length < 10) {
      errors.message = 'Please provide at least 10 characters in your message.';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('loading');
    setErrorMessage('');

    // Check for Formspree endpoint from env or config
    const formspreeEndpoint =
      import.meta.env.VITE_FORMSPREE_ID
        ? `https://formspree.io/f/${import.meta.env.VITE_FORMSPREE_ID}`
        : contactConfig.formspreeEndpoint;

    try {
      if (formspreeEndpoint && formspreeEndpoint.trim() !== '') {
        const response = await fetch(formspreeEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          setStatus('success');
          setFormData({ name: '', email: '', subject: '', message: '' });
        } else {
          const data = await response.json();
          throw new Error(data.error || 'Failed to send message via Formspree.');
        }
      } else {
        // Fallback for static hosting when endpoint not yet configured: simulate smooth client validation
        // and provide direct mailto action
        await new Promise((res) => setTimeout(res, 1000));
        setStatus('success');
        const mailtoSubject = encodeURIComponent(`[Portfolio Inquiry] ${formData.subject}`);
        const mailtoBody = encodeURIComponent(
          `Hi Pubudu,\n\n${formData.message}\n\nFrom: ${formData.name} (${formData.email})`
        );
        window.open(`mailto:${contactConfig.directEmail}?subject=${mailtoSubject}&body=${mailtoBody}`);
        setFormData({ name: '', email: '', subject: '', message: '' });
      }
    } catch (err: unknown) {
      setStatus('error');
      setErrorMessage(
        err instanceof Error ? err.message : 'An unexpected error occurred while sending your message.'
      );
    }
  };

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      <SectionHeading
        eyebrow="Initiate Conversation"
        title={contactConfig.heading}
        subtitle={contactConfig.subheading}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Contact Info & Channels */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 sm:p-7 rounded-2xl bg-[#111827]/80 dark:bg-[#111827]/80 light:bg-white border border-white/5 light:border-slate-200 shadow-sm">
            <h3 className="text-lg font-bold text-white dark:text-white light:text-slate-900 mb-1 tracking-tight">
              Direct Inquiries
            </h3>
            <p className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-500 mb-6">
              Connect directly via professional platforms or email for technical discussions.
            </p>

            <div className="space-y-4">
              {socialLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.url}
                  target={link.url.startsWith('http') ? '_blank' : undefined}
                  rel={link.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="p-3.5 rounded-xl bg-slate-900/60 dark:bg-slate-900/60 light:bg-slate-50 border border-white/5 light:border-slate-200 hover:border-primary-500/30 flex items-center gap-3.5 transition-all group"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary-500/10 text-primary-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <DynamicIcon name={link.icon} className="w-5 h-5" />
                  </div>
                  <div className="overflow-hidden">
                    <div className="text-xs font-mono text-slate-400">{link.platform}</div>
                    <div className="text-sm font-semibold text-white dark:text-white light:text-slate-900 truncate group-hover:text-primary-400 transition-colors">
                      {link.username || link.url}
                    </div>
                  </div>
                </a>
              ))}
            </div>

            {/* Location & Status Note */}
            <div className="mt-6 pt-5 border-t border-white/5 light:border-slate-200 space-y-2">
              {contactConfig.location && (
                <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                  <MapPin className="w-3.5 h-3.5 text-primary-400" />
                  <span>Location: {contactConfig.location}</span>
                </div>
              )}
              {contactConfig.status && (
                <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Status: {contactConfig.status}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-7">
          <div className="p-6 sm:p-8 rounded-2xl bg-[#111827]/80 dark:bg-[#111827]/80 light:bg-white border border-white/5 light:border-slate-200 shadow-sm">
            <h3 className="text-lg font-bold text-white dark:text-white light:text-slate-900 mb-1 tracking-tight">
              Send a Direct Message
            </h3>
            <p className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-500 mb-6">
              Fill out the form below. For production deployment, connect Formspree or EmailJS via environment variables.
            </p>

            {status === 'success' && (
              <div className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-start gap-3">
                <CheckCircle className="w-5 h-5 shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm">
                  <span className="font-semibold">Message dispatched!</span> Thank you for reaching out. I will respond to your inquiry shortly.
                </div>
              </div>
            )}

            {status === 'error' && (
              <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm">
                  <span className="font-semibold">Submission error:</span> {errorMessage}
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Name */}
                <div>
                  <label htmlFor="contact-name" className="block text-xs font-mono text-slate-300 dark:text-slate-300 light:text-slate-700 mb-1.5">
                    Your Name <span className="text-primary-400">*</span>
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Jane Doe"
                    className={cn(
                      'w-full px-3.5 py-2.5 rounded-xl text-sm bg-slate-900/80 dark:bg-slate-900/80 light:bg-slate-50 border text-white dark:text-white light:text-slate-900 placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 transition-colors',
                      formErrors.name ? 'border-red-500' : 'border-white/10 light:border-slate-300'
                    )}
                  />
                  {formErrors.name && (
                    <p className="mt-1 text-xs text-red-400">{formErrors.name}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="contact-email" className="block text-xs font-mono text-slate-300 dark:text-slate-300 light:text-slate-700 mb-1.5">
                    Email Address <span className="text-primary-400">*</span>
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. jane@enterprise.com"
                    className={cn(
                      'w-full px-3.5 py-2.5 rounded-xl text-sm bg-slate-900/80 dark:bg-slate-900/80 light:bg-slate-50 border text-white dark:text-white light:text-slate-900 placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 transition-colors',
                      formErrors.email ? 'border-red-500' : 'border-white/10 light:border-slate-300'
                    )}
                  />
                  {formErrors.email && (
                    <p className="mt-1 text-xs text-red-400">{formErrors.email}</p>
                  )}
                </div>
              </div>

              {/* Subject */}
              <div>
                <label htmlFor="contact-subject" className="block text-xs font-mono text-slate-300 dark:text-slate-300 light:text-slate-700 mb-1.5">
                  Subject <span className="text-primary-400">*</span>
                </label>
                <input
                  id="contact-subject"
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="e.g. Technical Leadership / Enterprise Architecture Discussion"
                  className={cn(
                    'w-full px-3.5 py-2.5 rounded-xl text-sm bg-slate-900/80 dark:bg-slate-900/80 light:bg-slate-50 border text-white dark:text-white light:text-slate-900 placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 transition-colors',
                    formErrors.subject ? 'border-red-500' : 'border-white/10 light:border-slate-300'
                  )}
                />
                {formErrors.subject && (
                  <p className="mt-1 text-xs text-red-400">{formErrors.subject}</p>
                )}
              </div>

              {/* Message */}
              <div>
                <label htmlFor="contact-message" className="block text-xs font-mono text-slate-300 dark:text-slate-300 light:text-slate-700 mb-1.5">
                  Message <span className="text-primary-400">*</span>
                </label>
                <textarea
                  id="contact-message"
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Outline your project scope, inquiry, or discussion topics..."
                  className={cn(
                    'w-full px-3.5 py-2.5 rounded-xl text-sm bg-slate-900/80 dark:bg-slate-900/80 light:bg-slate-50 border text-white dark:text-white light:text-slate-900 placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 transition-colors resize-none',
                    formErrors.message ? 'border-red-500' : 'border-white/10 light:border-slate-300'
                  )}
                />
                {formErrors.message && (
                  <p className="mt-1 text-xs text-red-400">{formErrors.message}</p>
                )}
              </div>

              {/* Submit button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold text-white bg-primary-600 hover:bg-primary-500 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-primary-500/20 transition-all hover:scale-[1.01] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400"
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Sending Message...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
