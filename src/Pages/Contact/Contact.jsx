import map_img from '../../assets/Images/Images/map.png.png';
import './Contact.css'
import { CiLocationOn } from "react-icons/ci";
import { FaPhoneAlt } from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md";
const Contact = () => {
    return (
        <>
            <div className="container-fluid contact_container">
                <div className="row contact_row_1">
                    <div className="col-12 d-flex justify-content-center align-items-center contact_heading">
                        <h1 className="fw-bold fs-1">CONTACT US</h1>
                    </div>
                </div>
                <div className="row  contact_row_2">
                    <div className="col-lg-6 col-md-6 map_image d-flex justify-content-center align-items-center">
                        <img src={map_img} alt="map image" />
                    </div>
                    <div className="col-lg-6 col-md-6 contact_content d-flex justify-content-evenly align-items-start flex-column">
                        <div className='d-flex justify-content-center align-items-center'>
                            <div className='contact_icons'><CiLocationOn /></div>
                            <div>
                                <h2>Our Office Address</h2>
                                <p>Shop No. 4, Krishna Palace, Plot No. 47 near imli bazar, Nehru Marg, Khategaon, Dist - Dewas, (M.P.) 455336</p>
                            </div>
                        </div>

                        <div className='d-flex justify-content-center align-items-center' >
                            <div className='contact_icons'><FaPhoneAlt /></div>
                            <div>
                                <h2>+91 - 6266059961</h2>
                                <h2>+91 - 9589391454</h2>
                            </div>
                        </div>

                        <div className='d-flex justify-content-center align-items-center'>
                            <div className='contact_icons'><MdOutlineMail /></div>
                            <div><h2>greenbasket@gmail.com</h2></div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Contact