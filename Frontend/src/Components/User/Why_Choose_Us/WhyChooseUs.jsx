import { FaTruck, FaLeaf, FaUndo, FaHeadset, FaShieldAlt, FaSeedling } from 'react-icons/fa';
import './WhyChooseUs.css';

const badges = [
    {
        icon: <FaTruck size={26} />,
        title: 'Free Delivery',
        desc: 'Free delivery on all orders above ₹200. Fast & reliable.',
        color: '#059212',
        bg: '#f0faf0',
    },
    {
        icon: <FaLeaf size={26} />,
        title: '100% Fresh',
        desc: 'Sourced directly from farms. Always fresh, never frozen.',
        color: '#2e7d32',
        bg: '#e8f5e9',
    },
    {
        icon: <FaUndo size={26} />,
        title: 'Easy Returns',
        desc: 'Not satisfied? Return within 24 hours, no questions asked.',
        color: '#1565c0',
        bg: '#e3f2fd',
    },
    {
        icon: <FaHeadset size={26} />,
        title: '24/7 Support',
        desc: 'Our team is always here to help you anytime, anywhere.',
        color: '#6d4c41',
        bg: '#efebe9',
    },
    {
        icon: <FaShieldAlt size={26} />,
        title: 'Secure Payment',
        desc: '100% secure checkout with encrypted payment gateway.',
        color: '#6a1b9a',
        bg: '#f3e5f5',
    },
    {
        icon: <FaSeedling size={26} />,
        title: 'Farm to Table',
        desc: 'We partner with local farmers for the freshest produce.',
        color: '#e65100',
        bg: '#fff3e0',
    },
];

const WhyChooseUs = () => (
    <section className="wc-section">
        <div className="wc-inner">
            <div className="wc-header">
                <span className="wc-tag">💚 Why Green Basket</span>
                <h2 className="wc-title">Why Choose <span>Us?</span></h2>
                <p className="wc-sub">We go beyond just delivering groceries — we deliver trust, quality & care</p>
            </div>

            <div className="wc-grid">
                {badges.map((b, i) => (
                    <div key={i} className="wc-card" style={{ '--bg': b.bg, '--color': b.color }}>
                        <div className="wc-icon-wrap">
                            <span style={{ color: b.color }}>{b.icon}</span>
                        </div>
                        <h4 className="wc-card-title">{b.title}</h4>
                        <p className="wc-card-desc">{b.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

export default WhyChooseUs;
