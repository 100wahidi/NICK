import { Link } from "react-router-dom";

export default function AuthCard({ title, subtitle, children, footerText, footerLinkText, footerLinkTo }) {
  return (
    <div className="auth-shell">
      <div className="auth-panel">
        <Link to="/" className="auth-brand">CurateCV</Link>
        <h1 className="auth-heading">{title}</h1>
        {subtitle && <p className="sr-only">{subtitle}</p>}

        <div className="auth-content">
          {children}
        </div>

        {footerText && footerLinkText && footerLinkTo && (
          <div className="auth-footer">
            {footerText}{" "}
            <Link to={footerLinkTo}>
              {footerLinkText}
            </Link>
          </div>
        )}

      </div>
    </div>
  );
}