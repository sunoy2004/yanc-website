import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const RefundPolicy = () => {
  const isDarkMode = true;
  const toggleTheme = () => {};
  useEffect(() => { document.documentElement.classList.add("dark"); }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      <main className="py-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <p className="text-sm text-muted-foreground mb-2">YANC ENTERPRISES - MARCH 8, 2025</p>
          <h1 className="text-3xl md:text-4xl font-bold mb-8">Refund Policy</h1>
          <div className="w-16 h-1 bg-primary rounded-full mb-10" />

          <div className="prose prose-neutral dark:prose-invert max-w-none space-y-8">
            <section>
              <h2 className="text-xl font-semibold mb-3">1. General Refund Policy</h2>
              <p className="text-muted-foreground leading-relaxed">
                YANC (Yet Another Networking Club) a unit of YANC ENTERPRISES is a networking and mentorship community that provides membership-based services. Due to the nature of our offerings, we follow a strict no-refund policy except under specific conditions outlined below.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">2. Membership Fee Refunds</h2>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li><strong>Non-Refundable Policy:</strong> All membership fees paid to YANC are non-refundable once the membership is activated.</li>
                <li><strong>Exceptional Cases:</strong> A partial refund may be considered in the following cases:
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>If a member has mistakenly paid for multiple memberships due to a technical error.</li>
                    <li>If the membership application is rejected by YANC before activation.</li>
                  </ul>
                </li>
                <li>Refund requests must be sent to accounts@yanc.in with proof of payment and a valid reason.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">3. Event & Workshop Fee Refunds</h2>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li><strong>Cancellations by YANC:</strong> If YANC cancels an event, workshop, or paid session, a full refund will be issued to registered participants.</li>
                <li><strong>Cancellations by Members:</strong> Refunds for event registrations will be processed as follows:
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>More than 7 days before the event: 100% refund.</li>
                    <li>Within 3-7 days of the event: 50% refund.</li>
                    <li>Less than 3 days before the event: No refund.</li>
                  </ul>
                </li>
                <li>All refund requests must be emailed to accounts@yanc.in at least 3 days before the scheduled event.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">4. Payment Errors & Duplicate Transactions</h2>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>If a member is charged multiple times due to a technical issue, they may request a full refund of the duplicate amount.</li>
                <li>The refund request must be made within 15 days of the transaction and submitted to accounts@yanc.in with transaction details.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">5. Refund Processing Time</h2>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Approved refunds will be processed within 10-15 business days and credited back to the original payment method.</li>
                <li>YANC is not responsible for any delays caused by banks or payment gateways.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">6. No Refund for Misuse or Violations</h2>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>If a member is removed or suspended from YANC due to a violation of community guidelines, misconduct, or fraudulent activity, no refund will be issued.</li>
                <li>Membership fees are non-transferable and cannot be refunded due to a change in personal circumstances.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">7. Changes to This Policy</h2>
              <p className="text-muted-foreground leading-relaxed">
                YANC Enterprises reserves the right to update or modify this Refund Policy at any time.
                Changes will be notified on our website, and continued use of the platform implies acceptance of the revised policy.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">8. Contact Us</h2>
              <p className="text-muted-foreground leading-relaxed">
                For refund-related queries, you can contact us at:{" "}
                <a href="mailto:accounts@yanc.in" className="text-primary hover:underline">accounts@yanc.in</a>
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RefundPolicy;
