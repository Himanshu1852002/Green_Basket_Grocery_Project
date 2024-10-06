import delivery_boy_img from '../../assets/Images/Images/output-onlinegiftools.gif';
import './Delivery_Banner.css';
const Delivery_Banner = () => {
    return (
        <div className="container">
            <div className="row deliver_row">
                <div className="col-lg-6 col-md-6 col-sm-12 d-flex justify-content-center align-items-start flex-column  delivery_banner">
                    <h1>Free<span>and</span> Fast</h1>
                    <h1>Delivery</h1>
                    <p>Get farm fresh &amp; Hygenic Fruits and vegetables.</p>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12 d-flex justify-content-center">
                    <img src={delivery_boy_img} alt />
                </div>
            </div>
        </div>

    )
}

export default Delivery_Banner