import { Link } from 'react-router-dom';
import facebookIcon from './icons/facebook.png';
import xIcon from './icons/twitter.png';
import instagramIcon from './icons/instagram.png';
import linkedinIcon from './icons/linkedin.png';
import whatsappIcon from './icons/whatsapp.png';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container mx-auto px-4">
        <div className="footer-grid">
          {/* Brand Column */}
          <div className="footer-brand-col">
            <div className="footer-brand flex flex-col justify-between h-full">
              <div>
                <span className="footer-logo">YANC</span>
                <p className="footer-tagline">Yet Another Networking Club</p>
              </div>
              <div className="mt-auto"></div>
            </div>
            <div className="footer-social-col">
              <h3 className="footer-heading mb-0">Follow Us</h3>
              <div className="social-icons flex space-x-4 items-center">
                <a href="https://www.facebook.com/p/YANC-61565847200938" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Facebook">
                  <img src={facebookIcon} alt="Facebook" className="social-icon-img" />
                </a>

                <a href="https://x.com/OneYanc" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="X">
                  <img src={xIcon} alt="X" className="social-icon-img" />
                </a>

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
          </div>
          
          {/* Services Column - Combines Our Offerings, Team & Events */}
          <div className="footer-column">
            <h3 className="footer-heading">Our Offerings</h3>
            <ul className="footer-links-list">
              <li><Link to="/offerings/value-proposition" className="footer-link">Value Propositions</Link></li>
              <li><Link to="/offerings/why-us" className="footer-link">Why Us</Link></li>
              <li><Link to="/offerings/who-can-join" className="footer-link">Who Can Join</Link></li>
              <li><Link to="/offerings/young-minds-mashup" className="footer-link">Young Minds Mashup</Link></li>
              <li><Link to="/offerings/mentor-talks" className="footer-link">Mentor Talks</Link></li>
            </ul>
            
            <h3 className="footer-heading mt-4">Team</h3>
            <ul className="footer-links-list">
              <li><Link to="/team/executive-management" className="footer-link">Executive Management</Link></li>
              <li><Link to="/team/cohort-founders" className="footer-link">Cohort Founders</Link></li>
              <li><Link to="/team/advisory-board" className="footer-link">Advisory Board</Link></li>
              <li><Link to="/team/global-mentors" className="footer-link">Global Mentors</Link></li>
            </ul>
            
            <h3 className="footer-heading mt-4">Events</h3>
            <ul className="footer-links-list">
              <li><Link to="/events/upcoming" className="footer-link">Upcoming Events</Link></li>
              <li><Link to="/events/past" className="footer-link">Past Events</Link></li>
              <li><Link to="/events/gallery" className="footer-link">Event Gallery</Link></li>
              {/* <li><Link to="/events/highlights" className="footer-link">Highlights</Link></li> */} {/* COMMENTED OUT: Highlights disabled */}
            </ul>
          </div>
          
          {/* Support & Applications Column */}
          <div className="footer-column">
            <h3 className="footer-heading">Support</h3>
            <ul className="footer-links-list">
              <li><Link to="/faq" className="footer-link">FAQ</Link></li>
              <li><Link to="/#contact" className="footer-link">Contact Us</Link></li>
              <li><Link to="/#about" className="footer-link">About Us</Link></li>
              <li><Link to="/#testimonials" className="footer-link">Testimonials</Link></li>
            </ul>
            
            <h3 className="footer-heading mt-4">Applications</h3>
            <ul className="footer-links-list">
              <li><Link to="/apply/membership" className="footer-link">YANC Membership</Link></li>
              <li><Link to="/apply/discover-meet-registration" className="footer-link">Discover Meet Registration</Link></li>
              <li><Link to="/apply/mentor-registration" className="footer-link">Mentor Registration</Link></li>
              <li><Link to="/apply/startup-pitch" className="footer-link">Startup Pitch</Link></li>
            </ul>
          </div>
          
          {/* Careers Column */}
          <div className="footer-column">
            <h3 className="footer-heading">Careers</h3>
            <ul className="footer-links-list">
              <li><Link to="/careers/jobs" className="footer-link">Job Openings</Link></li>
              <li><Link to="/careers/internships" className="footer-link">Internships</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p className="footer-copyright">
              © 2025 YANC. All rights reserved.
            </p>
            <div className="footer-legal-links">
              <a href="/#terms" className="footer-link">Terms & Conditions</a>
              <a href="/#privacy" className="footer-link">Privacy Policy</a>
              <a href="/#cookies" className="footer-link">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;