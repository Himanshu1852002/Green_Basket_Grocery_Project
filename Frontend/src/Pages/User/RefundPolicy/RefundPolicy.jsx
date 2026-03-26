import './RefundPolicy.css';
import { FaUndo, FaCheckCircle, FaTimesCircle, FaClock, FaHeadset } from 'react-icons/fa';

const eligible = [
    'Damaged or defective products on delivery',
    'Wrong item delivered',
    'Missing items from your order',
    'Spoiled or expired products',
    'Order not delivered within 48 hours of expected time',
];

const notEligible = [
    'Change of mind after delivery',
    'Products consumed or partially used',
    'Items not in original packaging',
    'Perishables reported after 24 hours of delivery',
];

const RefundPolicy = () => {
    return (
        <div className="rp-page">
            <div className="rp-banner">
                <p className="rp-breadcrumb">Home › Refund Policy</p>
                <h1 className="rp-banner-title">Refund Policy</h1>
                <p className="rp-banner-sub">We make returns simple and hassle-free 🌿</p>
            </div>

            <div className="rp-container">
                <p className="rp-intro">
                    Your satisfaction is our priority. If something goes wrong with your order, we're here to make it right. Please review our refund policy below.
                </p>

                {/* Process Steps */}
                <div className="rp-steps">
                    {[
                        { icon: <FaHeadset size={20} />, step: '01', title: 'Contact Support', desc: 'Reach out within 24 hours of delivery via our Contact page or email.' },
                        { icon: <FaUndo size={20} />, step: '02', title: 'Submit Request', desc: 'Provide your order ID and a photo of the issue for quick processing.' },
                        { icon: <FaClock size={20} />, step: '03', title: 'Review (1–2 Days)', desc: 'Our team reviews your request and approves eligible refunds within 48 hours.' },
                        { icon: <FaCheckCircle size={20} />, step: '04', title: 'Refund Issued', desc: 'Approved refunds are credited to your original payment method within 5–7 business days.' },
                    ].map((s, i) => (
                        <div key={i} className="rp-step-card">
                            <div className="rp-step-num">{s.step}</div>
                            <div className="rp-step-icon">{s.icon}</div>
                            <h4 className="rp-step-title">{s.title}</h4>
                            <p className="rp-step-desc">{s.desc}</p>
                        </div>
                    ))}
                </div>

                {/* Eligible / Not Eligible */}
                <div className="rp-lists">
                    <div className="rp-list-card rp-eligible">
                        <h3 className="rp-list-title"><FaCheckCircle size={16} /> Eligible for Refund</h3>
                        <ul>
                            {eligible.map((item, i) => <li key={i}>{item}</li>)}
                        </ul>
                    </div>
                    <div className="rp-list-card rp-not-eligible">
                        <h3 className="rp-list-title"><FaTimesCircle size={16} /> Not Eligible for Refund</h3>
                        <ul>
                            {notEligible.map((item, i) => <li key={i}>{item}</li>)}
                        </ul>
                    </div>
                </div>

                <p className="rp-note">
                    For any questions, email us at <strong>support@greenbasket.com</strong> or visit our <a href="/user/contact">Contact page</a>.
                </p>
            </div>
        </div>
    );
};

export default RefundPolicy;
