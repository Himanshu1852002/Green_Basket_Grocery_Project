import './TermsOfService.css';
import { FaFileContract, FaShoppingCart, FaBan, FaGavel, FaEdit } from 'react-icons/fa';

const sections = [
    {
        icon: <FaFileContract size={20} />,
        title: 'Acceptance of Terms',
        content: 'By accessing or using Green Basket, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you may not use our services. We reserve the right to update these terms at any time.',
    },
    {
        icon: <FaShoppingCart size={20} />,
        title: 'Orders & Payments',
        content: 'All orders are subject to product availability. Prices are listed in INR and may change without prior notice. Payment must be completed at checkout. We accept UPI, credit/debit cards, and net banking. Orders are confirmed only after successful payment.',
    },
    {
        icon: <FaBan size={20} />,
        title: 'Prohibited Activities',
        content: 'You may not use our platform for any unlawful purpose, to submit false information, to impersonate others, to attempt to gain unauthorised access to our systems, or to engage in any activity that disrupts or interferes with our services.',
    },
    {
        icon: <FaGavel size={20} />,
        title: 'Limitation of Liability',
        content: 'Green Basket shall not be liable for any indirect, incidental, or consequential damages arising from your use of our services. Our total liability for any claim shall not exceed the amount paid for the specific order in question.',
    },
    {
        icon: <FaEdit size={20} />,
        title: 'Changes to Terms',
        content: 'We may revise these Terms of Service at any time. Changes will be effective immediately upon posting. Continued use of our services after any changes constitutes your acceptance of the new terms. Please review this page periodically.',
    },
];

const TermsOfService = () => {
    return (
        <div className="tos-page">
            <div className="tos-banner">
                <p className="tos-breadcrumb">Home › Terms of Service</p>
                <h1 className="tos-banner-title">Terms of Service</h1>
                <p className="tos-banner-sub">Last updated: January 2025</p>
            </div>

            <div className="tos-container">
                <p className="tos-intro">
                    Please read these Terms of Service carefully before using Green Basket. These terms govern your use of our website and services.
                </p>

                <div className="tos-sections">
                    {sections.map((s, i) => (
                        <div key={i} className="tos-card">
                            <div className="tos-card-header">
                                <div className="tos-card-icon">{s.icon}</div>
                                <h3 className="tos-card-title">{s.title}</h3>
                            </div>
                            <p className="tos-card-text">{s.content}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TermsOfService;
