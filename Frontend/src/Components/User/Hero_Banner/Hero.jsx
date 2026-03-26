import './Hero.css';
import man_img from '../../../assets/Images/Images/Boy.png';
import { Link } from 'react-router-dom';
import { IoIosCart } from "react-icons/io";
import { FaLeaf } from "react-icons/fa";
import { MdLocalOffer } from "react-icons/md";

const Hero = () => {
    return (
        <section className="hr-section">
            <div className="hr-inner">

                {/* Left */}
                <div className="hr-left">
                    <span className="hr-tag"><FaLeaf size={12} /> 100% Fresh & Organic</span>
                    <h1 className="hr-title">
                        Make Healthy Life<br />
                        with <span>Fresh</span> Fruits<br />
                        & Vegetables
                    </h1>
                    <p className="hr-desc">
                        Order fresh groceries online and get them delivered to your doorstep. Quality you can trust, freshness you can taste.
                    </p>
                    <div className="hr-actions">
                        <Link to="/user/fruits" className="hr-btn-primary">
                            <IoIosCart size={20} /> Shop Now
                        </Link>
                        <Link to="/user/vegetables" className="hr-btn-outline">
                            View All
                        </Link>
                    </div>
                    <div className="hr-stats">
                        <div className="hr-stat">
                            <strong>500+</strong>
                            <span>Products</span>
                        </div>
                        <div className="hr-stat-divider" />
                        <div className="hr-stat">
                            <strong>10k+</strong>
                            <span>Customers</span>
                        </div>
                        <div className="hr-stat-divider" />
                        <div className="hr-stat">
                            <strong>4.9★</strong>
                            <span>Rating</span>
                        </div>
                    </div>
                </div>

                {/* Right */}
                <div className="hr-right">
                    <div className="hr-img-wrap">
                        <div className="hr-img-circle" />
                        <img src={man_img} alt="Fresh Grocery" className="hr-img" />
                        <div className="hr-badge hr-badge-top">
                            <MdLocalOffer size={16} color="#059212" />
                            <span>Free Delivery<br /><small>on orders ₹500+</small></span>
                        </div>
                        <div className="hr-badge hr-badge-bottom">
                            <FaLeaf size={14} color="#059212" />
                            <span>100% Organic<br /><small>Certified Fresh</small></span>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Hero;
