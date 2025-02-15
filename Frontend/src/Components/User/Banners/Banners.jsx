import './Banners.css';
import PropTypes from 'prop-types';

const Banners = ({ title1, title2, heading, item_img, backgroundColor }) => {

    return (
        <div className="container-fluid">
            <div className="row banner_row" style={{background:backgroundColor}}>
                <div className="col-lg-6 col-md-6 col-sm-6 d-flex justify-content-center align-items-start flex-column banner_text">
                    <h1 className="first_text ms-3">{title1}</h1>
                    <h1 className="second_text ms-3">{title2}</h1>
                    <h5 className='ms-3'>{heading}</h5>
                    <button className='ms-3'>SHOP NOW</button>
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
    item_img: PropTypes.string.isRequired,
    backgroundColor: PropTypes.string.isRequired
};

export default Banners;
