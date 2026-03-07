import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const PrivacyPolicy = () => {
  const isDarkMode = true;
  const toggleTheme = () => {};
  useEffect(() => { document.documentElement.classList.add("dark"); }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      <main className="py-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <p className="text-sm text-muted-foreground mb-2">YANC ENTERPRISES - FEBRUARY 25, 2025</p>
          <h1 className="text-3xl md:text-4xl font-bold mb-8">Privacy Policy</h1>
          <div className="w-16 h-1 bg-primary rounded-full mb-10" />

          <div className="prose prose-neutral dark:prose-invert max-w-none space-y-8">
            <section>
              <h2 className="text-xl font-semibold mb-3">1. Introduction</h2>
              <p className="text-muted-foreground leading-relaxed">
                Welcome to YANC (Yet Another Networking Community)! Your privacy is important to us. This Privacy Policy explains how www.yanc.in collects, uses, shares, and protects your personal data when you visit our website, participate in our programs, or engage with us online.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-3">
                Our platform is designed for young individuals aged 15 to 28 who aspire to grow through mentorship, networking, and experiential learning opportunities. We are committed to safeguarding your personal information while ensuring a safe and enriching experience.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">2. Data We Collect</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We collect different types of personal information based on your interactions with YANC.
              </p>
              <h3 className="text-lg font-medium mb-2">2.1 Personal Information (Directly Provided by You)</h3>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
                <li><strong>Basic Details:</strong> Name, age, gender, profile photo, and educational details.</li>
                <li><strong>Contact Information:</strong> Email address, phone number, and city/state.</li>
                <li><strong>Account Information:</strong> Username, password, and preferences when you register on YANC.</li>
                <li><strong>Application Data:</strong> Information provided while applying for membership, mentorship, internships, or cohort leadership roles.</li>
                <li><strong>User-Generated Content:</strong> Posts, comments, videos, and other materials you share within YANC community.</li>
              </ul>
              <h3 className="text-lg font-medium mb-2">2.2 Automatically Collected Data</h3>
              <p className="text-muted-foreground leading-relaxed mb-2">When you use our website, we may collect:</p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
                <li><strong>Device Information:</strong> IP address, browser type, and operating system.</li>
                <li><strong>Usage Data:</strong> Pages visited, time spent on the site, and engagement metrics.</li>
                <li><strong>Cookies and Tracking:</strong> We use cookies to personalize your experience and improve our platform.</li>
              </ul>
              <h3 className="text-lg font-medium mb-2">2.3 Sensitive Information</h3>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>If you are under 18, we may require parental/guardian consent for data collection and certain activities.</li>
                <li>We do not collect financial data, religious beliefs, or other sensitive data unless required for program eligibility.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">3. How We Use Your Data</h2>
              <p className="text-muted-foreground leading-relaxed mb-2">We use your data responsibly for:</p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Creating your YANC profile and enabling interaction with members, management, mentors, and networking groups.</li>
                <li>Facilitating internships, workshops, mentorship and career opportunities.</li>
                <li>Enhancing user experience by personalizing content.</li>
                <li>Ensuring platform security and preventing fraud or misuse.</li>
                <li>Communicating about events, updates, and opportunities.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">4. Data Sharing and Disclosure</h2>
              <p className="text-muted-foreground leading-relaxed mb-2">
                We do not sell or rent your personal data. We may share data with:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li><strong>Mentors and Program Coordinators:</strong> Limited data to facilitate YANC mentorship programs.</li>
                <li><strong>Educational and Career Partners:</strong> With your consent, for internship or job opportunities.</li>
                <li><strong>Legal and Compliance:</strong> When required by Indian law.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">5. Data Security and Retention</h2>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>We use secure, encrypted third-party cloud servers and access controls.</li>
                <li>Data is stored as long as necessary or as required by Indian law.</li>
                <li>You can request data deletion or account deactivation by contacting legal@yanc.in.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">6. Your Rights (DPDP 2023)</h2>
              <p className="text-muted-foreground leading-relaxed mb-2">
                As per the Digital Personal Data Protection Act (DPDP) 2023, you have the right to access, correct, delete your data, and withdraw consent at any time.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">7. Third-Party Links</h2>
              <p className="text-muted-foreground leading-relaxed">
                YANC may contain links to external websites. We are not responsible for their privacy practices; please review their policies before sharing data.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">8. Children's Privacy (Under 18)</h2>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>If you are under 18, obtain parent or guardian consent before using YANC.</li>
                <li>Certain interactions may be monitored for online safety.</li>
                <li>Parents/guardians can request access, deletion, or corrections of their child's data.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">9. Updates to This Policy</h2>
              <p className="text-muted-foreground leading-relaxed">
                We may update this Privacy Policy periodically. Changes will be notified on our website and, where necessary, via email.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">10. Contact Us</h2>
              <p className="text-muted-foreground leading-relaxed">
                For privacy questions or requests: Email{" "}
                <a href="mailto:legal@yanc.in" className="text-primary hover:underline">legal@yanc.in</a>
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
