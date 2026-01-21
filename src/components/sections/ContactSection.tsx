import { Button } from "@/components/ui/button";
import ScrollAnimateWrapper from "@/components/ScrollAnimateWrapper";

const ContactSection = () => {
  return (
    <section id="contact" className="section">
      <div className="container">
        <div className="contact-grid">
          {/* Join Community Form */}
          <ScrollAnimateWrapper>
            <div className="form-card">
              <h3 className="form-title">Join Community</h3>
              <form className="form" onSubmit={(e) => e.preventDefault()}>
                <div className="form-group">
                  <label htmlFor="join-name" className="form-label">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="join-name"
                    className="form-input"
                    placeholder="Your name"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="join-email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    id="join-email"
                    className="form-input"
                    placeholder="you@example.com"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="join-interest" className="form-label">
                    Interest Area
                  </label>
                  <select id="join-interest" className="form-select">
                    <option value="">Select an option</option>
                    <option value="startup">Startups</option>
                    <option value="tech">Technology</option>
                    <option value="design">Design</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <Button type="submit" variant="primary" className="w-full">
                  Join Now
                </Button>
              </form>
            </div>
          </ScrollAnimateWrapper>

          {/* Submit Startup Idea Form */}
          <ScrollAnimateWrapper>
            <div className="form-card">
              <h3 className="form-title">Submit Startup Idea</h3>
              <form className="form" onSubmit={(e) => e.preventDefault()}>
                <div className="form-group">
                  <label htmlFor="idea-name" className="form-label">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="idea-name"
                    className="form-input"
                    placeholder="Your name"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="idea-title" className="form-label">
                    Idea Title
                  </label>
                  <input
                    type="text"
                    id="idea-title"
                    className="form-input"
                    placeholder="Brief title"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="idea-description" className="form-label">
                    Description
                  </label>
                  <textarea
                    id="idea-description"
                    className="form-textarea"
                    placeholder="Describe your idea..."
                    rows={3}
                  />
                </div>
                <Button type="submit" variant="secondary" className="w-full">
                  Submit Idea
                </Button>
              </form>
            </div>
          </ScrollAnimateWrapper>

          {/* Contact Form */}
          <ScrollAnimateWrapper>
            <div className="form-card">
              <h3 className="form-title">Contact Us</h3>
              <form className="form" onSubmit={(e) => e.preventDefault()}>
                <div className="form-group">
                  <label htmlFor="contact-name" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    id="contact-name"
                    className="form-input"
                    placeholder="Your name"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="contact-email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    id="contact-email"
                    className="form-input"
                    placeholder="you@example.com"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="contact-message" className="form-label">
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    className="form-textarea"
                    placeholder="Your message..."
                    rows={3}
                  />
                </div>
                <Button type="submit" variant="outline" className="w-full">
                  Send Message
                </Button>
              </form>
            </div>
          </ScrollAnimateWrapper>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
