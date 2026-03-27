import { useState, useRef } from 'react';
import { FaEye, FaEyeSlash, FaLeaf } from "react-icons/fa";
import { MdClose, MdEmail, MdLock, MdPerson } from "react-icons/md";
import './LoginPage.css';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setToken, loadCartData } from '../../../Store/cartSlice';
import { setWishToken, fetchWishlist } from '../../../Store/wishlistSlice';
import axios from 'axios';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const URL = import.meta.env.VITE_API_BASE_URL || "https://green-basket-grocery-project.onrender.com";

const LoginPopup = ({ setShowLogin }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [currState, setCurrState] = useState("Login");
    const [otpState, setOtpState] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resendTimer, setResendTimer] = useState(0);
    const [otpDigits, setOtpDigits] = useState(['', '', '', '', '', '']);
    const otpRefs = [useRef(), useRef(), useRef(), useRef(), useRef(), useRef()];

    const [data, setData] = useState({ name: "", email: "", password: "", otp: "" });

    const onChange = (e) => {
        const { name, value } = e.target;
        setData(prev => ({ ...prev, [name]: value }));
    };

    // OTP box input handler
    const handleOtpChange = (index, value) => {
        if (!/^\d*$/.test(value)) return;
        const updated = [...otpDigits];
        updated[index] = value.slice(-1);
        setOtpDigits(updated);
        setData(prev => ({ ...prev, otp: updated.join('') }));
        if (value && index < 5) otpRefs[index + 1].current?.focus();
    };

    const handleOtpKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !otpDigits[index] && index > 0)
            otpRefs[index - 1].current?.focus();
    };

    const handleOtpPaste = (e) => {
        const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
        if (pasted.length === 6) {
            const arr = pasted.split('');
            setOtpDigits(arr);
            setData(prev => ({ ...prev, otp: pasted }));
            otpRefs[5].current?.focus();
        }
    };

    // Start resend countdown
    const startResendTimer = () => {
        setResendTimer(30);
        const interval = setInterval(() => {
            setResendTimer(prev => {
                if (prev <= 1) { clearInterval(interval); return 0; }
                return prev - 1;
            });
        }, 1000);
    };

    const handleResendOtp = async () => {
        if (resendTimer > 0) return;
        try {
            const res = await axios.post(`${URL}/api/user/register`, { name: data.name, email: data.email, password: data.password });
            if (res.data.success) {
                toast.info('OTP resent to your email!', { autoClose: 2000 });
                setOtpDigits(['', '', '', '', '', '']);
                setData(prev => ({ ...prev, otp: '' }));
                startResendTimer();
                otpRefs[0].current?.focus();
            } else toast.error(res.data.message);
        } catch { toast.error('Failed to resend OTP'); }
    };

    const onLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        let endpoint = URL;
        if (currState === "Login") endpoint += '/api/user/login';
        else if (currState === "Sign Up" && !otpState) endpoint += '/api/user/register';
        else if (otpState) endpoint += '/api/user/verifyOtp';

        try {
            const res = await axios.post(endpoint, data);
            if (res.data.success) {
                const { token, user } = res.data;
                if (currState === "Sign Up" && !otpState) {
                    setOtpState(true);
                    startResendTimer();
                    toast.info("OTP sent to your email!", { autoClose: 2000 });
                    setTimeout(() => otpRefs[0].current?.focus(), 100);
                } else if (otpState) {
                    dispatch(setToken(token));
                    localStorage.setItem('token', token);
                    localStorage.setItem('userId', user.userId);
                    localStorage.setItem('role', user.role);
                    dispatch(loadCartData(token));
                    dispatch(setWishToken(token));
                    dispatch(fetchWishlist(token));
                    setShowLogin(false);
                    toast.success('Account created successfully!', { autoClose: 1500 });
                } else {
                    dispatch(setToken(token));
                    localStorage.setItem('token', token);
                    localStorage.setItem('userId', user.userId);
                    localStorage.setItem('role', user.role);
                    dispatch(loadCartData(token));
                    dispatch(setWishToken(token));
                    dispatch(fetchWishlist(token));
                    setShowLogin(false);
                    toast.success('Logged in successfully!', { autoClose: 1500 });
                    if (user.role === 'admin') navigate('/admin');
                    else {
                        const redirect = localStorage.getItem('redirectAfterLogin');
                        localStorage.removeItem('redirectAfterLogin');
                        navigate(redirect || '/user');
                    }
                }
            } else {
                toast.error(res.data.message || 'Something went wrong', { autoClose: 2000 });
            }
        } catch {
            toast.error('Something went wrong. Please try again.', { autoClose: 2000 });
        } finally {
            setLoading(false);
        }
    };

    const switchState = () => {
        setCurrState(p => p === "Login" ? "Sign Up" : "Login");
        setOtpState(false);
        setOtpDigits(['', '', '', '', '', '']);
        setData({ name: "", email: "", password: "", otp: "" });
    };

    return (
        <div className="lp-overlay" onClick={() => setShowLogin(false)}>
            <div className="lp-box" onClick={e => e.stopPropagation()}>

                {/* Left panel */}
                <div className="lp-left">
                    <div className="lp-brand">
                        <div className="lp-brand-icon">
                            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                                <path d="M4 12h20l-2.5 10H6.5L4 12z" fill="#fff" />
                                <path d="M9 12 Q9 6 14 6 Q19 6 19 12" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round" />
                                <path d="M14 6 Q16 3 19 4 Q17 7 14 6Z" fill="#b9f6ca" />
                            </svg>
                        </div>
                        <span className="lp-brand-name">Green Basket</span>
                    </div>
                    <h2 className="lp-left-title">
                        {currState === "Login" ? "Welcome Back!" : "Join Us Today!"}
                    </h2>
                    <p className="lp-left-sub">
                        {currState === "Login"
                            ? "Login to access your cart, orders, and wishlist."
                            : "Create an account and start shopping fresh groceries."}
                    </p>
                    <div className="lp-features">
                        <div className="lp-feature"><FaLeaf size={12} /> Fresh daily deliveries</div>
                        <div className="lp-feature"><FaLeaf size={12} /> 100% organic products</div>
                        <div className="lp-feature"><FaLeaf size={12} /> Best prices guaranteed</div>
                    </div>
                </div>

                {/* Right panel */}
                <div className="lp-right">
                    <button className="lp-close" onClick={() => setShowLogin(false)}>
                        <MdClose size={18} />
                    </button>

                    <h3 className="lp-form-title">
                        {otpState ? "Verify OTP" : currState === "Login" ? "Sign In" : "Create Account"}
                    </h3>
                    <p className="lp-form-sub">
                        {otpState
                            ? "Enter the OTP sent to your email"
                            : currState === "Login"
                                ? "Enter your credentials to continue"
                                : "Fill in the details to get started"}
                    </p>

                    <form onSubmit={onLogin} className="lp-form">

                        {currState === "Sign Up" && !otpState && (
                            <div className="lp-field">
                                <MdPerson size={16} className="lp-field-icon" />
                                <input
                                    name="name"
                                    type="text"
                                    placeholder="Full Name"
                                    value={data.name}
                                    onChange={onChange}
                                    required
                                    className="lp-input"
                                />
                            </div>
                        )}

                        {!otpState && (
                            <>
                                <div className="lp-field">
                                    <MdEmail size={16} className="lp-field-icon" />
                                    <input
                                        name="email"
                                        type="email"
                                        placeholder="Email Address"
                                        value={data.email}
                                        onChange={onChange}
                                        required
                                        autoComplete="email"
                                        className="lp-input"
                                    />
                                </div>
                                <div className="lp-field">
                                    <MdLock size={16} className="lp-field-icon" />
                                    <input
                                        name="password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Password"
                                        value={data.password}
                                        onChange={onChange}
                                        required
                                        autoComplete="current-password"
                                        className="lp-input"
                                    />
                                    <button type="button" className="lp-eye" onClick={() => setShowPassword(p => !p)}>
                                        {showPassword ? <FaEyeSlash size={14} /> : <FaEye size={14} />}
                                    </button>
                                </div>
                            </>
                        )}

                        {otpState && (
                            <div className="lp-otp-section">
                                {/* Email hint */}
                                <div className="lp-otp-hint">
                                    <MdEmail size={15} color="#059212" />
                                    <span>OTP sent to <strong>{data.email}</strong></span>
                                </div>

                                {/* 6 OTP boxes */}
                                <div className="lp-otp-boxes" onPaste={handleOtpPaste}>
                                    {otpDigits.map((digit, i) => (
                                        <input
                                            key={i}
                                            ref={otpRefs[i]}
                                            type="text"
                                            inputMode="numeric"
                                            maxLength={1}
                                            value={digit}
                                            onChange={e => handleOtpChange(i, e.target.value)}
                                            onKeyDown={e => handleOtpKeyDown(i, e)}
                                            className={`lp-otp-box ${digit ? 'lp-otp-filled' : ''}`}
                                        />
                                    ))}
                                </div>

                                {/* Resend */}
                                <div className="lp-resend-row">
                                    <span className="lp-resend-text">Didn&apos;t receive OTP?</span>
                                    {resendTimer > 0
                                        ? <span className="lp-resend-timer">Resend in {resendTimer}s</span>
                                        : <button type="button" className="lp-resend-btn" onClick={handleResendOtp}>Resend OTP</button>
                                    }
                                </div>

                                {/* Back button */}
                                <button type="button" className="lp-back-btn" onClick={() => {
                                    setOtpState(false);
                                    setOtpDigits(['', '', '', '', '', '']);
                                    setData(prev => ({ ...prev, otp: '' }));
                                }}>
                                    ← Back to Sign Up
                                </button>
                            </div>
                        )}

                        <button type="submit" className="lp-submit" disabled={loading}>
                            {loading
                                ? <span className="lp-spinner" />
                                : otpState ? "Verify OTP"
                                    : currState === "Login" ? "Sign In"
                                        : "Create Account"}
                        </button>
                    </form>

                    <p className="lp-switch">
                        {currState === "Login" ? "Don't have an account?" : "Already have an account?"}
                        {" "}<span onClick={switchState}>
                            {currState === "Login" ? "Sign Up" : "Login"}
                        </span>
                    </p>
                </div>

            </div>
        </div>
    );
};

LoginPopup.propTypes = { setShowLogin: PropTypes.func.isRequired };

export default LoginPopup;
