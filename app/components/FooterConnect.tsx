import { fullName, site } from "../site-content";

export default function FooterConnect() {
  const credit = `DESIGNED & BUILT BY ${fullName.toUpperCase()}`;
  return (
    <footer className="footer-connect">
      <div className="footer-connect-inner">
        <div className="footer-connect-heading">
          <div className="footer-connect-heading-line" />
          <span>Connect</span>
          <div className="footer-connect-heading-line" />
        </div>
        <div className="footer-connect-links">
          <a href={`mailto:${site.links.email}`}>Email</a>
          <span className="footer-connect-separator">/</span>
          <a
            href={site.links.linkedIn}
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          <span className="footer-connect-separator">/</span>
          <a
            href={site.links.github}
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </div>
        <div className="footer-connect-meta">{credit}</div>
      </div>
    </footer>
  );
}

