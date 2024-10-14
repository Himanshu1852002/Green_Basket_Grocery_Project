import { useEffect } from "react";
import PropTypes from "prop-types";
import { FcApproval } from "react-icons/fc";
import './SuccessPopup.css'; 

const SuccessPopup = ({ show, message, handleClose }) => {
    // Automatically hide the popup after 1 seconds
    useEffect(() => {
        if (show) {
            const timer = setTimeout(() => {
                handleClose();
            }, 1000);

            return () => clearTimeout(timer); 
        }
    }, [show, handleClose]);

    return (
        <>
            {show && (
                <div className="success-popup alert alert-success alert-dismissible fade show" role="alert">
                    <span className="popup-message">{message}</span>
                    <button type="button" className="popup-close-btn" onClick={handleClose} aria-label="Close">
                        <FcApproval className="popup-icon" />
                    </button>
                </div>
            )}
        </>
    );
};

// PropTypes validation
SuccessPopup.propTypes = {
    show: PropTypes.bool.isRequired,
    message: PropTypes.string.isRequired,
    handleClose: PropTypes.func.isRequired,
};

export default SuccessPopup;
