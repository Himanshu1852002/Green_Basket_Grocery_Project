import delivery_boy_img from '../../assets/Images/Images/output-onlinegiftools.gif';
import './Delivery_Banner.css';
const Delivery_Banner = () => {
    return (
        <div className="container">
            <div className="row deliver_row">
                <div className="col-lg-6 col-md-6 col-sm-12 d-flex justify-content-center align-items-start flex-column  delivery_banner">
                    <h1>Free and Fast</h1>
                    <span>Delivery</span>
                    <p>Get farm fresh &amp; Hygenic Fruits and vegetables.</p>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12 d-flex justify-content-center align-items-center img_div">
                    <img className='delivery-boy-img' src={delivery_boy_img} />
                </div>
            </div>
        </div>

    )
}

export default Delivery_Banner