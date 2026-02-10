import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Check, MapPin, Clock, Calendar, Download } from 'lucide-react';

// Define TypeScript interfaces
interface FormData {
  fullName: string;
  email: string;
  age: string;
  phone: string;
  institution: string;
  referredByFullName: string;
  referredByEmail: string;
  preferredDate: string;
  biggestConcern: string;
  curiosityReason: string;
  attendingWith: string;
}

interface Errors {
  [key: string]: string;
}

const DiscoverMeetRegistration = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  // Form data state
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    age: '',
    phone: '',
    institution: '',
    referredByFullName: '',
    referredByEmail: '',
    preferredDate: '',
    biggestConcern: '',
    curiosityReason: '',
    attendingWith: ''
  });
  
  const [errors, setErrors] = useState<Errors>({});

  // Download guide
  const handleDownloadGuide = () => {
    // Supabase link for event guide
    const guideUrl = '/assets/event-guide.pdf'; // Replace with actual Supabase asset URL
    window.open(guideUrl, '_blank');
  };

  // Handle input changes
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
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

  // Validate form
  const validateForm = () => {
    const newErrors: Errors = {};
    
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.age) newErrors.age = 'Age is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    else if (!/^\d{10}$/.test(formData.phone)) newErrors.phone = 'Phone must be 10 digits';
    if (!formData.institution.trim()) newErrors.institution = 'Institution is required';
    if (!formData.referredByFullName.trim()) newErrors.referredByFullName = 'Referred by name is required';
    if (!formData.preferredDate) newErrors.preferredDate = 'Preferred date is required';
    if (!formData.biggestConcern) newErrors.biggestConcern = 'This field is required';
    if (!formData.curiosityReason) newErrors.curiosityReason = 'This field is required';
    if (!formData.attendingWith) newErrors.attendingWith = 'This field is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      // Simulate API call
      setTimeout(() => {
        console.log('Discover Meet registration submitted:', formData);
        setIsSubmitting(false);
        setShowSuccess(true);
        
        // Reset form after success
        setTimeout(() => {
          setFormData({
            fullName: '',
            email: '',
            age: '',
            phone: '',
            institution: '',
            referredByFullName: '',
            referredByEmail: '',
            preferredDate: '',
            biggestConcern: '',
            curiosityReason: '',
            attendingWith: ''
          });
          setShowSuccess(false);
        }, 3000);
      }, 1500);
    }
  };

  // Dropdown options
  const ageOptions = Array.from({ length: 35 }, (_, i) => i + 13);
  const dateOptions = [
    'Saturday, January 31st, 2026 (10:00 AM – 1:00 PM)',
    'Saturday, February 7th, 2026 (10:00 AM – 1:00 PM)',
    'Saturday, February 14th, 2026 (10:00 AM – 1:00 PM)',
    'Sunday, February 1st, 2026 (10:00 AM – 1:00 PM)',
    'Sunday, February 8th, 2026 (10:00 AM – 1:00 PM)',
    'Sunday, February 15th, 2026 (10:00 AM – 1:00 PM)'
  ];
  const concernOptions = [
    'Lack of exposure',
    'No clear path',
    'Fear of failure',
    'Peer pressure',
    'Academic stress',
    'Career uncertainty',
    'Other'
  ];
  const curiosityOptions = [
    'Connect with like-minded people',
    'Explore new ideas',
    'Personal growth',
    'Career guidance',
    'Just curious',
    'Friend recommendation',
    'Other'
  ];
  const attendingOptions = [
    'Self',
    'A friend',
    'My parent',
    'My sibling',
    'Classmate',
    'Colleague',
    'Other'
  ];

  if (showSuccess) {
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
              <h1 className="text-lg font-medium">Discover Meet Registration</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <button 
                onClick={handleDownloadGuide}
                className="flex items-center space-x-2 text-sm text-primary hover:text-primary/80 transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Event Guide</span>
              </button>
              <div className="h-4 w-px bg-border"></div>
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

        <div className="max-w-2xl mx-auto px-4 py-16">
          <div className="bg-card rounded-xl p-8 border border-border shadow-md text-center">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-8 h-8 text-green-500" />
            </div>
            <h2 className="text-2xl font-bold mb-4">Registration Successful!</h2>
            <p className="text-muted-foreground mb-6">
              Thank you for registering for YANC Discover Meet. We'll send you a confirmation email with event details shortly.
            </p>
            <button
              onClick={() => setShowSuccess(false)}
              className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              Register Another Spot
            </button>
          </div>
        </div>
      </div>
    );
  }

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
            <h1 className="text-lg font-medium">Discover Meet Registration</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <button 
              onClick={handleDownloadGuide}
              className="flex items-center space-x-2 text-sm text-primary hover:text-primary/80 transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Event Guide</span>
            </button>
            <div className="h-4 w-px bg-border"></div>
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
          {/* Left Side - Event Info */}
          <div className="lg:col-span-1">
            <div className="sticky top-4">
              <h2 className="text-lg font-bold text-foreground mb-4">Event Details</h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Location</p>
                    <p className="text-sm text-muted-foreground">RMZ Spire, Hyderabad</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Clock className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Time</p>
                    <p className="text-sm text-muted-foreground">10:00 AM – 1:00 PM</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Calendar className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Schedule</p>
                    <p className="text-sm text-muted-foreground">Next 3 Saturdays & Sundays</p>
                  </div>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-border">
                <p className="text-sm text-muted-foreground">More than an event, it's your launchpad.</p>
              </div>
            </div>
          </div>
          
          {/* Right Side - Form Content */}
          <div className="lg:col-span-3">
            <div className="bg-card rounded-xl p-6 border border-border shadow-md">
              <div className="flex items-center space-x-3 mb-6">
                <Check className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-bold">Registration Form</h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Personal Details */}
                <div>
                  <h3 className="text-lg font-semibold mb-6 pb-2 border-b border-border">
                    🧍 Personal Details
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-lg border ${
                          errors.fullName ? 'border-destructive' : 'border-border'
                        } bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors`}
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
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-lg border ${
                          errors.email ? 'border-destructive' : 'border-border'
                        } bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors`}
                        placeholder="Enter your email"
                      />
                      {errors.email && <p className="text-sm text-destructive mt-1">{errors.email}</p>}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Age *
                      </label>
                      <select
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-lg border ${
                          errors.age ? 'border-destructive' : 'border-border'
                        } bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors`}
                      >
                        <option value="">Select your age</option>
                        {ageOptions.map(age => (
                          <option key={age} value={age.toString()}>{age} years</option>
                        ))}
                      </select>
                      {errors.age && <p className="text-sm text-destructive mt-1">{errors.age}</p>}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Phone *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        maxLength={10}
                        className={`w-full px-4 py-3 rounded-lg border ${
                          errors.phone ? 'border-destructive' : 'border-border'
                        } bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors`}
                        placeholder="Enter 10-digit phone number"
                      />
                      {errors.phone && <p className="text-sm text-destructive mt-1">{errors.phone}</p>}
                    </div>
                    
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Institution *
                      </label>
                      <input
                        type="text"
                        name="institution"
                        value={formData.institution}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-lg border ${
                          errors.institution ? 'border-destructive' : 'border-border'
                        } bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors`}
                        placeholder="Enter your school / college / organization"
                      />
                      {errors.institution && <p className="text-sm text-destructive mt-1">{errors.institution}</p>}
                    </div>
                  </div>
                </div>

                {/* Referral Details */}
                <div>
                  <h3 className="text-lg font-semibold mb-6 pb-2 border-b border-border">
                    🤝 Referral Details
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Referred by – Full Name *
                      </label>
                      <input
                        type="text"
                        name="referredByFullName"
                        value={formData.referredByFullName}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-lg border ${
                          errors.referredByFullName ? 'border-destructive' : 'border-border'
                        } bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors`}
                        placeholder="Enter referrer's full name"
                      />
                      {errors.referredByFullName && <p className="text-sm text-destructive mt-1">{errors.referredByFullName}</p>}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Referred by – Email (Optional)
                      </label>
                      <input
                        type="email"
                        name="referredByEmail"
                        value={formData.referredByEmail}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-border bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors"
                        placeholder="Enter referrer's email"
                      />
                    </div>
                  </div>
                </div>

                {/* Event Preferences */}
                <div>
                  <h3 className="text-lg font-semibold mb-6 pb-2 border-b border-border">
                    📅 Event Preferences
                  </h3>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Preferred Date *
                    </label>
                    <select
                      name="preferredDate"
                      value={formData.preferredDate}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-lg border ${
                        errors.preferredDate ? 'border-destructive' : 'border-border'
                      } bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors`}
                    >
                      <option value="">Select preferred date</option>
                      {dateOptions.map(date => (
                        <option key={date} value={date}>{date}</option>
                      ))}
                    </select>
                    {errors.preferredDate && <p className="text-sm text-destructive mt-1">{errors.preferredDate}</p>}
                  </div>
                </div>

                {/* Insight Questions */}
                <div>
                  <h3 className="text-lg font-semibold mb-6 pb-2 border-b border-border">
                    🧠 Insight Questions
                  </h3>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        What is your biggest concern regarding your future? *
                      </label>
                      <select
                        name="biggestConcern"
                        value={formData.biggestConcern}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-lg border ${
                          errors.biggestConcern ? 'border-destructive' : 'border-border'
                        } bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors`}
                      >
                        <option value="">Select your concern</option>
                        {concernOptions.map(concern => (
                          <option key={concern} value={concern}>{concern}</option>
                        ))}
                      </select>
                      {errors.biggestConcern && <p className="text-sm text-destructive mt-1">{errors.biggestConcern}</p>}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        What made you curious about YANC? *
                      </label>
                      <select
                        name="curiosityReason"
                        value={formData.curiosityReason}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-lg border ${
                          errors.curiosityReason ? 'border-destructive' : 'border-border'
                        } bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors`}
                      >
                        <option value="">Select reason</option>
                        {curiosityOptions.map(reason => (
                          <option key={reason} value={reason}>{reason}</option>
                        ))}
                      </select>
                      {errors.curiosityReason && <p className="text-sm text-destructive mt-1">{errors.curiosityReason}</p>}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Who are you attending the event with? *
                      </label>
                      <select
                        name="attendingWith"
                        value={formData.attendingWith}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-lg border ${
                          errors.attendingWith ? 'border-destructive' : 'border-border'
                        } bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors`}
                      >
                        <option value="">Select option</option>
                        {attendingOptions.map(option => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </select>
                      {errors.attendingWith && <p className="text-sm text-destructive mt-1">{errors.attendingWith}</p>}
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-6">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 px-6 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:-translate-y-0.5 shadow-lg"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary-foreground mr-2"></span>
                        Processing Registration...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center">
                        <Check className="w-5 h-5 mr-2" />
                        Register for Discover Meet
                      </span>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiscoverMeetRegistration;