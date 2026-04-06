"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { getAllSites } from "@/lib/multiSiteStorage";
import { saveQuestionnaireResponse } from "@/lib/supabase";

export default function ContactFormPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    companyName: '',
    fullName: '',
    email: '',
    phone: '',
    jobTitle: '',
    additionalNotes: '',
  });
  const [isNetworkOperator, setIsNetworkOperator] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const countWords = (text) => text.trim().split(/\s+/).filter(Boolean).length;

  const validateForm = () => {
    const e = {};
    if (!formData.companyName.trim()) e.companyName = 'Company name is required';
    if (!formData.fullName.trim())    e.fullName    = 'Full name is required';
    if (!formData.email.trim())       e.email       = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      e.email = 'Please enter a valid email';
    if (!formData.phone.trim())       e.phone       = 'Phone number is required';
    if (!formData.additionalNotes.trim()) e.additionalNotes = 'Please describe your use case';
    else if (countWords(formData.additionalNotes) > 80) e.additionalNotes = 'Please limit your description to 80 words';
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      // ── Get sites from localStorage ──
      const sites = getAllSites();

      if (sites.length === 0) {
        setErrors({ submit: 'No site data found. Please complete the questionnaire first.' });
        setIsSubmitting(false);
        return;
      }

      // ── Build scoring summary ──
      const scoringData = {
        sites: sites.map(s => ({
          site_id:               s.id,
          site_name:             s.name,
          scoring:               s.scoring || {},
          completion_percentage: s.completionPercentage || 0,
        })),
      };

      // ── Submit to Supabase ──
      // This will:
      // 1. Save the response to questionnaire_responses
      // 2. Call Edge Function to generate recommendations
      // 3. Store recommendations in localStorage for Results page
      const response = await saveQuestionnaireResponse(sites, formData, scoringData);

      // Save response ID, contact info and operator flag to localStorage
      if (typeof window !== 'undefined' && response?.id) {
        localStorage.setItem('submissionId', String(response.id));
        localStorage.setItem('questionnaire_contact', JSON.stringify(formData));
        localStorage.setItem('isNetworkOperator', JSON.stringify(isNetworkOperator));
      }

      // Navigate to results
      router.push('/questionnaire/results');

    } catch (error) {
      console.error('Submission error:', error);
      setErrors({
        submit: 'There was an error submitting your information. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-form-page">
      <div className="contact-form-page__bg-shape"></div>
      <div className="contact-form-page__bg-shape-2"></div>

      <div className="container">
        <div className="contact-form-page__inner">

          {/* Header */}
          <div className="contact-form-page__header">
            <div className="contact-form-page__icon">
              <span className="icon-check-circle"></span>
            </div>
            <h2>Almost Done!</h2>
            <p>Please provide your contact information to receive your personalized connectivity solution recommendations.</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="contact-form">
            {errors.submit && (
              <div className="contact-form__error-banner">{errors.submit}</div>
            )}

            <div className="contact-form__grid">
              <div className="contact-form__field">
                <label htmlFor="companyName">Company Name <span className="required">*</span></label>
                <input
                  id="companyName"
                  type="text"
                  placeholder="Enter your company name"
                  value={formData.companyName}
                  onChange={e => handleChange('companyName', e.target.value)}
                  className={errors.companyName ? 'error' : ''}
                />
                {errors.companyName && <span className="contact-form__error">{errors.companyName}</span>}
              </div>

              <div className="contact-form__field">
                <label htmlFor="fullName">Full Name <span className="required">*</span></label>
                <input
                  id="fullName"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={e => handleChange('fullName', e.target.value)}
                  className={errors.fullName ? 'error' : ''}
                />
                {errors.fullName && <span className="contact-form__error">{errors.fullName}</span>}
              </div>

              <div className="contact-form__field">
                <label htmlFor="email">Email Address <span className="required">*</span></label>
                <input
                  id="email"
                  type="email"
                  placeholder="your.email@company.com"
                  value={formData.email}
                  onChange={e => handleChange('email', e.target.value)}
                  className={errors.email ? 'error' : ''}
                />
                {errors.email && <span className="contact-form__error">{errors.email}</span>}
              </div>

              <div className="contact-form__field">
                <label htmlFor="phone">Phone Number <span className="required">*</span></label>
                <input
                  id="phone"
                  type="tel"
                  placeholder="+1 (555) 123-4567"
                  value={formData.phone}
                  onChange={e => handleChange('phone', e.target.value)}
                  className={errors.phone ? 'error' : ''}
                />
                {errors.phone && <span className="contact-form__error">{errors.phone}</span>}
              </div>

              <div className="contact-form__field">
                <label htmlFor="jobTitle">Job Title</label>
                <input
                  id="jobTitle"
                  type="text"
                  placeholder="e.g., IT Manager"
                  value={formData.jobTitle}
                  onChange={e => handleChange('jobTitle', e.target.value)}
                />
              </div>

              <div className="contact-form__field contact-form__field--full">
                <label htmlFor="additionalNotes">Describe your Use Case <span className="required">*</span><span className="contact-form__word-count">{countWords(formData.additionalNotes)}/80 words</span></label>
                <textarea
                  id="additionalNotes"
                  rows="4"
                  placeholder="Describe how you plan to use our connectivity solutions..."
                  value={formData.additionalNotes}
                  onChange={e => handleChange('additionalNotes', e.target.value)}
                  className={errors.additionalNotes ? 'error' : ''}
                />
                {errors.additionalNotes && <span className="contact-form__error">{errors.additionalNotes}</span>}
              </div>
            </div>

            <div className="contact-form__operator-check">
              <label className="operator-label">
                <input
                  type="checkbox"
                  checked={isNetworkOperator}
                  onChange={e => setIsNetworkOperator(e.target.checked)}
                />
                <span className="operator-checkmark">{isNetworkOperator ? '✅' : ''}</span>
                I am a Network Operator
              </label>
            </div>

            <div className="contact-form__submit">
              <button type="submit" className="contact-form__btn" disabled={isSubmitting}>
                {isSubmitting ? (
                  <><span className="spinner"></span>Processing...</>
                ) : (
                  <>Get My Recommendations <span className="icon-arrow-right"></span></>
                )}
              </button>
            </div>
          </form>

        </div>
      </div>

      <style jsx>{`
        .contact-form-page {
          position: relative;
          min-height: 100vh;
          background-color: var(--techguru-black);
          padding: 80px 0;
          overflow: hidden;
        }
        .contact-form-page__bg-shape {
          position: absolute;
          width: 927px; height: 927px;
          right: -270px; top: -40px;
          background: radial-gradient(50% 50% at 50% 50%, rgba(22,14,255,0.1539) 0%, rgba(22,14,255,0) 87.1%);
          z-index: 0;
        }
        .contact-form-page__bg-shape-2 {
          position: absolute;
          left: 24.95%; right: 24.95%; top: 30%; bottom: -11.72%;
          opacity: .30; filter: blur(120px);
          background: radial-gradient(50% 50% at 50% 50%, #6669D8 0%, rgba(7,12,20,0) 100%);
          z-index: 0;
        }
        .contact-form-page__inner {
          position: relative; z-index: 1;
          max-width: 800px; margin: 0 auto;
        }
        .contact-form-page__header {
          text-align: center; margin-bottom: 50px;
        }
        .contact-form-page__icon {
          display: inline-flex; align-items: center; justify-content: center;
          width: 80px; height: 80px; border-radius: 50%;
          background: linear-gradient(135deg, #3D72FC 0%, #5CB0E9 100%);
          margin-bottom: 24px; animation: scaleIn 0.5s ease-out;
        }
        @keyframes scaleIn {
          from { transform: scale(0); opacity: 0; }
          to   { transform: scale(1); opacity: 1; }
        }
        .contact-form-page__icon span { font-size: 40px; color: var(--techguru-white); }
        .contact-form-page__header h2 {
          font-size: 36px; font-weight: 700; color: var(--techguru-white); margin-bottom: 16px;
        }
        .contact-form-page__header p {
          font-size: 16px; color: rgba(255,255,255,0.7);
          line-height: 1.6; max-width: 600px; margin: 0 auto;
        }
        .contact-form {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 24px; padding: 50px;
          backdrop-filter: blur(10px);
        }
        .contact-form__error-banner {
          padding: 16px 20px;
          background: rgba(250,86,116,0.1);
          border: 1px solid #FA5674;
          border-radius: 12px; color: #FA5674;
          margin-bottom: 30px; font-size: 15px;
        }
        .contact-form__grid {
          display: grid; grid-template-columns: repeat(2,1fr); gap: 24px;
        }
        .contact-form__field { display: flex; flex-direction: column; gap: 8px; }
        .contact-form__field--full { grid-column: 1 / -1; }
        .contact-form__field label {
          display: flex; align-items: center;
          font-size: 14px; font-weight: 600; color: rgba(255,255,255,0.9);
        }
        .contact-form__field .required { color: #FA5674; }
        .contact-form__word-count {
          margin-left: auto; font-size: 12px; font-weight: 400;
          color: rgba(255,255,255,0.45);
        }
        .contact-form__field input,
        .contact-form__field textarea {
          width: 100%; padding: 16px 20px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.2);
          border-radius: 12px; color: var(--techguru-white);
          font-size: 16px; outline: none;
          transition: all 0.3s ease; font-family: inherit;
        }
        .contact-form__field input:focus,
        .contact-form__field textarea:focus {
          border-color: #3D72FC; background: rgba(255,255,255,0.08);
        }
        .contact-form__field input::placeholder,
        .contact-form__field textarea::placeholder { color: rgba(255,255,255,0.4); }
        .contact-form__field input.error,
        .contact-form__field textarea.error { border-color: #FA5674; }
        .contact-form__error { font-size: 13px; color: #FA5674; margin-top: -4px; }
        .contact-form__field textarea { resize: vertical; min-height: 100px; }
        .contact-form__operator-check { margin-top: 28px; }
        .operator-label {
          display: inline-flex; align-items: center; gap: 12px;
          font-size: 15px; font-weight: 600; color: rgba(255,255,255,0.9);
          cursor: pointer; user-select: none;
        }
        .operator-label input[type="checkbox"] { display: none; }
        .operator-checkmark {
          width: 22px; height: 22px; border-radius: 6px;
          border: 2px solid rgba(255,255,255,0.3);
          background: rgba(255,255,255,0.05);
          display: inline-flex; align-items: center; justify-content: center;
          font-size: 14px; transition: all 0.2s;
          flex-shrink: 0;
        }
        .operator-label input[type="checkbox"]:checked + .operator-checkmark {
          border-color: #3D72FC; background: rgba(61,114,252,0.15);
        }
        .contact-form__submit { margin-top: 36px; text-align: center; }
        .contact-form__btn {
          display: inline-flex; align-items: center; gap: 12px;
          padding: 18px 48px;
          background: linear-gradient(135deg, #3D72FC 0%, #5CB0E9 100%);
          border: none; border-radius: 12px;
          color: var(--techguru-white); font-size: 16px; font-weight: 600;
          cursor: pointer; transition: all 0.3s ease;
        }
        .contact-form__btn:hover:not(:disabled) {
          transform: translateY(-3px);
          box-shadow: 0 12px 30px rgba(61,114,252,0.4);
        }
        .contact-form__btn:disabled { opacity: 0.7; cursor: not-allowed; }
        .contact-form__btn .spinner {
          width: 16px; height: 16px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: var(--techguru-white);
          border-radius: 50%; animation: spin 0.8s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (max-width: 768px) {
          .contact-form-page { padding: 40px 0; }
          .contact-form { padding: 30px 20px; }
          .contact-form__grid { grid-template-columns: 1fr; }
          .contact-form-page__header h2 { font-size: 28px; }
          .contact-form__btn { width: 100%; justify-content: center; }
        }
      `}</style>
    </div>
  );
}