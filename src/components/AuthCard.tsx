import React from "react";

interface AuthCardProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  footerText: string;
  footerLinkText: string;
  footerLinkHref: string;
}

const AuthCard: React.FC<AuthCardProps> = ({
  title,
  subtitle,
  children,
  footerText,
  footerLinkText,
  footerLinkHref,
}) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <div className="bg-card rounded-2xl shadow-2xl border border-border overflow-hidden">
          <div className="p-8">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-foreground">{title}</h1>
              {subtitle && <p className="text-muted-foreground mt-2">{subtitle}</p>}
            </div>
              
            <div className="space-y-6">
              {children}
            </div>
          </div>
            
          <div className="bg-muted/20 px-8 py-4 text-center border-t border-border">
            <p className="text-sm text-muted-foreground">
              {footerText}{' '}
              <a 
                href={footerLinkHref} 
                className="text-primary font-medium hover:underline underline-offset-4"
              >
                {footerLinkText}
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthCard;