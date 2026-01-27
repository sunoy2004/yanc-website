import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Define TypeScript interfaces
interface FormData {
  dateAttended: string;
  email: string;
  fullName: string;
  relatesToMost: string;
  attendanceRole: string;
  recommendTo: string;
  contactDetails: string;
  yancInterest: boolean;
  knowMore: boolean;
  suggestions: string;
}

interface Errors {
  [key: string]: string;
}

interface StringStepProps {
  formData: FormData;
  errors: Errors;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

const DiscoverMeetFeedback = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  // Form data state
  const [formData, setFormData] = useState<FormData>({
    // Step 1
    dateAttended: '',
    email: '',
    fullName: '',
    // Step 2
    relatesToMost: '',
    attendanceRole: '',
    recommendTo: '',
    // Step 3
    contactDetails: '',
    yancInterest: false,
    knowMore: false,
    suggestions: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Steps configuration
  const steps = [
    { id: 1, title: 'Basic Information' },
    { id: 2, title: 'Experience & Feedback' },
    { id: 3, title: 'Contact & Interest' }
  ];

  // Handle input changes
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    // Handle checkbox inputs separately
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



  // Validate current step
  const validateStep = (step: number) => {
    const newErrors: Record<string, string> = {};
    
    switch (step) {
      case 1:
        if (!formData.dateAttended) newErrors.dateAttended = 'Date attended is required';
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
        if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
        else if (formData.fullName.length > 500) newErrors.fullName = 'Name must be 500 characters or less';
        break;
      case 2:
        if (!formData.relatesToMost.trim()) newErrors.relatesToMost = 'This field is required';
        if (!formData.attendanceRole) newErrors.attendanceRole = 'Attendance role is required';
        if (!formData.recommendTo) newErrors.recommendTo = 'Recommendation group is required';
        break;
      case 3:
        break; // Step 3 has optional fields
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
      // TODO: Add API endpoint: /api/discover-meet-feedback
      onSubmitFeedback(formData);
    }
  };

  // Backend submission placeholder
  const onSubmitFeedback = async (data: FormData) => {
    console.log('Discover Meet Feedback submitted:', data);
    setIsSubmitting(false);
    // Navigate to success page
    navigate('/success');
  };

  // Calculate progress percentage
  const progressPercentage = ((currentStep - 1) / 3) * 100;

  // Get step component
  const StepComponent = React.useMemo(() => {
    switch (currentStep) {
      case 1: return <Step1 formData={formData} errors={errors} onChange={handleChange} />;
      case 2: return <Step2 formData={formData} errors={errors} onChange={handleChange} />;
      case 3: return <Step3 formData={formData} errors={errors} onChange={handleChange} />;
      default: return <div>Step not found</div>;
    }
  }, [currentStep, formData, errors, handleChange]);

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
            <h1 className="text-lg font-medium">Discover Meet Feedback</h1>
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
                    disabled={isSubmitting}
                    className="px-8 py-2 rounded-lg bg-gradient-to-r from-primary to-primary/80 text-primary-foreground hover:from-primary/90 hover:to-primary shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-sm"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center">
                        <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground mr-2"></span>
                        Submitting...
                      </span>
                    ) : (
                      <span className="flex items-center">
                        <span>Submit Feedback</span>
                      </span>
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
      <h3 className="text-xl font-bold text-foreground mb-2">Basic Information</h3>
      <p className="text-muted-foreground">We value your feedback! Please share your experience and thoughts about the discover meeting.</p>
    </div>
    
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Date Attended *
        </label>
        <input
          type="date"
          name="dateAttended"
          value={formData.dateAttended}
          onChange={onChange}
          className={
            `w-full px-3 py-2 rounded-lg border ` +
            (errors.dateAttended ? 'border-destructive' : 'border-border') +
            ` bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors`}
        />
        {errors.dateAttended && <p className="text-sm text-destructive mt-1">{errors.dateAttended}</p>}
      </div>
      
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Email Address *
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={onChange}
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
          Full Name *
        </label>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={onChange}
          maxLength={500}
          className={
            `w-full px-3 py-2 rounded-lg border ` +
            (errors.fullName ? 'border-destructive' : 'border-border') +
            ` bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors`}
          placeholder="Enter your full name"
        />
        <div className="flex justify-between items-center mt-1">
          {errors.fullName && <p className="text-sm text-destructive">{errors.fullName}</p>}
          <p className="text-xs text-muted-foreground ml-auto">{formData.fullName.length}/500</p>
        </div>
      </div>
    </div>
    
    <div className="bg-secondary/50 border border-border rounded-lg p-4">
      <h4 className="font-medium text-foreground mb-2">About This Information</h4>
      <p className="text-sm text-muted-foreground">
        This basic information helps us understand when you attended the discover meeting and allows us to follow up with you regarding your feedback and potential future opportunities.
      </p>
    </div>
  </div>
);

// Step 2 Component
const Step2: React.FC<StringStepProps> = ({ formData, errors, onChange }) => (
  <div className="space-y-4">
    <div>
      <h3 className="text-xl font-bold text-foreground mb-2">Experience & Feedback</h3>
      <p className="text-muted-foreground">Share your experience from the discover meeting</p>
    </div>
    
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Which part of the presentation could you personally relate to the most? *
        </label>
        <textarea
          name="relatesToMost"
          value={formData.relatesToMost}
          onChange={onChange}
          rows={4}
          className={
            `w-full px-3 py-2 rounded-lg border ` +
            (errors.relatesToMost ? 'border-destructive' : 'border-border') +
            ` bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors resize-vertical`}
          placeholder="Describe which part of the presentation you related to most..."
        ></textarea>
        {errors.relatesToMost && <p className="text-sm text-destructive mt-1">{errors.relatesToMost}</p>}
      </div>
      
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          You attended the discover meet as *
        </label>
        <select
          name="attendanceRole"
          value={formData.attendanceRole}
          onChange={onChange}
          className={
            `w-full px-3 py-2 rounded-lg border ` +
            (errors.attendanceRole ? 'border-destructive' : 'border-border') +
            ` bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors`}
        >
          <option value="">Select your role</option>
          <option value="Student">Student</option>
          <option value="Parent">Parent</option>
          <option value="Mentor">Mentor</option>
          <option value="Partner">Partner</option>
          <option value="Other">Other</option>
        </select>
        {errors.attendanceRole && <p className="text-sm text-destructive mt-1">{errors.attendanceRole}</p>}
      </div>
      
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Whom would you recommend the next discover meetup to? *
        </label>
        <select
          name="recommendTo"
          value={formData.recommendTo}
          onChange={onChange}
          className={
            `w-full px-3 py-2 rounded-lg border ` +
            (errors.recommendTo ? 'border-destructive' : 'border-border') +
            ` bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors`}
        >
          <option value="">Select recommendation group</option>
          <option value="Students">Students</option>
          <option value="Parents">Parents</option>
          <option value="Professionals">Professionals</option>
          <option value="Entrepreneurs">Entrepreneurs</option>
          <option value="Other">Other</option>
        </select>
        {errors.recommendTo && <p className="text-sm text-destructive mt-1">{errors.recommendTo}</p>}
      </div>
    </div>
    
    <div className="bg-secondary/50 border border-border rounded-lg p-4">
      <h4 className="font-medium text-foreground mb-2">Your Experience Matters</h4>
      <p className="text-sm text-muted-foreground">
        Your feedback helps us understand what resonates with our audience and improve future discover meetings. We value your honest opinions and suggestions.
      </p>
    </div>
  </div>
);

// Step 3 Component
const Step3: React.FC<StringStepProps> = ({ formData, errors, onChange }) => (
  <div className="space-y-4">
    <div>
      <h3 className="text-xl font-bold text-foreground mb-2">Contact & Interest</h3>
      <p className="text-muted-foreground">Let us know about your interest in YANC</p>
    </div>
    
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Please share their email/number
        </label>
        <input
          type="text"
          name="contactDetails"
          value={formData.contactDetails}
          onChange={onChange}
          className={`w-full px-3 py-2 rounded-lg border border-border bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors`}
          placeholder="Email or phone number of people you'd recommend"
        />
        <p className="text-xs text-muted-foreground mt-1">Optional: Contact details of people you would recommend for future discover meetings</p>
      </div>
      
      <div className="space-y-3">
        <div className="flex items-start">
          <input
            type="checkbox"
            id="yancInterest"
            name="yancInterest"
            checked={formData.yancInterest}
            onChange={onChange}
            className="mt-1 mr-3 h-4 w-4 rounded border-border text-primary focus:ring-primary"
          />
          <label htmlFor="yancInterest" className="text-foreground">
            Would you consider being a part of YANC?
          </label>
        </div>
        
        <div className="flex items-start">
          <input
            type="checkbox"
            id="knowMore"
            name="knowMore"
            checked={formData.knowMore}
            onChange={onChange}
            className="mt-1 mr-3 h-4 w-4 rounded border-border text-primary focus:ring-primary"
          />
          <label htmlFor="knowMore" className="text-foreground">
            Would you want to know more about YANC?
          </label>
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Do you have any suggestions or queries?
        </label>
        <textarea
          name="suggestions"
          value={formData.suggestions}
          onChange={onChange}
          rows={3}
          className={`w-full px-3 py-2 rounded-lg border border-border bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors resize-vertical`}
          placeholder="Any additional feedback, suggestions, or questions you might have..."
        ></textarea>
        <p className="text-xs text-muted-foreground mt-1">Optional: Any additional feedback, suggestions, or questions you might have</p>
      </div>
    </div>
    
    <div className="bg-secondary/50 border border-border rounded-lg p-4">
      <h4 className="font-medium text-foreground mb-2">Next Steps</h4>
      <p className="text-sm text-muted-foreground">
        Based on your interest level, we may follow up with more information about YANC membership opportunities and how you can get involved with our community.
      </p>
    </div>
  </div>
);

export default DiscoverMeetFeedback;