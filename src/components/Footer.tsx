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
              <div className="social-icons flex space-x-4">
                <a href="#twitter" className="social-icon" aria-label="Twitter">
                  <svg className="social-icon-svg" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                  </svg>
                </a>
                <a href="#linkedin" className="social-icon" aria-label="LinkedIn">
                  <svg className="social-icon-svg" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
                <a href="#instagram" className="social-icon" aria-label="Instagram">
                  <svg className="social-icon-svg" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" strokeWidth={2} />
                    <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" strokeWidth={2} />
                    <circle cx="17.5" cy="6.5" r=".5" fill="currentColor" strokeWidth={2} />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          
          {/* About Us Column */}
          <div className="footer-column">
            <h3 className="footer-heading">About Us</h3>
            <ul className="footer-links-list">
              <li><a href="#programs" className="footer-link">Programs</a></li>
              <li><a href="#events" className="footer-link">Events</a></li>
              <li><a href="#team" className="footer-link">Team</a></li>
              <li><a href="#contact" className="footer-link">Contact</a></li>
              <li><a href="#vision" className="footer-link">Vision and Mission</a></li>
              <li><a href="#values" className="footer-link">Core Values</a></li>
            </ul>
          </div>
          
          {/* Our Offerings Column */}
          <div className="footer-column">
            <h3 className="footer-heading">Our Offerings</h3>
            <ul className="footer-links-list">
              <li><a href="#value" className="footer-link">Value Propositions</a></li>
              <li><a href="#why-us" className="footer-link">Why Us</a></li>
              <li><a href="#who-join" className="footer-link">Who Can Join</a></li>
              <li><a href="#young-minds" className="footer-link">Young Minds Mashup</a></li>
            </ul>
          </div>
          
          {/* Careers Column */}
          <div className="footer-column">
            <h3 className="footer-heading">Careers</h3>
            <ul className="footer-links-list">
              <li><a href="#jobs" className="footer-link">Job Openings</a></li>
              <li><a href="#internships" className="footer-link">Internships</a></li>
            </ul>
          </div>
          
          {/* Legal Column */}
          <div className="footer-column">
            <h3 className="footer-heading">Legal</h3>
            <ul className="footer-links-list">
              <li><a href="#terms" className="footer-link">Terms & Conditions</a></li>
              <li><a href="#privacy" className="footer-link">Privacy Policy</a></li>
              <li><a href="#cookies" className="footer-link">Cookie Policy</a></li>
              <li><a href="#refund" className="footer-link">Refund Policy</a></li>
            </ul>
          </div>
          
          {/* Removed separate social media column since it's now in brand column */}
        </div>
        
        <div className="footer-bottom">
          <p className="footer-copyright">
            © 2025 YANC. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;