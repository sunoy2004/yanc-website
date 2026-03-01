import { Link } from 'react-router-dom';
import { useState } from 'react';
import { IssueModal } from './IssueModal.tsx';
import facebookIcon from './icons/facebook.png';
import xIcon from './icons/twitter.png';
import instagramIcon from './icons/instagram.png';
import linkedinIcon from './icons/linkedin.png';
import whatsappIcon from './icons/whatsapp.png';

const Footer = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const scrollToStart = () => {
    // Ensure the page is scrolled to the top after navigation.
    // Timeout allows SPA navigation to complete first.
    setTimeout(() => {
      try {
        // Use instant scroll (no smooth animation)
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      } catch {
        // noop in non-browser environments
      }
    }, 50);
  };
  return (
    <footer className="footer">
      <div className="container mx-auto px-4">
        <div className="footer-grid">
          {/* Brand Column */}
          <div className="footer-brand-col">
            <div className="footer-brand flex flex-col justify-between h-full">
              <div className="flex items-center gap-3">
                <div className="flex flex-col items-start">
                  <img src="/favicon.svg" alt="YANC" className="footer-logo-img" />
                  <p className="footer-tagline mt-1">Yet Another Networking Club</p>
                </div>
              </div>

              {/* Follow Us moved inside the brand column so it appears below the logo on all sizes */}
              <div className="footer-social-col mt-4 md:mt-6 lg:mt-8">
                <h3 className="footer-heading mb-0 text-left">Follow Us</h3>
                <div className="social-icons justify-start">
                  {/* <a href="https://www.facebook.com/p/YANC-61565847200938" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Facebook">
                    <img src={facebookIcon} alt="Facebook" className="social-icon-img" />
                  </a> */}

                  {/* <a href="https://x.com/OneYanc" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="X">
                    <img src={xIcon} alt="X" className="social-icon-img" />
                  </a> */}

                  <a href="https://www.instagram.com/oneyanc/" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Instagram">
                    <img src={instagramIcon} alt="Instagram" className="social-icon-img" />
                  </a>

                  <a href="https://www.linkedin.com/company/oneyanc/posts/?feedView=all" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="LinkedIn">
                    <img src={linkedinIcon} alt="LinkedIn" className="social-icon-img" />
                  </a>

                  <a href="https://api.whatsapp.com/send/?phone=%2B917671819335&text&type=phone_number&app_absent=0" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="WhatsApp">
                    <img src={whatsappIcon} alt="WhatsApp" className="social-icon-img" />
                  </a>
                </div>
              </div>

              <div className="mt-auto"></div>
            </div>
          </div>
          
          {/* Column 1: Our Offerings + Careers */}
          <div className="footer-column">
            <h3 className="footer-heading">Our Offerings</h3>
            <ul className="footer-links-list">
              <li><Link to="/offerings/value-proposition" onClick={scrollToStart} className="footer-link">Value Propositions</Link></li>
              <li><Link to="/offerings/why-us" onClick={scrollToStart} className="footer-link">Why Us</Link></li>
              <li><Link to="/offerings/who-can-join" onClick={scrollToStart} className="footer-link">Who Can Join</Link></li>
              <li><Link to="/offerings/young-minds-mashup" onClick={scrollToStart} className="footer-link">Young Minds Mashup</Link></li>
              {/* <li><Link to="/offerings/mentor-talks" className="footer-link">Mentor Talks</Link></li> */}
            </ul>

            <h3 className="footer-heading mt-4">Careers</h3>
            <ul className="footer-links-list">
              <li>
                <a
                  href="https://web.yanc.in/careers"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link"
                >
                  Job Openings
                </a>
              </li>
              <li>
                <a
                  href="https://web.yanc.in/careers"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link"
                >
                  Internships
                </a>
              </li>
            </ul>
          </div>

          {/* Column 2: Applications + Support */}
          <div className="footer-column">
            <h3 className="footer-heading">Applications</h3>
            <ul className="footer-links-list">
              <li>
                <a
                  href="https://web.yanc.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link"
                >
                  YANC Membership
                </a>
              </li>
              <li>
                <a
                  href="https://web.yanc.in/membership-application"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link"
                >
                  Discover Meet Registration
                </a>
              </li>
              <li>
                <a
                  href="https://web.yanc.in/mentor-registration"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link"
                >
                  Mentor Registration
                </a>
              </li>
              <li>
                <a
                  href="https://web.yanc.in/startup-pitch"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link"
                >
                  Startup Pitch
                </a>
              </li>
            </ul>

            <h3 className="footer-heading mt-4">Events</h3>
            <ul className="footer-links-list">
              <li><Link to="/events/upcoming" onClick={scrollToStart} className="footer-link">Upcoming Events</Link></li>
              <li><Link to="/events/past" onClick={scrollToStart} className="footer-link">Past Events</Link></li>
              <li><Link to="/events/gallery" onClick={scrollToStart} className="footer-link">Event Gallery</Link></li>
            </ul>
          </div>

          {/* Column 3: Legal + Support */}
          <div className="footer-column">
            <h3 className="footer-heading">Legal</h3>
            <ul className="footer-links-list">
              <li>
                <a
                  href="https://yanc.in/tc.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link"
                >
                  Terms &amp; Conditions
                </a>
              </li>
              <li>
                <a
                  href="https://yanc.in/privacy.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="https://yanc.in/cookiepolicy.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link"
                >
                  Cookie Policy
                </a>
              </li>
              <li>
                <a
                  href="https://yanc.in/refundpolicy.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link"
                >
                  Refund Policy
                </a>
              </li>
            </ul>

            <h3 className="footer-heading mt-4">Support</h3>
            <ul className="footer-links-list">
              <li><Link to="/faq" onClick={scrollToStart} className="footer-link">FAQ</Link></li>
              <li>
                <a
                  href="https://web.yanc.in/contact-us"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link"
                >
                  Contact Us
                </a>
              </li>
              {/* <li>
                <a href="/#about-us" className="footer-link">
                  About Us
                </a>
              </li> */}
              <li>
                <a
                  href="#"
                  onClick={(e) => { e.preventDefault(); setModalOpen(true); }}
                  className="footer-link"
                >
                  Log Issues
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p className="footer-copyright">
              © 2026 YANC. All rights reserved.
            </p>
            <p className="footer-build text-xs text-muted-foreground mt-1">
             {/* v{import.meta.env.VITE_BUILD_DATE} */}
             v{"2026.03.01"}
            </p>
          </div>
        </div>
      </div>
      {modalOpen && <IssueModal onClose={() => setModalOpen(false)} />}
    </footer>
  );
};

export default Footer;