import React from "react";

interface SocialLoginButtonsProps {
  onGoogleLogin?: () => void;
  onLinkedInLogin?: () => void;
}

const SocialLoginButtons: React.FC<SocialLoginButtonsProps> = ({
  onGoogleLogin,
  onLinkedInLogin,
}) => {
  // Placeholder functions for social login
  const handleGoogleLogin = () => {
    if (onGoogleLogin) {
      onGoogleLogin();
    } else {
      // TODO: Implement Google OAuth logic here later
      console.log("Google login clicked - OAuth logic goes here");
    }
  };

  const handleLinkedInLogin = () => {
    if (onLinkedInLogin) {
      onLinkedInLogin();
    } else {
      // TODO: Implement LinkedIn OAuth logic here later
      console.log("LinkedIn login clicked - OAuth logic goes here");
    }
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-card text-muted-foreground text-sm">
            or continue with
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={handleGoogleLogin}
          className="flex items-center justify-center px-4 py-3 bg-background border border-border rounded-lg hover:bg-accent transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 shadow-sm"
          aria-label="Sign in with Google"
        >
          <svg
            className="w-5 h-5 mr-2"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M22.56 12.25C22.56 11.47 22.49 10.72 22.36 10H12V14.26H17.92C17.71 15.64 17.03 16.84 16.04 17.71V20.34H19.44C21.44 18.5 22.56 16.04 22.56 13.25V12.25Z"
              fill="#4285F4"
            />
            <path
              d="M12 23C14.97 23 17.46 22.02 19.44 20.34L16.04 17.71C15.04 18.38 13.7 18.81 12 18.81C9.1 18.81 6.6 16.81 5.7 14.11H2.1V16.88C3.97 20.5 7.7 23 12 23Z"
              fill="#34A853"
            />
            <path
              d="M5.7 14.11C5.5 13.51 5.37 12.88 5.37 12.25C5.37 11.62 5.5 10.99 5.7 10.39V7.62H2.1C1.43 8.95 1 10.56 1 12.25C1 13.94 1.43 15.55 2.1 16.88L5.7 14.11Z"
              fill="#FBBC05"
            />
            <path
              d="M12 4.75C13.82 4.75 15.43 5.39 16.69 6.59L19.5 3.78C17.48 1.88 14.9 0.75 12 0.75C7.7 0.75 3.97 3.25 2.1 6.88L5.7 9.61C6.6 6.91 9.1 4.75 12 4.75Z"
              fill="#EA4335"
            />
          </svg>
          <span className="text-sm font-medium text-foreground">Google</span>
        </button>

        <button
          onClick={handleLinkedInLogin}
          className="flex items-center justify-center px-4 py-3 bg-background border border-border rounded-lg hover:bg-accent transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 shadow-sm"
          aria-label="Sign in with LinkedIn"
        >
          <svg
            className="w-5 h-5 mr-2"
            viewBox="0 0 24 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
          <span className="text-sm font-medium text-foreground">LinkedIn</span>
        </button>
      </div>
    </div>
  );
};

export default SocialLoginButtons;