import delivery_boy_img from '../../../assets/Images/Images/scooter.png';
import './Delivery_Banner.css';
import { MdAccessTime, MdLocalShipping } from 'react-icons/md';
import { FaRupeeSign } from 'react-icons/fa';

const Delivery_Banner = () => {
    return (
        <section className="db-section">
            <div className="db-inner">

                {/* Image */}
                <div className="db-img-side">
                    <img src={delivery_boy_img} alt="Delivery" className="db-img" />
                </div>

                {/* Text */}
                <div className="db-text-side">
                    <span className="db-tag"><MdLocalShipping size={14} /> Fast Delivery</span>
                    <h2 className="db-title">
                        Next Day Delivery<br />
                        <span>Right to Your Door</span>
                    </h2>
                    <p className="db-desc">
                        Order today and receive your fresh groceries tomorrow. We ensure safe, fast, and reliable delivery every time.
                    </p>
                    <div className="db-chips">
                        <div className="db-chip">
                            <MdAccessTime size={16} />
                            <span>10:00 AM – 8:00 PM</span>
                        </div>
                        <div className="db-chip">
                            <FaRupeeSign size={14} />
                            <span>Free on orders ₹500+</span>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Delivery_Banner;
