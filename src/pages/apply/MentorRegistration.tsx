import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Country and State data
const countryStateData = {
  'United States': [
    'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut',
    'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa',
    'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan',
    'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
    'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio',
    'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota',
    'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia',
    'Wisconsin', 'Wyoming', 'District of Columbia'
  ],
  'Canada': [
    'Alberta', 'British Columbia', 'Manitoba', 'New Brunswick', 'Newfoundland and Labrador',
    'Nova Scotia', 'Ontario', 'Prince Edward Island', 'Quebec', 'Saskatchewan',
    'Northwest Territories', 'Nunavut', 'Yukon'
  ],
  'United Kingdom': [
    'England', 'Scotland', 'Wales', 'Northern Ireland'
  ],
  'Australia': [
    'New South Wales', 'Victoria', 'Queensland', 'Western Australia', 'South Australia',
    'Tasmania', 'Australian Capital Territory', 'Northern Territory'
  ],
  'India': [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa',
    'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala',
    'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland',
    'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
    'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 'Andaman and Nicobar Islands',
    'Chandigarh', 'Dadra and Nagar Haveli and Daman and Diu', 'Lakshadweep', 'Delhi',
    'Puducherry', 'Jammu and Kashmir', 'Ladakh'
  ],
  'Germany': [
    'Baden-Württemberg', 'Bavaria', 'Berlin', 'Brandenburg', 'Bremen', 'Hamburg',
    'Hesse', 'Lower Saxony', 'Mecklenburg-Vorpommern', 'North Rhine-Westphalia',
    'Rhineland-Palatinate', 'Saarland', 'Saxony', 'Saxony-Anhalt', 'Schleswig-Holstein', 'Thuringia'
  ],
  'France': [
    'Auvergne-Rhône-Alpes', 'Bourgogne-Franche-Comté', 'Brittany', 'Centre-Val de Loire',
    'Corsica', 'Grand Est', 'Hauts-de-France', 'Île-de-France', 'Normandy', 'Nouvelle-Aquitaine',
    'Occitanie', 'Pays de la Loire', 'Provence-Alpes-Cote d\'Azur'
  ],
  'Brazil': [
    'Acre', 'Alagoas', 'Amapá', 'Amazonas', 'Bahia', 'Ceará', 'Distrito Federal',
    'Espírito Santo', 'Goiás', 'Maranhão', 'Mato Grosso', 'Mato Grosso do Sul',
    'Minas Gerais', 'Pará', 'Paraíba', 'Paraná', 'Pernambuco', 'Piauí',
    'Rio de Janeiro', 'Rio Grande do Norte', 'Rio Grande do Sul', 'Rondônia',
    'Roraima', 'Santa Catarina', 'São Paulo', 'Sergipe', 'Tocantins'
  ],
  'China': [
    'Anhui', 'Beijing', 'Chongqing', 'Fujian', 'Gansu', 'Guangdong', 'Guangxi',
    'Guizhou', 'Hainan', 'Hebei', 'Heilongjiang', 'Henan', 'Hong Kong', 'Hubei',
    'Hunan', 'Inner Mongolia', 'Jiangsu', 'Jiangxi', 'Jilin', 'Liaoning',
    'Macau', 'Ningxia', 'Qinghai', 'Shaanxi', 'Shandong', 'Shanghai',
    'Shanxi', 'Sichuan', 'Tianjin', 'Tibet', 'Xinjiang', 'Yunnan', 'Zhejiang'
  ],
  'Japan': [
    'Hokkaido', 'Aomori', 'Iwate', 'Miyagi', 'Akita', 'Yamagata', 'Fukushima',
    'Ibaraki', 'Tochigi', 'Gunma', 'Saitama', 'Chiba', 'Tokyo', 'Kanagawa',
    'Niigata', 'Toyama', 'Ishikawa', 'Fukui', 'Yamanashi', 'Nagano', 'Gifu',
    'Shizuoka', 'Aichi', 'Mie', 'Shiga', 'Kyoto', 'Osaka', 'Hyogo',
    'Nara', 'Wakayama', 'Tottori', 'Shimane', 'Okayama', 'Hiroshima', 'Yamaguchi',
    'Tokushima', 'Kagawa', 'Ehime', 'Kochi', 'Fukuoka', 'Saga', 'Nagasaki',
    'Kumamoto', 'Oita', 'Miyazaki', 'Kagoshima', 'Okinawa'
  ]
};

const countries = [
  'United States', 'Canada', 'United Kingdom', 'Australia', 'India', 
  'Germany', 'France', 'Brazil', 'China', 'Japan', 'Other'
];

// Define TypeScript interfaces
interface FormData {
  // Step 1: Personal Information
  fullName: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  country: string;
  linkedin: string;
  
  // Step 2: Professional Information
  organization: string;
  yearsExperience: string;
  domainExpertise: string;
  
  // Step 3: Mentoring Preferences
  mentoringReason: string;
  mentoringModes: string[];
  specifyOtherMode: string;
  hoursAvailable: string;
  contributeAreas: string;
  photo: File | null;
  summary: string;
}

interface Errors {
  [key: string]: string;
}

interface StringStepProps {
  formData: FormData;
  errors: Errors;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleCheckbox: (field: string, value: string, checked?: boolean) => void;
  handleFileUpload: (file: File | null) => void;
  onCountryChange?: (country: string) => void;
}

const MentorRegistration = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  // Form data state
  const [formData, setFormData] = useState<FormData>({
    // Step 1: Personal Information
    fullName: '',
    email: '',
    phone: '',
    city: '',
    state: '',
    country: '',
    linkedin: '',
    
    // Step 2: Professional Information
    organization: '',
    yearsExperience: '',
    domainExpertise: '',
    
    // Step 3: Mentoring Preferences
    mentoringReason: '',
    mentoringModes: [],
    specifyOtherMode: '',
    hoursAvailable: '',
    contributeAreas: '',
    photo: null,
    summary: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Steps configuration
  const steps = [
    { id: 1, title: 'Personal Information' },
    { id: 2, title: 'Professional Information' },
    { id: 3, title: 'Mentoring Preferences & Submission' }
  ];

  // Handle input changes
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
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

  // Handle country change
  const handleCountryChange = useCallback((country: string) => {
    setFormData(prev => ({
      ...prev,
      country,
      state: '' // Reset state when country changes
    }));
    
    // Clear country error
    if (errors.country) {
      setTimeout(() => {
        setErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors.country;
          return newErrors;
        });
      }, 0);
    }
  }, [errors]);

  // Handle checkbox changes
  const handleCheckboxChange = useCallback((name: string, value: string, checked?: boolean) => {
    setFormData(prev => {
      const currentValue = prev[name as keyof typeof prev];
      // Ensure we're working with an array for checkbox fields
      const currentArray = Array.isArray(currentValue) ? currentValue as string[] : [];
      // If checked is undefined, toggle the current state
      const isChecked = checked !== undefined ? checked : !currentArray.includes(value);
      const newArray = isChecked
        ? [...currentArray, value]
        : currentArray.filter(item => item !== value);
      return { ...prev, [name]: newArray };
    });
  }, []);

  // Handle file upload
  const handleFileUpload = useCallback((file: File | null) => {
    setFormData(prev => ({ ...prev, photo: file }));
  }, []);

  // Validate current step
  const validateStep = (step: number) => {
    const newErrors: Record<string, string> = {};
    
    switch (step) {
      case 1:
        if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
        if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
        else if (!/\d{10}/.test(formData.phone)) newErrors.phone = 'Phone must be 10 digits';
        if (!formData.city.trim()) newErrors.city = 'City is required';
        if (!formData.state.trim()) newErrors.state = 'State/Province is required';
        if (!formData.country.trim()) newErrors.country = 'Country is required';
        break;
      case 2:
        if (!formData.organization.trim()) newErrors.organization = 'Organization is required';
        if (!formData.yearsExperience.trim()) newErrors.yearsExperience = 'Years of experience is required';
        else if (isNaN(Number(formData.yearsExperience)) || Number(formData.yearsExperience) < 0) newErrors.yearsExperience = 'Must be a valid number';
        if (!formData.domainExpertise.trim()) newErrors.domainExpertise = 'Domain expertise is required';
        break;
      case 3:
        if (!formData.mentoringReason.trim()) newErrors.mentoringReason = 'Mentoring reason is required';
        else if (formData.mentoringReason.length > 100) newErrors.mentoringReason = 'Must be 100 characters or less';
        if (formData.mentoringModes.length === 0) newErrors.mentoringModes = 'At least one mentoring mode is required';
        if (!formData.hoursAvailable.trim()) newErrors.hoursAvailable = 'Hours available is required';
        else if (isNaN(Number(formData.hoursAvailable)) || Number(formData.hoursAvailable) < 0) newErrors.hoursAvailable = 'Must be a valid number';
        if (!formData.summary.trim()) newErrors.summary = 'Summary is required';
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
      // TODO: Add API endpoint: /api/mentor-registration
      onSubmitMentorRegistration(formData);
    }
  };

  // Backend submission placeholder
  const onSubmitMentorRegistration = async (data: FormData) => {
    console.log('Mentor registration submitted:', data);
    setIsSubmitting(false);
    // Navigate to success page
    navigate('/success');
  };

  // Calculate progress percentage
  const progressPercentage = ((currentStep - 1) / 3) * 100;

  // Get step component
  const StepComponent = React.useMemo(() => {
    switch (currentStep) {
      case 1: return <Step1 formData={formData} errors={errors} onChange={handleChange} handleCheckbox={handleCheckboxChange} handleFileUpload={handleFileUpload} onCountryChange={handleCountryChange} />;
      case 2: return <Step2 formData={formData} errors={errors} onChange={handleChange} handleCheckbox={handleCheckboxChange} handleFileUpload={handleFileUpload} />;
      case 3: return <Step3 formData={formData} errors={errors} onChange={handleChange} handleCheckbox={handleCheckboxChange} handleFileUpload={handleFileUpload} />;
      default: return <div>Step not found</div>;
    }
  }, [currentStep, formData, errors, handleChange, handleCheckboxChange, handleFileUpload, handleCountryChange]);

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
            <h1 className="text-lg font-medium">YANC Mentor Registration</h1>
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
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-foreground">YANC Mentor Registration</h2>
                <p className="text-muted-foreground">Share your expertise and guide the next generation.</p>
              </div>
              
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
                      'Register as Mentor'
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
const Step1: React.FC<StringStepProps> = ({ formData, errors, onChange, onCountryChange }) => (
  <div className="space-y-4">
    <div>
      <h3 className="text-xl font-bold text-foreground mb-2">Personal Information</h3>
      <p className="text-muted-foreground">Tell us about yourself</p>
    </div>
    
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Full Name *
        </label>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={onChange}
          className={
            `w-full px-3 py-2 rounded-lg border ` +
            (errors.fullName ? 'border-destructive' : 'border-border') +
            ` bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors`}
          placeholder="Enter your full name"
        />
        {errors.fullName && <p className="text-sm text-destructive mt-1">{errors.fullName}</p>}
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
          Phone *
        </label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={(e) => {
            const value = e.target.value.replace(/[^0-9]/g, '').slice(0, 10);
            onChange({ target: { name: 'phone', value } } as React.ChangeEvent<HTMLInputElement>);
          }}
          maxLength={10}
          className={
            `w-full px-3 py-2 rounded-lg border ` +
            (errors.phone ? 'border-destructive' : 'border-border') +
            ` bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors`}
          placeholder="Enter 10-digit phone number"
        />
        {errors.phone && <p className="text-sm text-destructive mt-1">{errors.phone}</p>}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            City *
          </label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={onChange}
            className={
              `w-full px-3 py-2 rounded-lg border ` +
              (errors.city ? 'border-destructive' : 'border-border') +
              ` bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors`}
            placeholder="City"
          />
          {errors.city && <p className="text-sm text-destructive mt-1">{errors.city}</p>}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            State/Province *
          </label>
          {formData.country && countryStateData[formData.country] ? (
            <select
              name="state"
              value={formData.state}
              onChange={onChange}
              className={
                `w-full px-3 py-2 rounded-lg border ` +
                (errors.state ? 'border-destructive' : 'border-border') +
                ` bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors`}
            >
              <option value="">Select State/Province</option>
              {countryStateData[formData.country].map((state) => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
          ) : formData.country === 'Other' ? (
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={onChange}
              className={
                `w-full px-3 py-2 rounded-lg border ` +
                (errors.state ? 'border-destructive' : 'border-border') +
                ` bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors`}
              placeholder="Enter State/Province"
            />
          ) : (
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={onChange}
              className={
                `w-full px-3 py-2 rounded-lg border ` +
                (errors.state ? 'border-destructive' : 'border-border') +
                ` bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors`}
              placeholder="State/Province"
            />
          )}
          {errors.state && <p className="text-sm text-destructive mt-1">{errors.state}</p>}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Country *
          </label>
          <select
            name="country"
            value={formData.country}
            onChange={(e) => {
              if (onCountryChange) {
                onCountryChange(e.target.value);
              }
              onChange(e);
            }}
            className={
              `w-full px-3 py-2 rounded-lg border ` +
              (errors.country ? 'border-destructive' : 'border-border') +
              ` bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors`}
          >
            <option value="">Select Country</option>
            {countries.map((country) => (
              <option key={country} value={country}>{country}</option>
            ))}
          </select>
          {errors.country && <p className="text-sm text-destructive mt-1">{errors.country}</p>}
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          LinkedIn Profile URL
        </label>
        <input
          type="url"
          name="linkedin"
          value={formData.linkedin}
          onChange={onChange}
          className={`w-full px-3 py-2 rounded-lg border border-border bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors`}
          placeholder="https://linkedin.com/in/your-profile"
        />
        <p className="text-xs text-muted-foreground mt-1">Optional but encouraged</p>
      </div>
    </div>
    
    <div className="bg-secondary/50 border border-border rounded-lg p-4">
      <h4 className="font-medium text-foreground mb-2">Why do we need this information?</h4>
      <p className="text-sm text-muted-foreground">
        This information helps us connect you with relevant mentees and communicate effectively.
      </p>
    </div>
  </div>
);

// Step 2 Component
const Step2: React.FC<StringStepProps> = ({ formData, errors, onChange }) => (
  <div className="space-y-4">
    <div>
      <h3 className="text-xl font-bold text-foreground mb-2">Professional Information</h3>
      <p className="text-muted-foreground">Tell us about your professional background</p>
    </div>
    
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Current Organization *
        </label>
        <input
          type="text"
          name="organization"
          value={formData.organization}
          onChange={onChange}
          className={
            `w-full px-3 py-2 rounded-lg border ` +
            (errors.organization ? 'border-destructive' : 'border-border') +
            ` bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors`}
          placeholder="Enter your current organization"
        />
        {errors.organization && <p className="text-sm text-destructive mt-1">{errors.organization}</p>}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Total Years of Experience *
          </label>
          <input
            type="number"
            name="yearsExperience"
            value={formData.yearsExperience}
            onChange={onChange}
            min="0"
            className={
              `w-full px-3 py-2 rounded-lg border ` +
              (errors.yearsExperience ? 'border-destructive' : 'border-border') +
              ` bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors`}
            placeholder="Years"
          />
          {errors.yearsExperience && <p className="text-sm text-destructive mt-1">{errors.yearsExperience}</p>}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Domain Expertise *
          </label>
          <input
            type="text"
            name="domainExpertise"
            value={formData.domainExpertise}
            onChange={onChange}
            className={
              `w-full px-3 py-2 rounded-lg border ` +
              (errors.domainExpertise ? 'border-destructive' : 'border-border') +
              ` bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors`}
            placeholder="Technology, Marketing, Finance, Healthcare, etc."
          />
          {errors.domainExpertise && <p className="text-sm text-destructive mt-1">{errors.domainExpertise}</p>}
        </div>
      </div>
    </div>
  </div>
);

// Step 3 Component
const Step3: React.FC<StringStepProps> = ({ formData, errors, onChange, handleCheckbox, handleFileUpload }) => (
  <div className="space-y-4">
    <div>
      <h3 className="text-xl font-bold text-foreground mb-2">Mentoring Preferences & Submission</h3>
      <p className="text-muted-foreground">Tell us about your mentoring preferences</p>
    </div>
    
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Primary reason for mentoring * (max 100 characters)
        </label>
        <textarea
          name="mentoringReason"
          value={formData.mentoringReason}
          onChange={onChange}
          rows={3}
          maxLength={100}
          className={
            `w-full px-3 py-2 rounded-lg border ` +
            (errors.mentoringReason ? 'border-destructive' : 'border-border') +
            ` bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors resize-vertical`}
          placeholder="Why do you want to mentor?"
        ></textarea>
        <div className="flex justify-between items-center mt-1">
          {errors.mentoringReason && <p className="text-sm text-destructive">{errors.mentoringReason}</p>}
          <p className="text-xs text-muted-foreground ml-auto">{formData.mentoringReason.length}/100</p>
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Preferred Mentoring Mode * (select all that apply)
        </label>
        <div className="space-y-2">
          {['1:1 Session', 'Group Mentoring', 'Guest Speaker', 'Strategic Guidance', 'Networking', 'Other'].map((mode) => (
            <div key={mode} className="flex items-start">
              <input
                type="checkbox"
                id={`mode-${mode.replace(/\s+/g, '-').toLowerCase()}`}
                name="mentoringModes"
                value={mode}
                checked={formData.mentoringModes.includes(mode)}
                onChange={(e) => handleCheckbox('mentoringModes', mode, e.target.checked)}
                className="mt-1 mr-3 h-4 w-4 rounded border-border text-primary focus:ring-primary"
              />
              <label htmlFor={`mode-${mode.replace(/\s+/g, '-').toLowerCase()}`} className="text-foreground">
                {mode}
              </label>
            </div>
          ))}
        </div>
        {errors.mentoringModes && <p className="text-sm text-destructive mt-1">{errors.mentoringModes}</p>}
        
        {formData.mentoringModes.includes('Other') && (
          <div className="mt-3 ml-7">
            <label className="block text-sm font-medium text-foreground mb-2">
              Please specify
            </label>
            <input
              type="text"
              name="specifyOtherMode"
              value={formData.specifyOtherMode}
              onChange={onChange}
              className={`w-full px-3 py-2 rounded-lg border border-border bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors`}
              placeholder="Specify other mentoring mode"
            />
          </div>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Hours available per month *
          </label>
          <input
            type="number"
            name="hoursAvailable"
            value={formData.hoursAvailable}
            onChange={onChange}
            min="0"
            className={
              `w-full px-3 py-2 rounded-lg border ` +
              (errors.hoursAvailable ? 'border-destructive' : 'border-border') +
              ` bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors`}
            placeholder="Hours"
          />
          {errors.hoursAvailable && <p className="text-sm text-destructive mt-1">{errors.hoursAvailable}</p>}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Open to contribute in other areas?
          </label>
          <select
            name="contributeAreas"
            value={formData.contributeAreas}
            onChange={onChange}
            className={`w-full px-3 py-2 rounded-lg border border-border bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors`}
          >
            <option value="">Select an option</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
            <option value="Maybe">Maybe</option>
          </select>
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Upload Photo
        </label>
        <div className="flex items-center space-x-4">
          <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-border rounded-lg cursor-pointer bg-input hover:bg-accent transition-colors">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg className="w-8 h-8 mb-4 text-muted-foreground" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
              </svg>
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-muted-foreground">SVG, PNG, JPG or GIF (MAX. 2MB)</p>
            </div>
            <input 
              type="file" 
              className="hidden" 
              accept="image/*"
              onChange={(e) => e.target.files && e.target.files[0] ? handleFileUpload(e.target.files[0]) : handleFileUpload(null)}
            />
          </label>
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Brief Summary *
        </label>
        <textarea
          name="summary"
          value={formData.summary}
          onChange={onChange}
          rows={4}
          className={
            `w-full px-3 py-2 rounded-lg border ` +
            (errors.summary ? 'border-destructive' : 'border-border') +
            ` bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors resize-vertical`}
          placeholder="Brief summary about yourself and what you can offer as a mentor"
        ></textarea>
        {errors.summary && <p className="text-sm text-destructive mt-1">{errors.summary}</p>}
      </div>
    </div>
  </div>
);

export default MentorRegistration;