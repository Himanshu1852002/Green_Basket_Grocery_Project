import './Banners.css';
import PropTypes from 'prop-types';
import { FaLeaf } from 'react-icons/fa';
import { IoIosCart } from 'react-icons/io';
import { Link } from 'react-router-dom';

const Banners = ({ title1, title2, subtitle, tag, accentColor, item_img, stats }) => {
    return (
        <div className="bn-section" style={{ '--bn-accent': accentColor || '#059212' }}>
            <div className="bn-inner">

                {/* Left */}
                <div className="bn-left">
                    <span className="bn-tag">
                        <FaLeaf size={11} /> {tag}
                    </span>
                    <h1 className="bn-title">
                        {title1} <span>{title2}</span>
                    </h1>
                    <p className="bn-subtitle">{subtitle}</p>

                    <div className="bn-actions">
                        <Link to="#products" className="bn-btn-primary">
                            <IoIosCart size={18} /> Shop Now
                        </Link>
                    </div>

                    {stats && (
                        <div className="bn-stats">
                            {stats.map((s, i) => (
                                <div key={i} className="bn-stat">
                                    <strong>{s.value}</strong>
                                    <span>{s.label}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Right */}
                <div className="bn-right">
                    <div className="bn-img-wrap">
                        <div className="bn-img-circle" />
                        <img src={item_img} alt={title2} className="bn-img" />
                    </div>
                </div>

            </div>
        </div>
    );
};

Banners.propTypes = {
    title1: PropTypes.string.isRequired,
    title2: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
    tag: PropTypes.string.isRequired,
    accentColor: PropTypes.string,
    item_img: PropTypes.string.isRequired,
    stats: PropTypes.arrayOf(PropTypes.shape({
        value: PropTypes.string,
        label: PropTypes.string,
    })),
};

export default Banners;
