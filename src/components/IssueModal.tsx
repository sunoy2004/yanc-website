import React, { useState, useEffect, useRef } from 'react';
import { X, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import { createIssue as createIssueService } from '../services/issueService';
import type { IssueCreateInput, IssueType, DeviceType, OSType, BrowserType, SeverityType } from '../services/issueService';
import { getProductVersion } from '@/utils/productVersion';

const ISSUE_TYPES: IssueType[] = ['Bug', 'Enhancement', 'Working as Expected'];
const DEVICES: DeviceType[] = ['Desktop', 'Laptop', 'Tablet', 'Mobile', 'iPads'];
const OS_OPTIONS: OSType[] = ['Windows', 'macOS', 'Linux', 'Android', 'iOS', 'Chrome OS'];
const BROWSERS: BrowserType[] = ['Chrome', 'Safari', 'Firefox', 'Edge', 'Opera', 'Brave', 'Samsung Internet', 'Other'];
const SEVERITIES: SeverityType[] = ['High', 'Medium', 'Low'];

function formatDateTimeForInput(iso: string): string {
  try {
    const d = new Date(iso);
    const date = d.toISOString().slice(0, 10);
    const time = d.toTimeString().slice(0, 5);
    return `${date}T${time}`;
  } catch {
    return new Date().toISOString().slice(0, 16);
  }
}

export function IssueModal({ onClose }: { onClose: () => void }) {
  const [issueType, setIssueType] = useState<IssueType>('Bug');
  const [issueDescription, setIssueDescription] = useState('');
  const [expectedResult, setExpectedResult] = useState('');
  const [stepsToReproduce, setStepsToReproduce] = useState('');
  const [version, setVersion] = useState('');
  const [device, setDevice] = useState<DeviceType>('Desktop');
  const [os, setOS] = useState<OSType>('Windows');
  const [browser, setBrowser] = useState<BrowserType>('Chrome');
  const [otherBrowser, setOtherBrowser] = useState('');
  const [reporter, setReporter] = useState('');
  const [dateIso, setDateIso] = useState('');
  const [severity, setSeverity] = useState<SeverityType>('Low');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Auto-populate version (centralized) and date when modal opens
  useEffect(() => {
    setVersion(getProductVersion());
    const now = new Date().toISOString();
    setDateIso(now);
  }, []);

  // Optional: sync version from footer when DOM is ready (e.g. after navigation)
  useEffect(() => {
    if (typeof document === 'undefined') return;
    const v = getProductVersion();
    if (v) setVersion(v);
  }, []);

  const popHandlerRef = useRef<() => void>(() => {});
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      window.history.pushState({ issueModal: true }, '');
      const onPop = () => onClose();
      popHandlerRef.current = onPop;
      window.addEventListener('popstate', onPop);
      return () => window.removeEventListener('popstate', onPop);
    } catch {
      // ignore
    }
  }, [onClose]);

  const handleClose = () => {
    if (typeof window !== 'undefined' && window.history?.back) {
      try {
        window.history.back();
        return;
      } catch {
        // fallback
      }
    }
    onClose();
  };

  const validate = (): boolean => {
    const e: Record<string, string> = {};
    if (!issueType) e.issueType = 'Issue type is required';
    if (!issueDescription.trim()) e.issueDescription = 'Issue description is required';
    if (!expectedResult.trim()) e.expectedResult = 'Expected result is required';
    if (!stepsToReproduce.trim()) e.stepsToReproduce = 'Steps to reproduce are required';
    if (!version.trim()) e.version = 'Version is required';
    if (!device) e.device = 'Device is required';
    if (!os) e.os = 'OS is required';
    if (!browser) e.browser = 'Browser is required';
    if (browser === 'Other' && !otherBrowser.trim()) e.otherBrowser = 'Please specify the browser name';
    if (!reporter.trim()) e.reporter = 'Reporter name is required';
    if (!dateIso) e.date = 'Date is required';
    if (!severity) e.severity = 'Severity is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    (async () => {
      setIsSubmitting(true);
      try {
        const payload: IssueCreateInput = {
          issueType,
          issueDescription: issueDescription.trim(),
          expectedResult: expectedResult.trim(),
          stepsToReproduce: stepsToReproduce.trim(),
          version: version.trim(),
          device,
          os,
          browser,
          reporter: reporter.trim(),
          date: dateIso,
          severity,
          assignedTo: 'Unassigned',
          status: 'Open',
        };
        if (browser === 'Other' && otherBrowser.trim()) {
          payload.otherBrowser = otherBrowser.trim();
        }
        await createIssueService(payload);
        toast.success('Thank you for reporting the issue.', {
          description: 'Our development team has received your submission and will review it shortly.',
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
    `w-full min-w-0 px-3 py-2.5 sm:px-3.5 rounded-xl border text-body bg-background text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200 ${field && errors[field] ? 'border-destructive ring-1 ring-destructive/30' : 'border-input hover:border-muted-foreground/30'}`;

  const labelClass = 'block text-sm sm:text-body font-medium text-foreground mb-1.5';

  const showOtherBrowser = browser === 'Other';

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
      style={{
        paddingLeft: 'max(0.75rem, env(safe-area-inset-left, 0px))',
        paddingRight: 'max(0.75rem, env(safe-area-inset-right, 0px))',
        paddingTop: 'max(0.75rem, env(safe-area-inset-top, 0px))',
        paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom, 0px))',
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="fixed inset-0 bg-foreground/15 backdrop-blur-sm z-40" onClick={handleClose} aria-hidden />
      <div className="relative z-50 bg-card shadow-modal w-full max-w-[calc(100vw-1.5rem)] sm:max-w-md md:max-w-lg border border-border flex flex-col rounded-xl sm:rounded-2xl overflow-hidden max-h-[calc(100vh-1.5rem)] sm:max-h-[90vh] min-h-0">
        <div className="flex items-start sm:items-center justify-between gap-3 px-4 py-4 sm:px-6 sm:py-5 border-b border-border shrink-0">
          <div className="min-w-0 flex-1">
            <h2 id="modal-title" className="text-base sm:text-section-header text-foreground truncate">Submit New Issue</h2>
            <p className="text-sm sm:text-body text-muted-foreground mt-0.5 line-clamp-2">Fill in the details to create a new report</p>
          </div>
          <button type="button" onClick={handleClose} className="shrink-0 p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl hover:bg-muted transition-colors text-muted-foreground focus-ring touch-manipulation" aria-label="Close modal">
            <X size={20} aria-hidden />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col flex-1 min-h-0 px-4 py-4 sm:p-6">
          <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden space-y-4 sm:space-y-5 p-[3px] -m-[3px]" style={{ WebkitOverflowScrolling: 'touch' } as React.CSSProperties}>
            <div>
              <label htmlFor="issue-type" className={labelClass}>Issue Type <span className="text-destructive">*</span></label>
              <select id="issue-type" value={issueType} onChange={e => { setIssueType(e.target.value as IssueType); setErrors(prev => ({ ...prev, issueType: '' })); }} className={inputClass('issueType')}>
                {ISSUE_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
              {errors.issueType && <p className="flex items-center gap-1 mt-1.5 text-xs text-destructive"><AlertCircle size={12} />{errors.issueType}</p>}
            </div>

            <div>
              <label htmlFor="issue-description" className={labelClass}>Issue Description <span className="text-destructive">*</span></label>
              <textarea id="issue-description" value={issueDescription} onChange={e => { setIssueDescription(e.target.value); setErrors(prev => ({ ...prev, issueDescription: '' })); }} placeholder="Describe the issue..." rows={4} className={`${inputClass('issueDescription')} min-h-[6rem] resize-y`} />
              {errors.issueDescription && <p className="flex items-center gap-1 mt-1.5 text-xs text-destructive"><AlertCircle size={12} />{errors.issueDescription}</p>}
            </div>

            <div>
              <label htmlFor="expected-result" className={labelClass}>Expected Result <span className="text-destructive">*</span></label>
              <textarea id="expected-result" value={expectedResult} onChange={e => { setExpectedResult(e.target.value); setErrors(prev => ({ ...prev, expectedResult: '' })); }} placeholder="What should happen?" rows={3} className={`${inputClass('expectedResult')} min-h-[4rem] resize-y`} />
              {errors.expectedResult && <p className="flex items-center gap-1 mt-1.5 text-xs text-destructive"><AlertCircle size={12} />{errors.expectedResult}</p>}
            </div>

            <div>
              <label htmlFor="steps-to-reproduce" className={labelClass}>Steps to Reproduce <span className="text-destructive">*</span></label>
              <textarea id="steps-to-reproduce" value={stepsToReproduce} onChange={e => { setStepsToReproduce(e.target.value); setErrors(prev => ({ ...prev, stepsToReproduce: '' })); }} placeholder="1. Go to... 2. Click..." rows={3} className={`${inputClass('stepsToReproduce')} min-h-[4rem] resize-y`} />
              {errors.stepsToReproduce && <p className="flex items-center gap-1 mt-1.5 text-xs text-destructive"><AlertCircle size={12} />{errors.stepsToReproduce}</p>}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div className="min-w-0">
                <label htmlFor="version" className={labelClass}>Version <span className="text-destructive">*</span></label>
                <input id="version" value={version} readOnly className={`${inputClass('version')} opacity-70 cursor-not-allowed`} title="Auto-filled from product version" />
                {errors.version && <p className="flex items-center gap-1 mt-1.5 text-xs text-destructive"><AlertCircle size={12} />{errors.version}</p>}
              </div>
              <div className="min-w-0">
                <label htmlFor="device" className={labelClass}>Device <span className="text-destructive">*</span></label>
                <select id="device" value={device} onChange={e => { setDevice(e.target.value as DeviceType); setErrors(prev => ({ ...prev, device: '' })); }} className={inputClass('device')}>
                  {DEVICES.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
                {errors.device && <p className="flex items-center gap-1 mt-1.5 text-xs text-destructive"><AlertCircle size={12} />{errors.device}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div className="min-w-0">
                <label htmlFor="os" className={labelClass}>OS <span className="text-destructive">*</span></label>
                <select id="os" value={os} onChange={e => { setOS(e.target.value as OSType); setErrors(prev => ({ ...prev, os: '' })); }} className={inputClass('os')}>
                  {OS_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
                {errors.os && <p className="flex items-center gap-1 mt-1.5 text-xs text-destructive"><AlertCircle size={12} />{errors.os}</p>}
              </div>
              <div className="min-w-0">
                <label htmlFor="browser" className={labelClass}>Browser <span className="text-destructive">*</span></label>
                <select id="browser" value={browser} onChange={e => { setBrowser(e.target.value as BrowserType); setErrors(prev => ({ ...prev, browser: '', otherBrowser: '' })); }} className={inputClass('browser')}>
                  {BROWSERS.map(b => <option key={b} value={b}>{b}</option>)}
                </select>
                {errors.browser && <p className="flex items-center gap-1 mt-1.5 text-xs text-destructive"><AlertCircle size={12} />{errors.browser}</p>}
              </div>
            </div>

            {showOtherBrowser && (
              <div>
                <label htmlFor="other-browser" className={labelClass}>Other Browser <span className="text-destructive">*</span></label>
                <input id="other-browser" value={otherBrowser} onChange={e => { setOtherBrowser(e.target.value); setErrors(prev => ({ ...prev, otherBrowser: '' })); }} placeholder="e.g. Edge, Opera" className={inputClass('otherBrowser')} />
                {errors.otherBrowser && <p className="flex items-center gap-1 mt-1.5 text-xs text-destructive"><AlertCircle size={12} />{errors.otherBrowser}</p>}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div className="min-w-0">
                <label htmlFor="reporter" className={labelClass}>Reporter <span className="text-destructive">*</span></label>
                <input id="reporter" value={reporter} onChange={e => { setReporter(e.target.value); setErrors(prev => ({ ...prev, reporter: '' })); }} placeholder="Your name" className={inputClass('reporter')} />
                {errors.reporter && <p className="flex items-center gap-1 mt-1.5 text-xs text-destructive"><AlertCircle size={12} />{errors.reporter}</p>}
              </div>
              <div className="min-w-0">
                <label htmlFor="date" className={labelClass}>Date <span className="text-destructive">*</span></label>
                <input id="date" type="datetime-local" value={dateIso ? formatDateTimeForInput(dateIso) : ''} readOnly className={`${inputClass('date')} opacity-70 cursor-not-allowed`} title="Auto-filled with current date/time" />
                {errors.date && <p className="flex items-center gap-1 mt-1.5 text-xs text-destructive"><AlertCircle size={12} />{errors.date}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="severity" className={labelClass}>Severity <span className="text-destructive">*</span></label>
              <select id="severity" value={severity} onChange={e => { setSeverity(e.target.value as SeverityType); setErrors(prev => ({ ...prev, severity: '' })); }} className={inputClass('severity')}>
                {SEVERITIES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
              {errors.severity && <p className="flex items-center gap-1 mt-1.5 text-xs text-destructive"><AlertCircle size={12} />{errors.severity}</p>}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:justify-end gap-3 pt-3 pb-1 border-t border-border -mx-4 sm:-mx-6 px-4 sm:px-6 mt-4 bg-card shrink-0">
            <button type="button" onClick={handleClose} className="w-full sm:w-auto min-h-[44px] sm:min-h-0 px-4 py-3 sm:py-2.5 text-body font-medium rounded-xl border border-border text-foreground hover:bg-muted transition-colors focus-ring touch-manipulation">Cancel</button>
            <button type="submit" disabled={isSubmitting} className={`w-full sm:w-auto min-h-[44px] sm:min-h-0 px-5 py-3 sm:py-2.5 text-body font-medium rounded-xl bg-primary text-primary-foreground hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-0.5 transition-all duration-200 focus-ring touch-manipulation ${isSubmitting ? 'opacity-60 cursor-not-allowed' : ''}`}>
              {isSubmitting ? 'Submitting...' : 'Submit Issue'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default IssueModal;
