import { useEffect } from "react";
import PropTypes from "prop-types";

const SuccessPopup = ({ show, message, handleClose }) => {
    // Automatically hide the popup after 3 seconds
    useEffect(() => {
        if (show) {
            const timer = setTimeout(() => {
                handleClose();
            }, 1000);

            return () => clearTimeout(timer); // Cleanup the timer on unmount
        }
    }, [show, handleClose]);

    return (
        <>
            {show && (
                <div
                    className="alert alert-success alert-dismissible fade show position-fixed"
                    style={{ top: "20px", left: "600px", zIndex: 1051 }}
                    role="alert"
                >
                    {message}
                    <button
                        type="button"
                        className="btn-close"
                        onClick={handleClose}
                        aria-label="Close"
                    ></button>
                </div>
            )}
        </>
    );
};

// PropTypes validation
SuccessPopup.propTypes = {
    show: PropTypes.bool.isRequired,        // Boolean to show or hide the popup
    message: PropTypes.string.isRequired,   // Message to display in the popup
    handleClose: PropTypes.func.isRequired, // Function to handle closing the popup
};

export default SuccessPopup;
