import './About.css';

function About() {
  return (
    <div className="about">
      <h2 className="about__header">About</h2>
      <div className="about__container">
        <div className="about__image__section">
          <img 
            className="about__image" 
            src="/images/about_bookspace.png" 
            alt="BookSpace image" 
          />
        </div>
        <div className="about__content">
          <details className="about__details" open>
            <summary className="about__summary">Our Mission</summary>
              <p className="about__info">
                We believe every book has a reader, and every reader deserves their perfect book. BookSpace is dedicated to bringing the joy of reading to your doorstep.
              </p>
          </details>
          <details className="about__details" open>
            <summary className="about__summary">Contact Us</summary>
              <div className="about__info">
                <p>Have questions? We’d love to hear from you! Reach out to us at:</p>
                <address className="about__contact">
                  <div>
                    <span>Email:</span> 
                      <a href="mailto:info@bookspace.com">info@bookspace.com</a>
                  </div>
                  <div>
                    <span>Phone:</span>
                      <a href="tel:+3514567890">+351 456 7890</a>
                  </div>                   
                </address>
            </div>
          </details>  
        </div>
      </div>           
    </div>
  );
}

export default About;