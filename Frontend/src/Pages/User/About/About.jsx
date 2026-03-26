import './About.css';
import { Link } from 'react-router-dom';
import {
    FaLeaf, FaTruck, FaShieldAlt, FaHeart, FaStar,
    FaUsers, FaBoxOpen, FaSmile, FaRecycle,
    FaSeedling, FaHandshake, FaAward
} from 'react-icons/fa';

const stats = [
    { icon: <FaUsers size={24} />, value: "10,000+", label: "Happy Customers" },
    { icon: <FaBoxOpen size={24} />, value: "500+", label: "Products Available" },
    { icon: <FaTruck size={24} />, value: "50,000+", label: "Orders Delivered" },
    { icon: <FaStar size={24} />, value: "4.8/5", label: "Average Rating" },
];

const values = [
    { icon: <FaLeaf size={22} />, title: "100% Fresh", desc: "We source directly from local farms to ensure maximum freshness in every product." },
    { icon: <FaShieldAlt size={22} />, title: "Quality Assured", desc: "Every item goes through strict quality checks before reaching your doorstep." },
    { icon: <FaTruck size={22} />, title: "Fast Delivery", desc: "Same-day and next-day delivery options available across all serviceable areas." },
    { icon: <FaHeart size={22} />, title: "Customer First", desc: "Your satisfaction is our priority. 24/7 support for all your queries." },
    { icon: <FaRecycle size={22} />, title: "Eco Friendly", desc: "We use sustainable packaging to reduce our environmental footprint." },
    { icon: <FaHandshake size={22} />, title: "Farmer Support", desc: "We partner directly with farmers, ensuring fair prices and better livelihoods." },
];

const team = [
    { name: "Ajay Jat", role: "Founder & CEO", emoji: "👨‍💼" },
    { name: "Azhar Ali", role: "Head of Operations", emoji: "👨‍💼" },
    { name: "Anees Khan", role: "Lead Developer", emoji: "👨‍💻" },
    { name: "Himanshu", role: "Customer Success", emoji: "👨‍💼" },
];

const About = () => {
    return (
        <div className="ab-page">

            {/* Hero Banner */}
            <div className="ab-banner">
                <p className="ab-breadcrumb">Home › About Us</p>
                <h1 className="ab-banner-title">About Green Basket</h1>
                <p className="ab-banner-sub">Fresh groceries, delivered with love 🌿</p>
            </div>

            {/* Mission Section */}
            <section className="ab-section ab-mission">
                <div className="ab-mission-content">
                    <div className="ab-mission-text">
                        <div className="ab-tag"><FaSeedling size={13} /> Our Story</div>
                        <h2 className="ab-section-title">We Bring the Farm <br />to Your Doorstep</h2>
                        <p className="ab-section-desc">
                            Green Basket was founded with a simple mission — make fresh, healthy groceries accessible to everyone. We started in 2022 from a small town in Madhya Pradesh, and today we serve thousands of happy families across the region.
                        </p>
                        <p className="ab-section-desc">
                            We work directly with local farmers, cutting out middlemen to bring you the freshest produce at the best prices. Every order you place supports a local farmer's livelihood.
                        </p>
                        <Link to="/user/contact" className="ab-cta-btn">Get in Touch →</Link>
                    </div>
                    <div className="ab-mission-visual">
                        <div className="ab-visual-card">
                            <div className="ab-visual-icon">🌾</div>
                            <p className="ab-visual-text">Farm to Table</p>
                        </div>
                        <div className="ab-visual-card ab-visual-card-2">
                            <div className="ab-visual-icon">🥦</div>
                            <p className="ab-visual-text">Always Fresh</p>
                        </div>
                        <div className="ab-visual-card ab-visual-card-3">
                            <div className="ab-visual-icon">🚚</div>
                            <p className="ab-visual-text">Fast Delivery</p>
                        </div>
                        <div className="ab-visual-card ab-visual-card-4">
                            <div className="ab-visual-icon">💚</div>
                            <p className="ab-visual-text">Eco Friendly</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section className="ab-stats-section">
                <div className="ab-stats-grid">
                    {stats.map((s, i) => (
                        <div key={i} className="ab-stat-card">
                            <div className="ab-stat-icon">{s.icon}</div>
                            <p className="ab-stat-value">{s.value}</p>
                            <p className="ab-stat-label">{s.label}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="ab-section">
                <div className="ab-section-header">
                    <div className="ab-tag"><FaAward size={13} /> Why Choose Us</div>
                    <h2 className="ab-section-title">What Makes Us Different</h2>
                    <p className="ab-section-sub">We go beyond just delivering groceries — we deliver trust, quality, and care.</p>
                </div>
                <div className="ab-values-grid">
                    {values.map((v, i) => (
                        <div key={i} className="ab-value-card">
                            <div className="ab-value-icon">{v.icon}</div>
                            <h4 className="ab-value-title">{v.title}</h4>
                            <p className="ab-value-desc">{v.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Team */}
            <section className="ab-section ab-team-section">
                <div className="ab-section-header">
                    <div className="ab-tag"><FaUsers size={13} /> Our Team</div>
                    <h2 className="ab-section-title">The People Behind Green Basket</h2>
                    <p className="ab-section-sub">A passionate team dedicated to bringing freshness to your table every day.</p>
                </div>
                <div className="ab-team-grid">
                    {team.map((member, i) => (
                        <div key={i} className="ab-team-card">
                            <div className="ab-team-avatar">{member.emoji}</div>
                            <h5 className="ab-team-name">{member.name}</h5>
                            <p className="ab-team-role">{member.role}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA Banner */}
            <section className="ab-cta-section">
                <div className="ab-cta-content">
                    <h2 className="ab-cta-title">Ready to Shop Fresh?</h2>
                    <p className="ab-cta-sub">Join thousands of happy customers and experience the Green Basket difference.</p>
                    <div className="ab-cta-btns">
                        <Link to="/" className="ab-cta-primary">Shop Now →</Link>
                        <Link to="/user/contact" className="ab-cta-secondary">Contact Us</Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
