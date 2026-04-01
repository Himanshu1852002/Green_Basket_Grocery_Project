import { useState } from 'react';
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

const URL = import.meta.env.VITE_API_BASE_URL || "https://green-basket-grocery-project-1.onrender.com";

const LoginPopup = ({ setShowLogin }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [currState, setCurrState] = useState("Login");
    const [signupSuccess, setSignupSuccess] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    // Forgot password states
    const [forgotStep, setForgotStep] = useState(0);
    const [forgotEmail, setForgotEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [forgotError, setForgotError] = useState('');
    const [loginError, setLoginError] = useState('');

    const [data, setData] = useState({ name: "", email: "", password: "" });

    const onChange = (e) => {
        const { name, value } = e.target;
        setData(prev => ({ ...prev, [name]: value }));
        setLoginError('');
    };

    const onLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        const endpoint = currState === "Login" ? `${URL}/api/user/login` : `${URL}/api/user/register`;

        try {
            const res = await axios.post(endpoint, data);
            if (res.data.success) {
                const { token, user } = res.data;
                if (currState === "Sign Up") {
                    const { token, user } = res.data;
                    dispatch(setToken(token));
                    localStorage.setItem('token', token);
                    localStorage.setItem('userId', user.userId);
                    localStorage.setItem('role', user.role);
                    dispatch(loadCartData(token));
                    dispatch(setWishToken(token));
                    dispatch(fetchWishlist(token));
                    setSignupSuccess(true);
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
                setLoginError(res.data.message || 'Something went wrong');
            }
        } catch {
            setLoginError('Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const switchState = () => {
        setCurrState(p => p === "Login" ? "Sign Up" : "Login");
        setSignupSuccess(false);
        setLoginError('');
        setData({ name: "", email: "", password: "" });
    };

    const openForgot = () => { setForgotStep(1); setForgotEmail(''); setNewPassword(''); setConfirmPassword(''); setForgotError(''); };
    const closeForgot = () => { setForgotStep(0); setForgotError(''); };

    const handleForgotEmail = async (e) => {
        e.preventDefault();
        setForgotError('');
        setLoading(true);
        try {
            const res = await axios.post(`${URL}/api/user/checkEmail`, { email: forgotEmail });
            if (res.data.success) setForgotStep(2);
            else setForgotError(res.data.message || 'No account found with this email');
        } catch { setForgotError('Something went wrong. Please try again.'); }
        setLoading(false);
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        setForgotError('');
        if (newPassword !== confirmPassword) { setForgotError('Passwords do not match'); return; }
        if (newPassword.length < 8) { setForgotError('Password must be at least 8 characters'); return; }
        setLoading(true);
        try {
            const res = await axios.post(`${URL}/api/user/resetPassword`, { email: forgotEmail, newPassword });
            if (res.data.success) setForgotStep(3);
            else setForgotError(res.data.message || 'Failed to reset password');
        } catch { setForgotError('Something went wrong. Please try again.'); }
        setLoading(false);
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

                    {/* Forgot Password Flow */}
                    {forgotStep > 0 ? (
                        <>
                            {forgotStep === 1 && (
                                <>
                                    <h3 className="lp-form-title">Forgot Password</h3>
                                    <p className="lp-form-sub">Enter your registered email address</p>
                                    <form className="lp-form" onSubmit={handleForgotEmail}>
                                        <div className="lp-field">
                                            <MdEmail size={16} className="lp-field-icon" />
                                            <input className="lp-input" type="email" placeholder="Email Address" value={forgotEmail} onChange={e => { setForgotEmail(e.target.value); setForgotError(''); }} required />
                                        </div>
                                        {forgotError && <p className="lp-inline-error">{forgotError}</p>}
                                        <button type="submit" className="lp-submit" disabled={loading}>
                                            {loading ? <span className="lp-btn-loader"><span /><span /><span /></span> : 'Verify Email'}
                                        </button>
                                    </form>
                                    <p className="lp-switch"><span onClick={closeForgot}>← Back to Login</span></p>
                                </>
                            )}
                            {forgotStep === 2 && (
                                <>
                                    <h3 className="lp-form-title">Set New Password</h3>
                                    <p className="lp-form-sub">Create a new password for <strong>{forgotEmail}</strong></p>
                                    <form className="lp-form" onSubmit={handleResetPassword}>
                                        <div className="lp-field">
                                            <MdLock size={16} className="lp-field-icon" />
                                            <input className="lp-input" type={showNewPassword ? 'text' : 'password'} placeholder="New Password" value={newPassword} onChange={e => { setNewPassword(e.target.value); setForgotError(''); }} required />
                                            <button type="button" className="lp-eye" onClick={() => setShowNewPassword(p => !p)}>
                                                {showNewPassword ? <FaEyeSlash size={14} /> : <FaEye size={14} />}
                                            </button>
                                        </div>
                                        <div className="lp-field">
                                            <MdLock size={16} className="lp-field-icon" />
                                            <input className="lp-input" type="password" placeholder="Confirm Password" value={confirmPassword} onChange={e => { setConfirmPassword(e.target.value); setForgotError(''); }} required />
                                        </div>
                                        {forgotError && <p className="lp-inline-error">{forgotError}</p>}
                                        <button type="submit" className="lp-submit" disabled={loading}>
                                            {loading ? <span className="lp-btn-loader"><span /><span /><span /></span> : 'Reset Password'}
                                        </button>
                                    </form>
                                </>
                            )}
                            {forgotStep === 3 && (
                                <div className="lp-success">
                                    <div className="lp-success-icon">✓</div>
                                    <h3 className="lp-success-title">Password Reset!</h3>
                                    <p className="lp-success-sub">Your password has been reset successfully. You can now login.</p>
                                    <button className="lp-submit" onClick={closeForgot}>Back to Login</button>
                                </div>
                            )}
                        </>
                    ) : signupSuccess ? (
                        <div className="lp-success">
                            <div className="lp-success-icon">✓</div>
                            <h3 className="lp-success-title">Account Created!</h3>
                            <p className="lp-success-sub">Welcome to Green Basket, <strong>{data.name}</strong>! Your account has been created successfully.</p>
                            <button className="lp-submit" onClick={() => { setShowLogin(false); navigate('/user'); switchState(); }}>
                                Start Shopping
                            </button>
                        </div>
                    ) : (
                        <>
                        <h3 className="lp-form-title">
                            {currState === "Login" ? "Sign In" : "Create Account"}
                        </h3>
                        <p className="lp-form-sub">
                            {currState === "Login" ? "Enter your credentials to continue" : "Fill in the details to get started"}
                        </p>

                        <form onSubmit={onLogin} className="lp-form">
                            {currState === "Sign Up" && (
                                <div className="lp-field">
                                    <MdPerson size={16} className="lp-field-icon" />
                                    <input name="name" type="text" placeholder="Full Name" value={data.name} onChange={onChange} required className="lp-input" />
                                </div>
                            )}
                            <div className="lp-field">
                                <MdEmail size={16} className="lp-field-icon" />
                                <input name="email" type="email" placeholder="Email Address" value={data.email} onChange={onChange} required autoComplete="email" className="lp-input" />
                            </div>
                            <div className="lp-field">
                                <MdLock size={16} className="lp-field-icon" />
                                <input name="password" type={showPassword ? "text" : "password"} placeholder="Password" value={data.password} onChange={onChange} required autoComplete="current-password" className="lp-input" />
                                <button type="button" className="lp-eye" onClick={() => setShowPassword(p => !p)}>
                                    {showPassword ? <FaEyeSlash size={14} /> : <FaEye size={14} />}
                                </button>
                            </div>
                            <button type="submit" className="lp-submit" disabled={loading}>
                                {loading
                                    ? <span className="lp-btn-loader"><span /><span /><span /></span>
                                    : currState === "Login" ? "Sign In" : "Create Account"}
                            </button>
                            {loginError && <p className="lp-inline-error">{loginError}</p>}
                            {currState === "Login" && (
                                <p className="lp-forgot" onClick={openForgot}>Forgot Password?</p>
                            )}
                        </form>
                        </>
                    )}

                    {!signupSuccess && (
                        <p className="lp-switch">
                            {currState === "Login" ? "Don't have an account?" : "Already have an account?"}
                            {" "}<span onClick={switchState}>
                                {currState === "Login" ? "Sign Up" : "Login"}
                            </span>
                        </p>
                    )}
                </div>

            </div>
        </div>
    );
};

LoginPopup.propTypes = { setShowLogin: PropTypes.func.isRequired };

export default LoginPopup;
