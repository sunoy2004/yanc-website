import React, { useState, useEffect } from "react";
import AuthCard from "@/components/AuthCard";
import FormInput from "@/components/FormInput";
import SocialLoginButtons from "@/components/SocialLoginButtons";

// Initialize dark mode for auth pages
if (typeof document !== 'undefined') {
  document.documentElement.classList.add("dark");
}

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
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
      // TODO: Implement actual sign in API call here later
      // For now, simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Simulate successful login
      console.log("Sign in successful", formData);
      
      // Get the redirect URL from query parameters or default to home
      const urlParams = new URLSearchParams(window.location.search);
      const redirectUrl = urlParams.get('redirect') || '/';
      
      // Redirect to the previous page or homepage
      window.location.href = redirectUrl;
    } catch (error) {
      console.error("Sign in error:", error);
      setErrors({ general: "Invalid credentials. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthCard
      title="Welcome back to YANC"
      subtitle="Sign in to your account"
      footerText="Don't have an account?"
      footerLinkText="Sign up"
      footerLinkHref="/signup"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
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
          placeholder="Enter your password"
          required
        />

        {errors.general && (
          <div className="text-destructive text-sm">{errors.general}</div>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 text-primary focus:ring-primary border-border rounded"
            />
            <label
              htmlFor="remember-me"
              className="ml-2 block text-sm text-foreground"
            >
              Remember me
            </label>
          </div>
          <div className="text-sm">
            <a
              href="#"
              className="font-medium text-primary hover:text-primary/80"
            >
              Forgot password?
            </a>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-3 px-4 rounded-lg text-white font-medium transition-colors shadow-lg ${
            isLoading
              ? "bg-primary/70 cursor-not-allowed"
              : "bg-primary hover:bg-primary/90"
          }`}
        >
          {isLoading ? "Signing In..." : "Sign In"}
        </button>
      </form>

      <SocialLoginButtons />
    </AuthCard>
  );
};

export default SignIn;