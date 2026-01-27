import React, { useState, useCallback } from 'react';
import { Check, MapPin, Clock, Calendar } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

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
  const [isDarkMode, setIsDarkMode] = useState(true);
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

  // Toggle theme
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
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
      <div className="min-h-screen bg-background text-foreground">
        <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
        
        <main className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <div className="bg-card border border-border rounded-xl p-12 shadow-lg">
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
        </main>
        
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      
      <main className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {/* Header Section */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                YANC Discover Meet
              </h1>
              <div className="w-20 h-1 bg-primary rounded-full mx-auto mb-6"></div>
              <p className="text-xl text-muted-foreground mb-2">
                More than an event, it's your launchpad.
              </p>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Join us for an immersive experience combining networking, learning, and real-world exposure with like-minded young professionals and industry experts.
              </p>
            </div>

            {/* Event Metadata */}
            <div className="bg-card border border-border rounded-xl p-6 mb-8 shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-primary flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium">Location</p>
                    <p className="text-muted-foreground">RMZ Spire, Hyderabad</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-primary flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium">Time</p>
                    <p className="text-muted-foreground">10:00 AM – 1:00 PM</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-primary flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium">Schedule</p>
                    <p className="text-muted-foreground">Next 3 Saturdays & Sundays</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Registration Form */}
            <div className="bg-card border border-border rounded-xl p-8 shadow-sm">
              <div className="flex items-center space-x-3 mb-8">
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
      </main>
      
      <Footer />
    </div>
  );
};

export default DiscoverMeetRegistration;