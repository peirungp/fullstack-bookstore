import './Footer.css';

function Footer() {
    
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
        <p className="footer__copyright">&copy; {currentYear} BookSpace. All rights reserved. </p>
    </footer>
  );
}

export default Footer;