import React, { useState, useEffect } from "react";
import AuthCard from "@/components/AuthCard";
import FormInput from "@/components/FormInput";
import SocialLoginButtons from "@/components/SocialLoginButtons";

// Initialize dark mode for auth pages
if (typeof document !== 'undefined') {
  document.documentElement.classList.add("dark");
}

const SignUp = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));

    // Clear error when user starts typing
    if (errors[id]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[id];
        return newErrors;
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // TODO: Implement actual sign up API call here later
      // For now, simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Simulate successful registration
      console.log("Sign up successful", formData);
      
      // Get the redirect URL from query parameters or default to home
      const urlParams = new URLSearchParams(window.location.search);
      const redirectUrl = urlParams.get('redirect') || '/';
      
      // Redirect to the previous page or homepage
      window.location.href = redirectUrl;
    } catch (error) {
      console.error("Sign up error:", error);
      setErrors({ general: "An error occurred during sign up. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthCard
      title="Create your YANC account"
      subtitle="Join our community of professionals"
      footerText="Already have an account?"
      footerLinkText="Sign in"
      footerLinkHref="/signin"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormInput
          label="Full Name"
          id="fullName"
          type="text"
          value={formData.fullName}
          onChange={handleChange}
          error={errors.fullName}
          placeholder="Enter your full name"
          required
        />

        <FormInput
          label="Email"
          id="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          placeholder="Enter your email"
          required
        />

        <FormInput
          label="Password"
          id="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
          placeholder="Create a password"
          required
        />

        <FormInput
          label="Confirm Password"
          id="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
          placeholder="Confirm your password"
          required
        />

        {errors.general && (
          <div className="text-destructive text-sm">{errors.general}</div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-3 px-4 rounded-lg text-white font-medium transition-colors shadow-lg ${
            isLoading
              ? "bg-primary/70 cursor-not-allowed"
              : "bg-primary hover:bg-primary/90"
          }`}
        >
          {isLoading ? "Creating Account..." : "Sign Up"}
        </button>
      </form>

      <SocialLoginButtons />
    </AuthCard>
  );
};

export default SignUp;