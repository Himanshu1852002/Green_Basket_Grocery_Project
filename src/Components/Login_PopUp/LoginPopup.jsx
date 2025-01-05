import { useState } from 'react';
import './LoginPopup.css';
import cross_icon from '../../assets/Images/Images/cross_icon.png';
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
        otp: ""  // Holds OTP value
    });
    const url = "http://localhost:3000";

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(prev => ({ ...prev, [name]: value }));
    }

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
                    // localStorage.setItem('userName', response.data.user.name);
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
                    // localStorage.setItem('userName', response.data.user.name);
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
        <div className='login-popup'>
            <form onSubmit={onLogin} className='login-popup-container'>
                <div className="login-popup-title">
                    <h2>{currState === "Login" ? "Login" : (otpState ? "Verify OTP" : "Sign Up")}</h2>
                    <img onClick={() => setShowLogin(false)} src={cross_icon} alt="" />
                </div>

                <div className="login-popup-inputs">
                    {currState === "Sign Up" && !otpState &&
                        <input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Your name' required />
                    }
                    <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Your email' required />
                    <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder='Password' required />

                    {otpState &&
                        <input name='otp' onChange={onChangeHandler} value={data.otp} type="text" placeholder='Enter OTP' required />
                    }
                </div>
                <div className='forgot-password'>
                    {currState === 'Login' ? <p className='mb-0 text-primary'>Forgot Password</p> : ''}
                </div>
                <button type='submit'>
                    {otpState ? "Verify OTP" : (currState === "Sign Up" ? "Create Account" : "Login")}
                </button>

                <div className="login-popup-condition">
                    <input type="checkbox" required />
                    <p>By continuing, I agree to the terms of use & privacy policy.</p>
                </div>

                {currState === "Login" ?
                    <p>Create a new account? <span onClick={() => setCurrState("Sign Up")}>Click here</span></p> :
                    <p>Already have an account? <span onClick={() => setCurrState("Login")}>Login here</span></p>
                }
            </form>
        </div>
    );
}

LoginPopup.propTypes = {
    setShowLogin: PropTypes.func.isRequired,
};

export default LoginPopup;


