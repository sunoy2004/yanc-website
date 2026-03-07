import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const TermsAndConditions = () => {
  const isDarkMode = true;
  const toggleTheme = () => {};
  useEffect(() => { document.documentElement.classList.add("dark"); }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      <main className="py-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <p className="text-sm text-muted-foreground mb-2">YANC ENTERPRISES - FEBRUARY 27, 2025</p>
          <h1 className="text-3xl md:text-4xl font-bold mb-8">Terms & Conditions</h1>
          <div className="w-16 h-1 bg-primary rounded-full mb-10" />

          <div className="prose prose-neutral dark:prose-invert max-w-none space-y-8">
            <section>
              <h2 className="text-xl font-semibold mb-3">1. Introduction</h2>
              <p className="text-muted-foreground leading-relaxed">
                Welcome to YANC (Yet Another Networking Club)! These Terms and Conditions ("Terms") govern your access and use of www.yanc.in ("Website", "Platform", "Service"). By accessing or using our website, you agree to comply with these Terms. If you do not agree with any part of these Terms, you should refrain from using the Website.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">2. Eligibility</h2>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Users must be aged 15 to 28 years to join YANC programs and initiatives.</li>
                <li>If you are under 18 years of age, parental/guardian consent is required.</li>
                <li>You agree to provide accurate and complete information during registration.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">3. User Responsibilities</h2>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Users shall not post or share offensive, abusive, illegal, or harmful content</li>
                <li>Any misuse of the platform, including spamming, hacking, or impersonation, is strictly prohibited.</li>
                <li>Users shall respect other members and engage in constructive discussions</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">4. Membership and Account</h2>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>YANC reserves the right to approve, suspend, or terminate memberships at its discretion.</li>
                <li>Users must maintain confidentiality of their account credentials and are responsible for all activities under their account.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">5. Intellectual Property</h2>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>All content on YANC's website, including logos, text, videos, and graphics, is owned by or licensed to YANC.</li>
                <li>Users may not reproduce, distribute, or modify any content without prior written consent from YANC.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">6. Privacy & Data Protection</h2>
              <p className="text-muted-foreground leading-relaxed">
                Your use of YANC is also governed by our Privacy Policy, which outlines how we collect and handle your personal data.
                By using our platform, you agree that your data may be collected and processed as per applicable laws.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">7. Code of Conduct</h2>
              <p className="text-muted-foreground leading-relaxed">
                Users are expected to maintain professionalism and integrity in all interactions.
                Harassment, discrimination, and any form of misconduct will result in immediate suspension or termination from YANC.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">8. Third-Party Links & Services</h2>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>YANC may contain links to third-party websites for additional resources.</li>
                <li>YANC does not endorse or take responsibility for the content or privacy practices of third party sites.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">9. Limitation of Liability</h2>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>YANC shall not be held liable for any direct, indirect, incidental, or consequential damages arising from the use of its website or services.</li>
                <li>We do not guarantee uninterrupted or error-free operation of the platform.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">10. Modifications to Terms</h2>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>YANC reserves the right to update or modify these Terms at any time.</li>
                <li>Users will be notified of significant changes, and continued use of the platform implies acceptance of the revised Terms.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">11. Termination</h2>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>YANC may suspend or terminate user accounts for violating these Terms or engaging in any activity harmful to the community.</li>
                <li>Users can request account deletion by contacting connect@yanc.in.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">12. Governing Law & Dispute Resolution</h2>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>These Terms shall be governed by the laws of India.</li>
                <li>Any disputes arising shall be subject to the local jurisdiction</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">13. Contact Us</h2>
              <p className="text-muted-foreground leading-relaxed">
                For any questions regarding these Terms, contact us at: Email:{" "}
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

export default TermsAndConditions;
