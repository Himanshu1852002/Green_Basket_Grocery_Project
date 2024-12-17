import { useState } from 'react'
import './LoginPopup.css'
import cross_icon from '../../assets/Images/Images/cross_icon.png'
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { setToken } from '../../Store/tokenSlice';
import axios from 'axios';

const LoginPopup = ({ setShowLogin }) => {

    const dispatch = useDispatch();
    const [currState, setCurrState] = useState("Login");
    const url = useSelector((state) => state.cart.url);

    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""
    })

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(prev => ({ ...prev, [name]: value }))
    }

    const onLogin = async (event) => {
        event.preventDefault()

        let newUrl = url;
        if (currState === "Login") {
            newUrl += '/api/user/login'
        }
        else {
            newUrl += '/api/user/register'
        }

        const response = await axios.post(newUrl, data);

        if (response.data.success) {
            dispatch(setToken(response.data.token));
            localStorage.setItem("token", response.data.token)
            localStorage.setItem('userName', response.data.user.name);
            setShowLogin(false);
        }
        else {
            alert(response.data.message);
        }
    }

    return (
        <div className='login-popup'>
            <form onSubmit={onLogin} className='login-popup-container'>
                <div className="login-popup-title">
                    <h2>{currState}</h2>
                    <img onClick={() => setShowLogin(false)} src={cross_icon} alt="" />
                </div>
                <div className="login-popup-inputs">
                    {currState === "Login" ? <></> : <input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Your name' required />}

                    <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Your email' required />
                    <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder='Password' required />
                </div>
                <button type='submit'>{currState === "Sign Up" ? "Create account" : "Login"}</button>
                <div className="login-popup-condition">
                    <input type="checkbox" required />
                    <p>By contiuning, i agree to the terms of use & privacy policy.</p>
                </div>
                {currState === "Login" ?
                    <p>Create a new account? <span onClick={() => setCurrState("Sign Up")}>Click here</span></p> :
                    <p>Already have an account? <span onClick={() => setCurrState("Login")}>Login here</span></p>
                }
            </form>
        </div>
    )
}

LoginPopup.propTypes = {
    setShowLogin: PropTypes.func.isRequired,
}

export default LoginPopup