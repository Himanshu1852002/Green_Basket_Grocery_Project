import './Contact.css'
import shop_img from '../../../assets/Images/Images/shop.png'
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
                    <div className='shop-img-box position-relative col-lg-6 col-md-6 d-flex justify-content-center align-items-center'>
                        <img src={shop_img} alt="" />
                        <div className='position-absolute bg-white contact_content d-flex align-items-start  flex-column'>
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
                    <div className="col-lg-6 col-md-6 contact-form-col d-flex justify-content-center align-items-start flex-column">
                        <h2>Send us</h2>
                        <form className='contact-form d-flex align-items-start flex-column gap-3' action="">
                            <input type="text" placeholder='Your Name' />
                            <input type="email" placeholder='Your Email' />
                            <textarea rows='6' placeholder='Typeing your message here..'></textarea>
                            <button type='submit' className='w-25'>SEND</button>
                        </form>
                    </div>
                </div>
                <div className="col-lg-6 col-md-6 map_image d-flex justify-content-center align-items-center">
                    <iframe className='map-iframe' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d58937.845054058234!2d76.86798941583967!3d22.593486617681158!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x397d16d049a07e11%3A0xfafab0e267077f72!2sKhategaon%2C%20Madhya%20Pradesh%20455336!5e0!3m2!1sen!2sin!4v1735221263725!5m2!1sen!2sin" width="600" height="450" allowFullScreen loading="lazy" referrerPolicy="no-referrer" sandbox="allow-scripts allow-same-origin"></iframe>
                </div>
            </div>
        </>
    )
}

export default Contact