import React, { useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Define TypeScript interfaces
interface FormData {
  // Step 1: Founder & Startup Info
  fullName: string;
  email: string;
  startupName: string;
  startupDomain: string;
  
  // Step 2: Pitch Details
  pitchTitle: string;
  preferredDate: string;
  preferredLocation: string;
  problemStatement: string;
  proposedSolution: string;
  expectationsFromYanc: string;
  
  // Step 3: Files & Submission
  pitchDeck: File | null;
  disclaimerAccepted: boolean;
}

interface Errors {
  [key: string]: string;
}

interface StringStepProps {
  formData: FormData;
  errors: Errors;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleCheckbox?: (field: string, value: string, checked?: boolean) => void;
  handleFileUpload?: (field: string, file: File | null) => void;
}

const StartupPitch = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  // Form data state
  const [formData, setFormData] = useState<FormData>({
    // Step 1
    fullName: '',
    email: '',
    startupName: '',
    startupDomain: '',
    
    // Step 2
    pitchTitle: '',
    preferredDate: '',
    preferredLocation: '',
    problemStatement: '',
    proposedSolution: '',
    expectationsFromYanc: '',
    
    // Step 3
    pitchDeck: null,
    disclaimerAccepted: false
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Steps configuration
  const steps = [
    { id: 1, title: 'Founder & Startup Info' },
    { id: 2, title: 'Pitch Details' },
    { id: 3, title: 'Files & Submission' }
  ];

  // Handle input changes
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    
    // Clear error when user starts typing
    if (errors[name]) {
      setTimeout(() => {
        setErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors[name];
          return newErrors;
        });
      }, 0);
    }
  }, [errors]);

  // Handle file upload
  const handleFileUpload = useCallback((name: string, file: File | null) => {
    setFormData(prev => ({ ...prev, [name]: file }));
    
    // Clear error if file is uploaded
    if (errors[name] && file) {
      setTimeout(() => {
        setErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors[name];
          return newErrors;
        });
      }, 0);
    }
  }, [errors]);

  // Validate current step
  const validateStep = (step: number) => {
    const newErrors: Record<string, string> = {};
    
    switch (step) {
      case 1:
        if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
        if (!formData.startupName.trim()) newErrors.startupName = 'Startup name is required';
        if (!formData.startupDomain) newErrors.startupDomain = 'Startup domain is required';
        break;
      case 2:
        if (!formData.pitchTitle.trim()) newErrors.pitchTitle = 'Pitch title is required';
        if (!formData.preferredDate) newErrors.preferredDate = 'Preferred date is required';
        if (!formData.preferredLocation) newErrors.preferredLocation = 'Preferred location is required';
        if (!formData.problemStatement.trim()) newErrors.problemStatement = 'Problem statement is required';
        if (!formData.proposedSolution.trim()) newErrors.proposedSolution = 'Proposed solution is required';
        if (!formData.expectationsFromYanc) newErrors.expectationsFromYanc = 'This field is required';
        break;
      case 3:
        if (!formData.pitchDeck) newErrors.pitchDeck = 'Pitch deck is required';
        if (!formData.disclaimerAccepted) newErrors.disclaimerAccepted = 'You must accept the disclaimer';
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Navigation
  const goToNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 3));
    }
  };

  const goToPrev = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  // Submit handler
  const handleSubmit = () => {
    if (validateStep(currentStep)) {
      setIsSubmitting(true);
      
      // Placeholder for backend integration
      // TODO: Add API endpoint: /api/startup-pitch
      setTimeout(() => {
        console.log('Startup pitch submitted:', formData);
        setIsSubmitting(false);
        navigate('/success');
      }, 2000);
    }
  };

  // Get step component
  const StepComponent = React.useMemo(() => {
    switch (currentStep) {
      case 1: return <Step1 formData={formData} errors={errors} onChange={handleChange} />;
      case 2: return <Step2 formData={formData} errors={errors} onChange={handleChange} />;
      case 3: return <Step3 formData={formData} errors={errors} onChange={handleChange} handleFileUpload={handleFileUpload} />;
      default: return <div>Step not found</div>;
    }
  }, [currentStep, formData, errors, handleChange, handleFileUpload]);

  // Calculate progress percentage
  const progressPercentage = ((currentStep - 1) / 2) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-background">
      {/* Header */}
      <div className="bg-card border-b border-border">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <img 
              src="/favicon.svg" 
              alt="YANC Logo" 
              className="w-10 h-10 object-contain"
            />
            <div className="h-6 w-px bg-border"></div>
            <h1 className="text-lg font-medium">Startup Pitch</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => {
                sessionStorage.setItem('fromNavigation', 'true');
                window.location.href = '/';
              }}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground">Startup Pitch</h1>
          <p className="text-muted-foreground mt-2">Turn your idea into reality. Pitch. Connect. Grow.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Side - Progress Bar */}
          <div className="lg:col-span-1">
            <div className="sticky top-4">
              <h2 className="text-lg font-bold text-foreground mb-4">Progress</h2>
              <div className="space-y-2">
                {steps.map((step, index) => (
                  <div key={step.id} className="flex items-center">
                    <div className={
                      `flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ` +
                      (step.id <= currentStep
                        ? step.id === currentStep
                          ? "bg-primary text-primary-foreground shadow-md"
                          : "bg-primary/20 text-primary"
                        : "bg-muted text-muted-foreground")
                    }>
                      {index + 1}
                    </div>
                    <div className="ml-3 flex-1 min-w-0">
                      <p className={
                        `text-sm font-medium truncate ` +
                        (step.id <= currentStep ? "text-foreground" : "text-muted-foreground")
                      }>
                        {step.title}
                      </p>
                    </div>
                    {index < steps.length - 1 && (
                      <div className="ml-4 flex flex-col items-center">
                        <div className={
                          `w-0.5 h-2 ` +
                          (step.id < currentStep ? "bg-primary" : "bg-muted")
                        }></div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-4 border-t border-border">
                <p className="text-sm text-muted-foreground">Step {currentStep} of {steps.length}</p>
                <div className="mt-2 w-full bg-muted rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-300 ease-out" 
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Side - Form Content */}
          <div className="lg:col-span-3">
            <div className="bg-card rounded-xl p-6 border border-border shadow-md">
              {StepComponent}
              
              {/* Navigation Buttons */}
              <div className="flex justify-between mt-6 pt-4 border-t border-border">
                <button
                  onClick={goToPrev}
                  disabled={currentStep === 1}
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg border border-border text-foreground hover:bg-secondary hover:shadow-sm disabled:opacity-50 disabled:cursor-not-allowed transition-all text-sm"
                >
                  <ChevronLeft className="w-5 h-5" />
                  <span>Previous</span>
                </button>
                
                {currentStep < 3 ? (
                  <button
                    onClick={goToNext}
                    className="flex items-center space-x-2 px-6 py-2 rounded-lg bg-gradient-to-r from-primary to-primary/80 text-primary-foreground hover:from-primary/90 hover:to-primary shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 text-sm"
                  >
                    <span className="font-medium">Next</span>
                    <ChevronRight className="w-5 h-5" />
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting || !formData.disclaimerAccepted}
                    className="px-8 py-2 rounded-lg bg-gradient-to-r from-primary to-primary/80 text-primary-foreground hover:from-primary/90 hover:to-primary shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-sm"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center">
                        <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground mr-2"></span>
                        Submitting...
                      </span>
                    ) : (
                      'Submit Pitch'
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Step 1 Component
const Step1: React.FC<StringStepProps> = ({ formData, errors, onChange }) => (
  <div className="space-y-4">
    <div>
      <h3 className="text-xl font-bold text-foreground mb-2">Founder & Startup Info</h3>
      <p className="text-muted-foreground">Tell us about yourself and your startup</p>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Full Name *
        </label>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={onChange}
          maxLength={255}
          className={
            `w-full px-3 py-2 rounded-lg border ` +
            (errors.fullName ? 'border-destructive' : 'border-border') +
            ` bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors`}
          placeholder="Enter your full name"
        />
        <div className="flex justify-between items-center mt-1">
          {errors.fullName && <p className="text-sm text-destructive">{errors.fullName}</p>}
          <p className="text-xs text-muted-foreground ml-auto">{formData.fullName.length}/255</p>
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Email *
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={onChange}
          maxLength={100}
          className={
            `w-full px-3 py-2 rounded-lg border ` +
            (errors.email ? 'border-destructive' : 'border-border') +
            ` bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors`}
          placeholder="Enter your email"
        />
        {errors.email && <p className="text-sm text-destructive mt-1">{errors.email}</p>}
      </div>
      
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Startup Name *
        </label>
        <input
          type="text"
          name="startupName"
          value={formData.startupName}
          onChange={onChange}
          maxLength={255}
          className={
            `w-full px-3 py-2 rounded-lg border ` +
            (errors.startupName ? 'border-destructive' : 'border-border') +
            ` bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors`}
          placeholder="Enter your startup name"
        />
        <div className="flex justify-between items-center mt-1">
          {errors.startupName && <p className="text-sm text-destructive">{errors.startupName}</p>}
          <p className="text-xs text-muted-foreground ml-auto">{formData.startupName.length}/255</p>
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Startup Domain *
        </label>
        <select
          name="startupDomain"
          value={formData.startupDomain}
          onChange={onChange}
          className={
            `w-full px-3 py-2 rounded-lg border ` +
            (errors.startupDomain ? 'border-destructive' : 'border-border') +
            ` bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors`}
        >
          <option value="">Select domain</option>
          <option value="Artificial Intelligence – Machine Learning">Artificial Intelligence – Machine Learning</option>
          <option value="Construction – Smart Materials">Construction – Smart Materials</option>
          <option value="Data Analytics – Cloud Solutions">Data Analytics – Cloud Solutions</option>
          <option value="EdTech">EdTech</option>
          <option value="Entertainment – Media – Content Creation">Entertainment – Media – Content Creation</option>
          <option value="FinTech">FinTech</option>
          <option value="Mental Wellness – Psychology">Mental Wellness – Psychology</option>
          <option value="SaaS – Software as a Service">SaaS – Software as a Service</option>
          <option value="Technology">Technology</option>
        </select>
        {errors.startupDomain && <p className="text-sm text-destructive mt-1">{errors.startupDomain}</p>}
      </div>
    </div>
  </div>
);

// Step 2 Component
const Step2: React.FC<StringStepProps> = ({ formData, errors, onChange }) => (
  <div className="space-y-6">
    <div>
      <h3 className="text-xl font-bold text-foreground mb-2">Pitch Details</h3>
      <p className="text-muted-foreground">Share the details of your startup idea</p>
    </div>
    
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Pitch Title *
        </label>
        <input
          type="text"
          name="pitchTitle"
          value={formData.pitchTitle}
          onChange={onChange}
          maxLength={100}
          className={
            `w-full px-3 py-2 rounded-lg border ` +
            (errors.pitchTitle ? 'border-destructive' : 'border-border') +
            ` bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors`}
          placeholder="Enter a compelling pitch title"
        />
        <div className="flex justify-between items-center mt-1">
          {errors.pitchTitle && <p className="text-sm text-destructive">{errors.pitchTitle}</p>}
          <p className="text-xs text-muted-foreground ml-auto">{formData.pitchTitle.length}/100</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Preferred Date *
          </label>
          <select
            name="preferredDate"
            value={formData.preferredDate}
            onChange={onChange}
            className={
              `w-full px-3 py-2 rounded-lg border ` +
              (errors.preferredDate ? 'border-destructive' : 'border-border') +
              ` bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors`}
          >
            <option value="">Select preferred date</option>
            <option value="Saturday, January 31, 2026">Saturday, January 31, 2026</option>
            <option value="Saturday, February 7, 2026">Saturday, February 7, 2026</option>
            <option value="Saturday, February 14, 2026">Saturday, February 14, 2026</option>
            <option value="Saturday, February 21, 2026">Saturday, February 21, 2026</option>
            <option value="Saturday, February 28, 2026">Saturday, February 28, 2026</option>
          </select>
          {errors.preferredDate && <p className="text-sm text-destructive mt-1">{errors.preferredDate}</p>}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Preferred Location *
          </label>
          <select
            name="preferredLocation"
            value={formData.preferredLocation}
            onChange={onChange}
            className={
              `w-full px-3 py-2 rounded-lg border ` +
              (errors.preferredLocation ? 'border-destructive' : 'border-border') +
              ` bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors`}
          >
            <option value="">Select location</option>
            <option value="YANC Office, RMZ Spire HYD">YANC Office, RMZ Spire HYD</option>
            <option value="Other">Other</option>
          </select>
          {errors.preferredLocation && <p className="text-sm text-destructive mt-1">{errors.preferredLocation}</p>}
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Problem Statement *
        </label>
        <textarea
          name="problemStatement"
          value={formData.problemStatement}
          onChange={onChange}
          maxLength={5000}
          rows={6}
          className={
            `w-full px-3 py-2 rounded-lg border ` +
            (errors.problemStatement ? 'border-destructive' : 'border-border') +
            ` bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors resize-none`}
          placeholder="Describe the problem your startup solves..."
        />
        <div className="flex justify-between items-center mt-1">
          {errors.problemStatement && <p className="text-sm text-destructive">{errors.problemStatement}</p>}
          <p className="text-xs text-muted-foreground ml-auto">{formData.problemStatement.length}/5000</p>
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Proposed Solution *
        </label>
        <textarea
          name="proposedSolution"
          value={formData.proposedSolution}
          onChange={onChange}
          maxLength={5000}
          rows={6}
          className={
            `w-full px-3 py-2 rounded-lg border ` +
            (errors.proposedSolution ? 'border-destructive' : 'border-border') +
            ` bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors resize-none`}
          placeholder="Describe your solution to the problem..."
        />
        <div className="flex justify-between items-center mt-1">
          {errors.proposedSolution && <p className="text-sm text-destructive">{errors.proposedSolution}</p>}
          <p className="text-xs text-muted-foreground ml-auto">{formData.proposedSolution.length}/5000</p>
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          What do you expect from YANC? *
        </label>
        <select
          name="expectationsFromYanc"
          value={formData.expectationsFromYanc}
          onChange={onChange}
          className={
            `w-full px-3 py-2 rounded-lg border ` +
            (errors.expectationsFromYanc ? 'border-destructive' : 'border-border') +
            ` bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors`}
        >
          <option value="">Select your expectation</option>
          <option value="Idea validation">Idea validation</option>
          <option value="Mentoring">Mentoring</option>
          <option value="Funding">Funding</option>
        </select>
        {errors.expectationsFromYanc && <p className="text-sm text-destructive mt-1">{errors.expectationsFromYanc}</p>}
      </div>
    </div>
  </div>
);

// Step 3 Component
const Step3: React.FC<StringStepProps> = ({ formData, errors, onChange, handleFileUpload }) => (
  <div className="space-y-6">
    <div>
      <h3 className="text-xl font-bold text-foreground mb-2">Files & Submission</h3>
      <p className="text-muted-foreground">Upload your pitch deck and complete the submission</p>
    </div>
    
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Pitch Deck *
        </label>
        <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
          <input
            type="file"
            accept=".pdf,.ppt,.pptx"
            onChange={(e) => handleFileUpload && handleFileUpload('pitchDeck', e.target.files?.[0] || null)}
            className="hidden"
            id="pitchDeck"
          />
          <label htmlFor="pitchDeck" className="cursor-pointer">
            <div className="text-muted-foreground">
              {formData.pitchDeck ? (
                <div>
                  <p className="text-sm">{formData.pitchDeck.name}</p>
                  <p className="text-xs mt-1">Click to change</p>
                </div>
              ) : (
                <div>
                  <p className="text-sm">Click to upload</p>
                  <p className="text-xs mt-1">PDF, PPT, PPTX (max 10MB)</p>
                </div>
              )}
            </div>
          </label>
        </div>
        {errors.pitchDeck && <p className="text-sm text-destructive mt-1">{errors.pitchDeck}</p>}
      </div>
      
      <div className="bg-secondary/50 border border-border rounded-lg p-4">
        <p className="text-sm text-muted-foreground">
          By uploading your pitch deck, you confirm that the idea is your original work.
          YANC will treat all submissions confidentially and use them only for evaluation.
        </p>
      </div>
      
      <div className="flex items-start space-x-3">
        <input
          type="checkbox"
          name="disclaimerAccepted"
          checked={formData.disclaimerAccepted}
          onChange={onChange}
          className="mt-1 h-4 w-4 rounded border-border text-primary focus:ring-primary/50"
        />
        <label className="text-sm text-foreground">
          I confirm that the idea is my original work and I have full rights to share it.
        </label>
      </div>
      {errors.disclaimerAccepted && <p className="text-sm text-destructive mt-1">{errors.disclaimerAccepted}</p>}
    </div>
  </div>
);

export default StartupPitch;