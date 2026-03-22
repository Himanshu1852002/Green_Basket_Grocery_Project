import './SupportBanner.css';
import { FaTruck, FaHeadset, FaShieldAlt } from "react-icons/fa";
import { FaMoneyBillTransfer } from "react-icons/fa6";

const supportItems = [
    {
        icon: <FaTruck size={26} />,
        title: "Free Shipping",
        description: "Free delivery on all orders above ₹200",
    },
    {
        icon: <FaMoneyBillTransfer size={26} />,
        title: "Money Return",
        description: "30-day hassle-free money back guarantee",
    },
    {
        icon: <FaHeadset size={26} />,
        title: "24/7 Support",
        description: "Call us anytime: +91 6266059961",
    },
    {
        icon: <FaShieldAlt size={26} />,
        title: "Safe Payment",
        description: "100% secure & encrypted payments",
    },
];

const Support_Banner = () => {
    return (
        <div className="sb-section">
            <div className="sb-header">
                <h2 className="sb-title">Why Choose <span>Green Basket?</span></h2>
                <p className="sb-sub">Everything you need for a seamless grocery experience</p>
            </div>
            <div className="sb-grid">
                {supportItems.map((item, i) => (
                    <div key={i} className="sb-card">
                        <div className="sb-icon">{item.icon}</div>
                        <h4 className="sb-card-title">{item.title}</h4>
                        <p className="sb-card-desc">{item.description}</p>
                    </div>
                ))}
            </div>

            {/* CTA Strip */}
            <div className="sb-cta">
                <div className="sb-cta-left">
                    <h3 className="sb-cta-title">Ready to shop fresh? 🛒</h3>
                    <p className="sb-cta-sub">Join 10,000+ happy customers and get fresh groceries delivered today.</p>
                </div>
                <a href="/user/fruits" className="sb-cta-btn">Start Shopping →</a>
            </div>
        </div>
    );
};

export default Support_Banner;
