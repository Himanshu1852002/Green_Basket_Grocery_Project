import delivery_boy_img from '../../../assets/Images/Images/scooter.png';
import './Delivery_Banner.css';

const Delivery_Banner = () => {
    return (
        <div className="container" style={{ marginTop: "30px" }}>
            <div className="row deliver_row flex-md-row flex-column">
                {/* Image Section */}
                <div className="col-12 col-md-6 d-flex justify-content-center align-items-center img_div">
                    <img className="delivery-boy-img" src={delivery_boy_img} alt="Delivery Boy" />
                </div>

                {/* Text Section */}
                <div className="col-12 col-md-6 d-flex justify-content-center align-items-start flex-column delivery_banner">
                    <div className="d-flex justify-content-center align-items-center">
                        <h2>We Deliver on Next Day from 10:00 AM to 08:00 PM</h2>
                    </div>
                    <div className='w-100 d-flex justify-content-md-start align-items-ms-start align-items-center justify-content-center'>
                        <p>* For Orders starting from $100</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Delivery_Banner;
