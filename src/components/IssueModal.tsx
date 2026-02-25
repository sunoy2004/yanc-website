import React, { useState, useEffect, useRef } from 'react';
import { X, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import { createIssue as createIssueService } from '../services/issueService';
import type { Issue } from '../services/issueService';

export function IssueModal({ onClose }: { onClose: () => void }) {
  // lightweight local fallbacks for environments where context/types aren't present
  const DEVELOPERS = ['YANC Developers'];
  const SEVERITIES = ['Low', 'Medium', 'High', 'Critical'];

  // Prefer direct Supabase-backed service (createIssueService).
  const addIssue = async (data: Record<string, unknown>) => {
    const payload = {
      title: String(data.title),
      version: String(data.version),
      reporter: String(data.reporter),
      assignedTo: String(data.assignedTo ?? data.assigned_to ?? 'Unassigned'),
      severity: String(data.severity ?? 'Low'),
      status: String(data.status ?? 'Open'),
    };
    return await createIssueService(payload as Omit<Issue, 'id' | 'createdAt' | 'updatedAt'>);
  };

  const [title, setTitle] = useState('');
  // Split version into year prefix (auto) and user-entered month.date suffix
  const yearPrefix = `v${new Date().getFullYear()}.`;
  const [versionSuffix, setVersionSuffix] = useState('');
  const [versionInput, setVersionInput] = useState('');
  const [reporter, setReporter] = useState('');
  const [assignedTo, setAssignedTo] = useState(DEVELOPERS[0]);
  const [severity, setSeverity] = useState('Low');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Try to auto-fill the version suffix from the footer build text (e.g. "v2026.02.24")
  useEffect(() => {
    if (typeof document === 'undefined') return;
    try {
      const el = document.querySelector('.footer-build');
      const text = el?.textContent?.trim() ?? '';
      // Match vYYYY.MM.DD or YYYY.MM.DD, capture the MM.DD portion
      const m = text.match(/v?(\d{4})\.(\d{1,2}\.\d{1,2})/);
      if (m && m[2]) {
        setVersionSuffix(m[2]);
        setVersionInput(`${yearPrefix}${m[2]}`);
      }
    } catch {
      // ignore DOM access errors in non-browser environments
    }
  }, [yearPrefix]);

  // Manage history so the browser back button closes the modal instead of navigating away.
  const popHandlerRef = useRef<() => void>(() => {});
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      // Push a history entry so Back will trigger a popstate we can listen to.
      window.history.pushState({ issueModal: true }, '');
      const onPop = () => {
        // Close the modal when the user navigates back.
        onClose();
      };
      popHandlerRef.current = onPop;
      window.addEventListener('popstate', onPop);
      return () => {
        window.removeEventListener('popstate', onPop);
      };
    } catch {
      // ignore
    }
  }, [onClose]);

  // Close helper: navigate back so the popstate listener will trigger modal close.
  const handleClose = () => {
    if (typeof window !== 'undefined' && window.history && typeof window.history.back === 'function') {
      try {
        window.history.back();
        return;
      } catch {
        // fallback to direct close
      }
    }
    onClose();
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!title.trim()) e.title = 'Issue title is required';
    if (!reporter.trim()) e.reporter = 'Reporter name is required';
    if (!versionSuffix.trim()) e.version = 'Version (MM.DD) is required';
    else {
      // simple format check mm.dd where mm and dd are 1-2 digits
      const m = versionSuffix.trim();
      if (!/^\d{1,2}\.\d{1,2}$/.test(m)) e.version = 'Version must be in MM.DD format';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    (async () => {
      setIsSubmitting(true);
      try {
        const combinedVersion = `${yearPrefix}${versionSuffix.trim()}`;
        await addIssue({ title: title.trim(), version: combinedVersion, reporter: reporter.trim(), assignedTo, severity });
        toast.success('Thank you for reporting the issue.', {
          description:
            'Our development team has received your submission and will review it shortly.',
        });
        handleClose();
      } catch (err) {
        console.error('Issue submit error', err);
        toast.error(`Failed to submit issue: ${err instanceof Error ? err.message : String(err)}`);
      } finally {
        setIsSubmitting(false);
      }
    })();
  };

  const inputClass = (field?: string) =>
    `w-full px-3 py-2.5 sm:px-3.5 rounded-xl border text-body bg-background text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200 ${field && errors[field] ? 'border-destructive ring-1 ring-destructive/30' : 'border-input hover:border-muted-foreground/30'}`;

  const labelClass = "block text-sm sm:text-body font-medium text-foreground mb-1.5";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div
        className="fixed inset-0 bg-foreground/15 backdrop-blur-sm z-40"
        onClick={handleClose}
      />
      <div
        className="relative z-50 bg-card shadow-modal w-full h-[90vh] md:h-auto max-w-sm sm:max-w-md md:max-w-lg border border-border overflow-y-auto rounded-none md:rounded-2xl max-h-[90vh]"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-border">
          <div>
            <h2 id="modal-title" className="text-section-header text-foreground">Submit New Issue</h2>
            <p className="text-body text-muted-foreground mt-0.5">Fill in the details to create a new bug report</p>
          </div>
          <button
            onClick={handleClose}
            className="p-2 rounded-xl hover:bg-muted transition-colors text-muted-foreground focus-ring"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form: content scrolls, footer stays visible */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5 flex flex-col h-full">
          <div
            className="flex-1 pr-1 space-y-5"
            style={{
              WebkitOverflowScrolling: 'touch',
              touchAction: 'pan-y',
              overscrollBehavior: 'contain',
              // no inner maxHeight; the modal container handles scrolling
              paddingBottom: '1rem',
            } as React.CSSProperties}
          >
            <div>
              <label htmlFor="issue-title" className={labelClass}>Issue Description<span className="text-destructive">*</span></label>
              <textarea
                id="issue-title"
                value={title}
                onChange={e => { setTitle(e.target.value); setErrors(prev => ({ ...prev, title: '' })); }}
                placeholder="Describe the bug briefly..."
                rows={4}
                className={`${inputClass('title')} h-28 resize-y`}
              />
              {errors.title && (
                <p className="flex items-center gap-1 mt-1.5 text-xs text-destructive"><AlertCircle size={12} />{errors.title}</p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="version" className={labelClass}>Version</label>
                <div className="min-w-0">
                  <input
                    id="version"
                    value={versionInput}
                    disabled
                    aria-hidden
                    title="Version is auto-filled from footer and cannot be edited"
                    className="w-full px-3 py-2.5 rounded-xl border text-body bg-background text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200 opacity-60 cursor-not-allowed"
                  />
                </div>
                {errors.version && (
                  <p className="flex items-center gap-1 mt-1.5 text-xs text-destructive"><AlertCircle size={12} />{errors.version}</p>
                )}
              </div>
              <div>
                <label htmlFor="reporter" className={labelClass}>Reporter <span className="text-destructive">*</span></label>
                <input id="reporter" value={reporter} onChange={e => { setReporter(e.target.value); setErrors(prev => ({ ...prev, reporter: '' })); }} placeholder="Your name" className={inputClass('reporter')} />
                {errors.reporter && (
                  <p className="flex items-center gap-1 mt-1.5 text-xs text-destructive"><AlertCircle size={12} />{errors.reporter}</p>
                )}
              </div>
            </div>

            <div>
              <label className={labelClass}>Created Date</label>
              <input value={new Date().toLocaleDateString('en-CA')} disabled className={`${inputClass()} opacity-50 cursor-not-allowed`} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="assignee" className={labelClass}>Assigned To</label>
                <input
                  id="assignee"
                  value={assignedTo}
                  disabled
                  aria-hidden
                  title="Assigned to (not editable)"
                  className={`${inputClass()} opacity-60 cursor-not-allowed`}
                />
              </div>
              <div>
                <label htmlFor="severity" className={labelClass}>Severity</label>
                <select id="severity" value={severity} onChange={e => setSeverity(e.target.value)} className={inputClass()}>
                  {SEVERITIES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            </div>
            </div>

          {/* Footer (always visible) */}
          <div className="flex flex-col sm:flex-row sm:justify-end gap-3 pt-3 border-t border-border -mx-6 px-6 mt-4 bg-card">
            <button
              type="button"
              onClick={handleClose}
              className="w-full sm:w-auto px-4 py-2.5 text-body font-medium rounded-xl border border-border text-foreground hover:bg-muted transition-colors focus-ring"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full sm:w-auto px-5 py-2.5 text-body font-medium rounded-xl bg-primary text-primary-foreground hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-0.5 transition-all duration-200 focus-ring ${isSubmitting ? 'opacity-60 cursor-not-allowed' : ''}`}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Issue'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default IssueModal;

