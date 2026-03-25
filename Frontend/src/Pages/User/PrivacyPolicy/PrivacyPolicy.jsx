import './PrivacyPolicy.css';
import { FaShieldAlt, FaUserLock, FaDatabase, FaCookieBite, FaEnvelope } from 'react-icons/fa';

const sections = [
    {
        icon: <FaDatabase size={20} />,
        title: 'Information We Collect',
        content: 'We collect information you provide directly, such as your name, email address, phone number, and delivery address when you create an account or place an order. We also collect usage data like browsing history on our platform and device information.',
    },
    {
        icon: <FaUserLock size={20} />,
        title: 'How We Use Your Information',
        content: 'Your information is used to process orders, send delivery updates, provide customer support, personalise your shopping experience, and send promotional offers (only with your consent). We never sell your personal data to third parties.',
    },
    {
        icon: <FaShieldAlt size={20} />,
        title: 'Data Security',
        content: 'We implement industry-standard security measures including SSL encryption, secure servers, and regular security audits to protect your personal information from unauthorised access, alteration, or disclosure.',
    },
    {
        icon: <FaCookieBite size={20} />,
        title: 'Cookies',
        content: 'We use cookies to enhance your browsing experience, remember your preferences, and analyse site traffic. You can control cookie settings through your browser. Disabling cookies may affect some features of our website.',
    },
    {
        icon: <FaEnvelope size={20} />,
        title: 'Contact Us',
        content: 'If you have any questions about this Privacy Policy or how we handle your data, please contact us at privacy@greenbasket.com or visit our Contact page. We will respond within 2 business days.',
    },
];

const PrivacyPolicy = () => {
    return (
        <div className="pp-page">
            <div className="pp-banner">
                <p className="pp-breadcrumb">Home › Privacy Policy</p>
                <h1 className="pp-banner-title">Privacy Policy</h1>
                <p className="pp-banner-sub">Last updated: January 2025</p>
            </div>

            <div className="pp-container">
                <p className="pp-intro">
                    At Green Basket, we are committed to protecting your privacy. This policy explains how we collect, use, and safeguard your personal information when you use our services.
                </p>

                <div className="pp-sections">
                    {sections.map((s, i) => (
                        <div key={i} className="pp-card">
                            <div className="pp-card-icon">{s.icon}</div>
                            <div>
                                <h3 className="pp-card-title">{s.title}</h3>
                                <p className="pp-card-text">{s.content}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
