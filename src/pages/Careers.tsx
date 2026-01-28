import React, { useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Briefcase, FileText } from 'lucide-react';

// Define TypeScript interfaces
interface FormData {
  fullName: string;
  email: string;
  phone: string;
  department: string;
  employmentType: string;
  availableFrom: string;
  linkedinUrl: string;
  description: string;
  resume: File | null;
}

interface Errors {
  [key: string]: string;
}

const Careers = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  // Form data state
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    department: '',
    employmentType: '',
    availableFrom: '',
    linkedinUrl: '',
    description: '',
    resume: null,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Handle input changes - same as Membership Application with debounced error clearing
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing - debounced to prevent focus loss
    if (errors[name]) {
      // Use setTimeout to defer error clearing to next tick
      setTimeout(() => {
        setErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors[name];
          return newErrors;
        });
      }, 0);
    }
  }, [errors]);

  // Handle file uploads - same as Membership Application
  const handleFileUpload = useCallback((name: string, file: File | null) => {
    setFormData(prev => ({ ...prev, [name]: file }));
  }, []);

  // Validate form
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    else if (!/^\d{10}$/.test(formData.phone)) newErrors.phone = 'Phone must be 10 digits';
    if (!formData.department) newErrors.department = 'Department is required';
    if (!formData.employmentType) newErrors.employmentType = 'Employment type is required';
    if (!formData.availableFrom) newErrors.availableFrom = 'Available from date is required';
    if (!formData.resume) newErrors.resume = 'Resume is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit handler
  const handleSubmit = () => {
    if (validateForm()) {
      setIsSubmitting(true);
      
      // Placeholder for backend integration
      // TODO: Add API endpoint: /api/career-application
      setTimeout(() => {
        console.log('Career application submitted:', formData);
        setIsSubmitting(false);
        alert('Application submitted successfully!');
        // Reset form
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          department: '',
          employmentType: '',
          availableFrom: '',
          linkedinUrl: '',
          description: '',
          resume: null,
        });
      }, 2000);
    }
  };

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
            <h1 className="text-lg font-medium">Career Application</h1>
          </div>
          
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

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-card rounded-xl p-8 border border-border shadow-md">
          {/* Inline the form content directly instead of using a nested component */}
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-foreground">Careers</h2>
              <p className="text-muted-foreground mt-2">
                Join Our Team - Be part of something extraordinary
              </p>
            </div>

            {/* Personal Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground flex items-center">
                <User className="w-5 h-5 mr-2 text-primary" />
                Personal Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Full Name <span className="text-destructive">*</span>
                  </label>
                  <input
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className={`w-full px-3 py-2 border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 ${
                      errors.fullName ? 'border-destructive' : 'border-border'
                    }`}
                  />
                  {errors.fullName && <p className="text-destructive text-sm mt-1">{errors.fullName}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Email <span className="text-destructive">*</span>
                  </label>
                  <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className={`w-full px-3 py-2 border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 ${
                      errors.email ? 'border-destructive' : 'border-border'
                    }`}
                  />
                  {errors.email && <p className="text-destructive text-sm mt-1">{errors.email}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Phone <span className="text-destructive">*</span>
                  </label>
                  <input
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => {
                      const value = e.target.value.replace(/[^0-9]/g, '').slice(0, 10);
                      handleChange({ target: { name: 'phone', value } } as React.ChangeEvent<HTMLInputElement>);
                    }}
                    maxLength={10}
                    placeholder="Enter 10-digit phone number"
                    className={`w-full px-3 py-2 border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 ${
                      errors.phone ? 'border-destructive' : 'border-border'
                    }`}
                  />
                  {errors.phone && <p className="text-destructive text-sm mt-1">{errors.phone}</p>}
                </div>
              </div>
            </div>

            {/* Professional Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground flex items-center">
                <Briefcase className="w-5 h-5 mr-2 text-primary" />
                Professional Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Department <span className="text-destructive">*</span>
                  </label>
                  <select
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 ${
                      errors.department ? 'border-destructive' : 'border-border'
                    }`}
                  >
                    <option value="">Select department</option>
                    <option value="Technology">Technology</option>
                    <option value="Operations">Operations</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Community">Community</option>
                    <option value="Design">Design</option>
                    <option value="Partnerships">Partnerships</option>
                    <option value="Other">Other</option>
                  </select>
                  {errors.department && <p className="text-destructive text-sm mt-1">{errors.department}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Employment Type <span className="text-destructive">*</span>
                  </label>
                  <select
                    name="employmentType"
                    value={formData.employmentType}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 ${
                      errors.employmentType ? 'border-destructive' : 'border-border'
                    }`}
                  >
                    <option value="">Select employment type</option>
                    <option value="FULL-TIME">FULL-TIME</option>
                    <option value="INTERNSHIP">INTERNSHIP</option>
                    <option value="PART-TIME">PART-TIME</option>
                  </select>
                  {errors.employmentType && <p className="text-destructive text-sm mt-1">{errors.employmentType}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Available From <span className="text-destructive">*</span>
                  </label>
                  <input
                    name="availableFrom"
                    type="date"
                    value={formData.availableFrom}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 ${
                      errors.availableFrom ? 'border-destructive' : 'border-border'
                    }`}
                  />
                  {errors.availableFrom && <p className="text-destructive text-sm mt-1">{errors.availableFrom}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    LinkedIn URL
                  </label>
                  <input
                    name="linkedinUrl"
                    type="url"
                    value={formData.linkedinUrl}
                    onChange={handleChange}
                    placeholder="https://linkedin.com/in/yourprofile"
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
              </div>
            </div>

            {/* Additional Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground flex items-center">
                <FileText className="w-5 h-5 mr-2 text-primary" />
                Additional Details
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Brief Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Brief description about yourself"
                    rows={4}
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Resume <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => {
                      const file = e.target.files?.[0] || null;
                      if (file) {
                        const validTypes = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
                        if (!validTypes.includes(file.type)) {
                          setErrors(prev => ({ ...prev, resume: "Please upload a PDF, DOC, or DOCX file" }));
                          return;
                        }
                        if (file.size > 5 * 1024 * 1024) {
                          setErrors(prev => ({ ...prev, resume: "File size must be less than 5MB" }));
                          return;
                        }
                      }
                      handleFileUpload('resume', file);
                      if (errors.resume) {
                        setErrors(prev => {
                          const newErrors = { ...prev };
                          delete newErrors.resume;
                          return newErrors;
                        });
                      }
                    }}
                    className={`w-full px-3 py-2 border rounded-lg bg-background text-foreground file:mr-2 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-primary file:text-primary-foreground hover:file:bg-primary/90 ${
                      errors.resume ? 'border-destructive' : 'border-border'
                    }`}
                  />
                  <p className="text-sm text-muted-foreground mt-1">Accepted formats: PDF, DOC, DOCX (Max 5MB)</p>
                  {errors.resume && <p className="text-destructive text-sm mt-1">{errors.resume}</p>}
                </div>
              </div>
            </div>
          </div>
          
          {/* Submit Button */}
          <div className="flex justify-end mt-8 pt-6 border-t border-border">
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="px-6 py-2 rounded-lg bg-gradient-to-r from-primary to-primary/80 text-primary-foreground hover:from-primary/90 hover:to-primary shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Submitting...' : 'Apply'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Careers;