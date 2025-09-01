import React from "react";
import { Container, Row, Col, Dropdown } from "react-bootstrap";
import {
  FaFacebookF,
  FaXTwitter,
  FaYoutube,
  FaLinkedinIn,
} from "react-icons/fa6";

const footerData = [
  {
    heading: "APPLICATIONS",
    links: [
      { label: "Intelligent Agreement Management", url: "/applications/iam" },
      { label: "IAM Core", url: "/applications/iam-core" },
      {
        label: "IAM for Customer Experience",
        url: "/applications/customer-experience",
      },
      { label: "IAM for Sales", url: "/applications/sales" },
      { label: "All IAM Applications", url: "/applications" },
    ],
  },
  {
    heading: "PRODUCTS",
    links: [
      { label: "eSignature", url: "/products/electronic-signature" },
      { label: "Contract Lifecycle Management", url: "/products/clm" },
      { label: "Identify", url: "/products/identify" },
      {
        label: "Agreement Preparation",
        url: "/products/agreement-preparation",
      },
      { label: "Web Forms", url: "/products/web-forms" },
      { label: "All Products", url: "/products" },
    ],
  },
  {
    heading: "RESOURCES",
    links: [
      { label: "Resource Center", url: "/resources" },
      { label: "eSign Resources", url: "/resources/esignature" },
      { label: "Blog", url: "/blog" },
      { label: "Customer Stories", url: "/customers" },
      { label: "Events", url: "/events" },
      { label: "Webinars", url: "/webinars" },
      { label: "Docusign University", url: "/education" },
      { label: "Legality Guide", url: "/resources/legality-guide" },
      { label: "Trust Center & System Status", url: "/trust/system-status" },
    ],
  },
  {
    heading: "COMPANY",
    links: [
      { label: "About Us", url: "/company/about" },
      { label: "Product Releases", url: "/company/releases" },
      { label: "Docusign Momentum", url: "/momentum" },
      { label: "Careers", url: "/company/careers" },
      { label: "Leadership", url: "/company/leadership" },
      { label: "News Center", url: "/company/news" },
      { label: "Investor Relations", url: "/company/investors" },
      { label: "Contact Us", url: "/contact" },
      { label: "Accessibility", url: "/accessibility" },
    ],
  },
  {
    heading: "PRICING",
    links: [
      { label: "IAM Plans", url: "/pricing/iam" },
      { label: "eSignature Plans", url: "/pricing/esignature" },
      { label: "Real Estate Plans", url: "/pricing/real-estate" },
      { label: "API Plans", url: "/pricing/api" },
    ],
  },
  {
    heading: "INDUSTRIES",
    links: [
      { label: "Financial Services", url: "/industries/financial-services" },
      { label: "Insurance", url: "/industries/insurance" },
      { label: "Real Estate", url: "/industries/real-estate" },
      { label: "Government", url: "/industries/government" },
    ],
  },
  {
    heading: "BUSINESS SIZE",
    links: [
      { label: "Enterprise", url: "/solutions/enterprise" },
      { label: "Small & Medium-Sized Business", url: "/solutions/smb" },
      { label: "Individuals", url: "/solutions/individuals" },
    ],
  },
  {
    heading: "SUPPORT",
    links: [
      { label: "Support Center", url: "/support" },
      { label: "Customer Success", url: "/support/customer-success" },
      { label: "Community", url: "/support/community" },
      { label: "Trust Portal", url: "/trust" },
    ],
  },
  {
    heading: "DEVELOPERS",
    links: [
      { label: "Developer Center", url: "https://developers.docusign.com" },
      { label: "Free Developer Account", url: "https://account.docusign.com" },
      {
        label: "API Overview",
        url: "https://developers.docusign.com/docs/esign-rest-api/",
      },
    ],
  },
  {
    heading: "PARTNERS",
    links: [
      { label: "Partner Portal", url: "https://partners.docusign.com/" },
      { label: "Partner Login", url: "https://login.docusign.com/" },
      { label: "ISV Embedded eSignature", url: "/partners/isv" },
    ],
  },
];
const legalLinks = [
  { label: "Terms of Use", url: "/terms" },
  { label: "Privacy Notice", url: "/privacy" },
  { label: "Notice to California Residents", url: "/california" },
  { label: "Cookie Settings", url: "/cookies" },
  { label: "Intellectual Property", url: "/intellectual-property" },
  { label: "Modern Slavery Act Statement", url: "/slavery-statement" },
];

const Footer = () => {
  return (
    <>
      <footer className="sec-padd-t pb-5 footer_web">
        <Container>
          <Row>
            {footerData.map((section, idx) => (
              <Col
                key={idx}
                xs={6}
                sm={6}
                md={4}
                lg={3}
                xl={2}
                className="mb-4"
              >
                <h6 className=" text-uppercase">{section.heading}</h6>
                <ul className="list-unstyled">
                  {section.links.map((link, i) => (
                    <li key={i}>
                      <a
                        href={link.url}
                        className="text-dark text-decoration-none d-block mb-1"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </Col>
            ))}
          </Row>
        </Container>
      </footer>

      <div className="footer1">
        <Container>
          <Row className="align-items-center justify-content-between mb-3">
            <Col
              xs={12}
              md={4}
              className="mb-3 mb-md-0 d-flex align-items-center gap-3"
            >
              <select
              >
                <option value="en-US" selected="">
                  United States
                </option>
                <option value="en-CA">Canada - English</option>
                <option value="fr-CA">Canada - français</option>
                <option value="fr-FR">France</option>
                <option value="en-AU">Australia</option>
                <option value="ja-JP">日本</option>
                <option value="pt-BR">Brasil</option>
                <option value="nl-NL">Nederland</option>
                <option value="de-DE">Deutschland</option>
                <option value="en-GB">United Kingdom</option>
                <option value="es-ES">España</option>
                <option value="en-IN">India</option>
                <option value="it-IT">Italia</option>
                <option value="es-MX">México</option>
                <option value="en-MY">Malaysia - English</option>
                <option value="en-PH">Philippines - English</option>
                <option value="en-SG">Singapore - English</option>
                <option value="en-TW">Taiwan - English</option>
              </select>
              <div className="footer_social">
              <a href="https://facebook.com" target="_blank" rel="noreferrer">
                <FaFacebookF size={18} />
              </a>
              <a href="https://x.com" target="_blank" rel="noreferrer">
                <FaXTwitter size={18} />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer">
                <FaYoutube size={18} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer">
                <FaLinkedinIn size={18} />
              </a>
              </div>
            </Col>

            <Col xs={12} md={4} className="d-flex justify-content-md-end justify-content-center gap-2">
              <a href="https://play.google.com/store">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                  alt="Google Play"
                  height="40"
                />
              </a>
              <a href="https://www.apple.com/app-store/">
                <img
                  src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                  alt="App Store"
                  height="40"
                />
              </a>
            </Col>
          </Row>
        </Container>
      </div>
      <div className="footer2">
        <Container>
          <Row className="text-center justify-content-center mb-2">
            <Col md={8}>
              <ul>
                {legalLinks.map((item, i) => (
                  <li key={i} xs="auto" className="mb-2">
                    <a
                      href={item.url}
                      className="text-dark text-decoration-none small"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </Col>
            <Col md={4}>
              <small className="text-muted">© DocuSign, Inc. 2025</small>
            </Col>

          </Row>


        </Container>
      </div>
    </>
  );
};

export default Footer;
