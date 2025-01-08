import { useState } from 'react';
import { FaUser } from "react-icons/fa";
import './LoginPopup.css';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { setToken, loadCartData } from '../../Store/cartSlice';
import { setWishToken, fetchWishlist } from '../../Store/wishlistSlice';
import axios from 'axios';
import { toast } from 'react-toastify';

const LoginPopup = ({ setShowLogin }) => {
    const dispatch = useDispatch();
    const [currState, setCurrState] = useState("Login");
    const [otpState, setOtpState] = useState(false);
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        otp: ""
    });

    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setData((prev) => ({ ...prev, [name]: value }));
    };

    const url = "http://localhost:3000";
    const onLogin = async (event) => {
        event.preventDefault();

        let newUrl = url;
        if (currState === "Login") {
            newUrl += '/api/user/login';
        } else if (currState === "Sign Up" && !otpState) {
            newUrl += '/api/user/register';
        } else if (otpState) {
            newUrl += '/api/user/verifyOtp';
        }

        try {
            const response = await axios.post(newUrl, data);

            if (response.data.success) {
                if (currState === "Sign Up" && !otpState) {
                    setOtpState(true);

                } else if (otpState) {

                    const token = response.data.token;
                    dispatch(setToken(token));
                    localStorage.setItem('token', token);
                    localStorage.setItem('userId', response.data.user.userId);
                    dispatch(loadCartData(token));
                    dispatch(setWishToken(token));
                    dispatch(fetchWishlist(token));
                    setShowLogin(false);
                    toast.info('Sign up Successfully', { autoClose: 1000 });
                } else {

                    const token = response.data.token;
                    dispatch(setToken(token));
                    localStorage.setItem('token', token);
                    localStorage.setItem('userId', response.data.user.userId);
                    dispatch(loadCartData(token));
                    dispatch(setWishToken(token));
                    dispatch(fetchWishlist(token));
                    setShowLogin(false);
                    toast.info('Login Successfully', { autoClose: 1000 });
                }
            } else {
                alert(response.data.message);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="login-popup">
            <form onSubmit={onLogin} className="login-popup-container">
                <div className="login-popup-header position-relative">

                    <div className="icon-placeholder d-flex justify-content-center align-items-center">
                        <FaUser size={30} />
                    </div>
                    <button
                        type="button"
                        className="close-button position-absolute top-0 end-0"
                        onClick={() => setShowLogin(false)}
                    >
                        &times;
                    </button>
                    <h3 className="mt-1">{currState === "Login" ? "Login" : "Sign Up"}</h3>
                </div>
                <div className="login-popup-body">
                    {currState === "Sign Up" && !otpState && (
                        <input
                            name="name"
                            onChange={onChangeHandler}
                            value={data.name}
                            type="text"
                            placeholder="Your name"
                            required
                        />
                    )}
                    <input
                        name="email"
                        onChange={onChangeHandler}
                        value={data.email}
                        type="email"
                        placeholder="Email"
                        required
                    />
                    <input
                        name="password"
                        onChange={onChangeHandler}
                        value={data.password}
                        type="password"
                        placeholder="Password"
                        required
                    />
                    {otpState && (
                        <input
                            name="otp"
                            onChange={onChangeHandler}
                            value={data.otp}
                            type="text"
                            placeholder="Enter OTP"
                            required
                        />
                    )}
                </div>
                <button type="submit" className="login-button">
                    {otpState ? "Verify OTP" : currState === "Sign Up" ? "Create Account" : "Login"}
                </button>
                <div className="login-popup-footer">
                    <p>
                        {currState === "Login" ? "Forgot password?" : "Already have an account?"}{" "}
                        <span onClick={() => setCurrState(currState === "Login" ? "Sign Up" : "Login")}>
                            {currState === "Login" ? "Sign up" : "Login here"}
                        </span>
                    </p>
                </div>
            </form>
        </div>
    );
};

LoginPopup.propTypes = {
    setShowLogin: PropTypes.func.isRequired,
};

export default LoginPopup;
