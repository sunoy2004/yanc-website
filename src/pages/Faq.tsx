import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ChevronDown, ChevronUp } from "lucide-react";

interface FaqItem {
  question: string;
  answer: string;
}

interface AccordionSection {
  title: string;
  items: FaqItem[];
}

const Faq = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [activeSection, setActiveSection] = useState<number | null>(null);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  const toggleSection = (index: number) => {
    setActiveSection(activeSection === index ? null : index);
  };

  const faqSections: AccordionSection[] = [
    {
      title: "Discover Meet",
      items: [
        {
          question: "What is a Discover Meet?",
          answer: "Discover Meet is a formal meet-and-greet session where prospective members receive an overview of YANC."
        },
        {
          question: "What exactly is YANC, and how is it different from other networking or youth clubs?",
          answer: "YANC is a unique networking platform designed to empower young minds by building meaningful connections and learning life skills from a young age. Unlike traditional groups, YANC focuses on experiential learning, mentorship, and personal growth."
        },
        {
          question: "How does YANC help young people beyond traditional education?",
          answer: "YANC bridges the gap between traditional education systems and real-world skills by focusing on life skills, networking, and mentorship opportunities that schools and colleges typically do not offer at scale."
        },
        {
          question: "Is YANC only for students, or can working professionals also join?",
          answer: "YANC is open to students, young professionals, and entrepreneurs aged 18–28 who are keen on learning, growing, and contributing to a supportive network."
        },
        {
          question: "How often do YANC members meet, and what happens in these meetings?",
          answer: "YANC members typically meet bi-weekly for structured discussions, mentorship sessions, networking, and interactive learning experiences."
        },
        {
          question: "Is YANC open to members from all backgrounds and fields?",
          answer: "Yes, YANC encourages a diverse community where members from various backgrounds and fields can connect and learn from one another."
        }
      ]
    },
    {
      title: "Membership Application",
      items: [
        {
          question: "What is the purpose of the membership application process?",
          answer: "The YANC Membership Application Process is designed to identify, evaluate, and onboard passionate young individuals who align with YANC's mission of empowering young minds through meaningful connections, purposeful learning, and real-world experiences."
        },
        {
          question: "How can someone apply to join YANC?",
          answer: "Interested individuals can apply through the official YANC website (www.yanc.in) by filling out the \"Contact Us\" form. The YANC team will reach out with the next steps."
        },
        {
          question: "Is there a selection process? If yes, what does it involve?",
          answer: "Yes, the selection process includes an application review, an interview, and a short presentation on a given topic."
        },
        {
          question: "What happens after someone gets selected as a YANC member?",
          answer: "Selected members receive a welcome kit, onboarding training, are assigned a buddy, and placed into a cohort for continuous learning and networking."
        },
        {
          question: "Is there a fee to join YANC? What does it cover?",
          answer: "Yes, there is a membership fee that covers monthly meetups, food and beverages, mentorship sessions, learning resources, and community engagement activities. Fee details are shared during the Discover Meet."
        },
        {
          question: "Can parents enroll their children directly?",
          answer: "No. Youth members must apply themselves to ensure commitment and enthusiasm."
        },
        {
          question: "Can members join from any city?",
          answer: "Currently, YANC operates only in Hyderabad. Expansion to other cities is planned."
        },
        {
          question: "If someone is not selected, can they reapply later?",
          answer: "Yes, applicants may reapply after a certain period."
        }
      ]
    },
    {
      title: "Payment Terms",
      items: [
        {
          question: "When is the payment due after selection?",
          answer: "Once selected, a payment link will be shared and the membership fee must be paid within one week to confirm the spot."
        },
        {
          question: "What is the cost of YANC membership?",
          answer: "The membership fee is ₹4,500 per month, payable yearly."
        },
        {
          question: "What payment methods are accepted?",
          answer: "Credit/debit cards, UPI, bank transfers, and digital wallets."
        },
        {
          question: "Are there any refunds if someone decides to discontinue?",
          answer: "No. The membership fee is non-refundable. In special cases, deferment to the next cohort may be considered."
        },
        {
          question: "Does the membership fee cover all YANC events and programs?",
          answer: "The fee includes regular bi-weekly meetings, mentorship sessions, learning materials, and networking opportunities. Off-sites, socials, or special events may incur additional charges and participation is optional."
        }
      ]
    },
    {
      title: "Mind Mashup",
      items: [
        {
          question: "What is the objective of the Young Minds Mashup funding process?",
          answer: "To establish a structured and transparent process for evaluating, approving, and monitoring prototype development projects under the YANC Prototype Fund in partnership with Sri Venture Partners (SVP). The program supports young entrepreneurs aged 15–28 with funding and mentorship to move from idea to prototype."
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Page Title */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Everything you need to know about YANC, membership, and programs.
            </p>
          </div>

          {/* Accordion Sections */}
          <div className="space-y-4 mb-16">
            {faqSections.map((section, sectionIndex) => (
              <div key={sectionIndex} className="border border-border rounded-lg overflow-hidden">
                <button
                  className="w-full px-6 py-4 text-left bg-card hover:bg-accent/50 transition-colors flex justify-between items-center"
                  onClick={() => toggleSection(sectionIndex)}
                  aria-expanded={activeSection === sectionIndex}
                >
                  <h2 className="text-xl font-semibold">{section.title}</h2>
                  <div className="text-primary">
                    {activeSection === sectionIndex ? (
                      <ChevronUp size={24} />
                    ) : (
                      <ChevronDown size={24} />
                    )}
                  </div>
                </button>
                
                {activeSection === sectionIndex && (
                  <div className="px-6 pb-6 pt-2 bg-background border-t border-border">
                    <div className="space-y-6">
                      {section.items.map((item, itemIndex) => (
                        <div key={itemIndex} className="border-b border-border/50 pb-6 last:border-b-0 last:pb-0">
                          <h3 className="font-semibold text-lg mb-2 text-foreground">
                            {item.question}
                          </h3>
                          <p className="text-muted-foreground leading-relaxed">
                            {item.answer}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="text-center bg-card border border-border rounded-xl p-8 md:p-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to embark on your journey of growth and empowerment?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Contact us today!
            </p>
            <a 
              href="mailto:connect@yanc.in" 
              className="inline-block bg-primary text-primary-foreground px-8 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              Reach out to us at connect@yanc.in
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Faq;