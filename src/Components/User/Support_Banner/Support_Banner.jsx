import './Support_banner.css';
import { FaTruck } from "react-icons/fa";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { IoIosTime } from "react-icons/io";
import { AiOutlineSafetyCertificate } from "react-icons/ai";
import PropTypes from 'prop-types';


const supportItems = [
    {
        icon: <FaTruck />,
        title: "Free Shipping",
        description: "On order over 1000 rs",
    },
    {
        icon: <FaMoneyBillTransfer />,
        title: "Money Return",
        description: "30 Days money return",
    },
    {
        icon: <IoIosTime />,
        title: "Support 24/7",
        description: "Call: (+91 6266059961)",
    },
    {
        icon: <AiOutlineSafetyCertificate />,
        title: "Safe Payment",
        description: "Protect online payment",
    },
];



// eslint-disable-next-line react-refresh/only-export-components
const SupportBannerItem = ({ icon, title, description }) => (

    
    <div className="col-lg-3 col-md-6 col-sm-6 cards">  
        <div className="card card-create">
            <a className='card-ico' href="#">{icon}</a>
            <div className="card-body body-card">
                <h2>{title}</h2>
                <p>{description}</p>
            </div>
        </div>
    </div>
);

SupportBannerItem.propTypes = {
    icon: PropTypes.element.isRequired,  // Ensures icon is a React element
    title: PropTypes.string.isRequired,  // Ensures title is a string
    description: PropTypes.string.isRequired,  // Ensures description is a string
};

const Support_Banner = () => {
    return (
        <div className="card-box ">
            <h1>Customer <span>Support</span></h1>
            <div className="container">
                <div className="row">
                    {supportItems.map((item, index) => (
                        <SupportBannerItem
                            key={index}
                            icon={item.icon}
                            title={item.title}
                            description={item.description}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Support_Banner;
