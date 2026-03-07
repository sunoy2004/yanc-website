import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const CookiePolicy = () => {
  const isDarkMode = true;
  const toggleTheme = () => {};
  useEffect(() => { document.documentElement.classList.add("dark"); }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      <main className="py-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <p className="text-sm text-muted-foreground mb-2">YANC ENTERPRISES - FEBRUARY 28, 2025</p>
          <h1 className="text-3xl md:text-4xl font-bold mb-8">Cookie Policy</h1>
          <div className="w-16 h-1 bg-primary rounded-full mb-10" />

          <div className="prose prose-neutral dark:prose-invert max-w-none space-y-8">
            <section>
              <h2 className="text-xl font-semibold mb-3">1. Introduction</h2>
              <p className="text-muted-foreground leading-relaxed">
                At YANC (Yet Another Networking Club), we use cookies and similar tracking technologies to enhance your browsing experience, improve our website, and understand how our users interact with our platform. This Cookie Policy explains what cookies are, how we use them, and how you can manage your preferences.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">2. What Are Cookies?</h2>
              <p className="text-muted-foreground leading-relaxed">
                Cookies are small text files stored on your device (computer, tablet, or mobile) when you visit a website. They help the website remember your preferences, recognize you on future visits, and improve overall functionality.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">3. How We Use Cookies</h2>
              <p className="text-muted-foreground leading-relaxed mb-2">We use cookies for the following purposes:</p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li><strong>Essential Cookies:</strong> Necessary for the website to function properly and cannot be disabled. They include login authentication, session management, and security-related cookies.</li>
                <li><strong>Performance & Analytics Cookies:</strong> Help us understand how users interact with our website by collecting anonymous usage data to improve our content and services.</li>
                <li><strong>Functionality Cookies:</strong> Allow us to remember user preferences such as language settings and customizations.</li>
                <li><strong>Advertising & Third-Party Cookies:</strong> May be set by third-party partners to display relevant advertisements and track engagement with marketing campaigns.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">4. Third-Party Cookies</h2>
              <p className="text-muted-foreground leading-relaxed">
                We may use third-party services such as Google Analytics and social media integrations that place cookies on your device. These cookies are governed by their respective privacy policies, and we encourage you to review them.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">5. Managing Your Cookie Preferences</h2>
              <p className="text-muted-foreground leading-relaxed mb-2">You can manage or disable cookies through your browser settings. Most browsers allow you to:</p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
                <li>View cookies stored on your device.</li>
                <li>Delete all or specific cookies.</li>
                <li>Block third-party cookies.</li>
                <li>Set preferences for accepting or rejecting cookies.</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed">
                However, disabling certain cookies may impact your experience on our website and limit functionality.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">6. Updates to This Cookie Policy</h2>
              <p className="text-muted-foreground leading-relaxed">
                We may update this Cookie Policy periodically. Changes will be posted on this page, and where required, we will notify you of significant changes.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">7. Contact Us</h2>
              <p className="text-muted-foreground leading-relaxed">
                For any questions or concerns regarding this Cookie Policy, you can contact us at: Email:{" "}
                <a href="mailto:connect@yanc.in" className="text-primary hover:underline">connect@yanc.in</a>
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CookiePolicy;
