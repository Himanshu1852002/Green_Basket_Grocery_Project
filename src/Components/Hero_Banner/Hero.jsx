import './Hero.css';
import man_img from '../../assets/Images/Images/Boy.png';
import { Link } from 'react-router-dom';

const Hero = () => {
    return (
        <>
            <div className="container  banner">
                <div className="row banner-content ">
                    <div
                        className="col-md-6 py-5 first-col">
                        <h1 className="display-4">Make Healthy life</h1>
                        <h1>with <span>Fresh</span></h1>
                        <h1> grocery</h1>
                        <p className="lead">
                            Embrace a healthier lifestyle with Green Basket! We bring you the freshest groceries, straight from farms to your doorstep, ensuring quality, convenience, and sustainability in every bite.
                        </p>
                        <Link to={'/fruits'} className='hero_btn'>Shop now</Link>
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