import './Hero.css';
import man_img from '../../assets/Images/Images/Boy.png';
import { Link } from 'react-router-dom';
import { IoIosCart } from "react-icons/io";

const Hero = () => {
    return (
        <>
            <div className="container-fluid px-5 banner">
                <div className="row banner-content ">
                    <div
                        className="col-md-6 first-col">
                        <h1 className="display-4">Make Healthy life</h1>
                        <h1>with <span>Fresh</span> Fruits & Vegetables</h1>
                        <h1> </h1>
                        <div className='d-flex flex-sm-column flex-lg-row flex-column align-items-start align-items-lg-center align-items-sm-start mt-2'>
                            <Link to={'/fruits'} className='hero_btn'><IoIosCart size={25} className='pe-1' /> Explore now</Link>
                            <p className='mt-2 ps-2 fs-4  fw-bold'>100+ Fresh & Healthy Items</p>
                       </div>
                    </div>
                    <div
                        className="col-md-6 second-col">
                        <img
                            src={man_img}
                            alt="Hero"
                            className="img-fluid"
                            style={{ marginBottom: 0 }}
                        />
                    </div>
                </div>

            </div>
        </>
    )
}

export default Hero;