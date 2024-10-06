import './Banners.css';
import PropTypes from 'prop-types';

const Banners = ({ title1, title2, heading, item_img }) => {
    return (
        <div className="container-fluid">
            <div className="row banner_row">
                <div className="col-lg-6 col-md-6 col-sm-6 d-flex justify-content-center align-items-center flex-column banner_text">
                    <h1 className="first_text">{title1}</h1>
                    <h1 className="second_text">{title2}</h1>
                    <h5>{heading}</h5>
                    <button>SHOP NOW</button>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6 banner_img">
                    <img src={item_img} alt="" />
                </div>
            </div>
        </div>
    );
};

Banners.propTypes = {
    title1: PropTypes.string.isRequired,
    title2: PropTypes.string.isRequired,
    heading: PropTypes.string.isRequired,
    item_img: PropTypes.string.isRequired
};

export default Banners;
