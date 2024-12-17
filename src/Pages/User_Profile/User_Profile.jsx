import './User_Profile.css';
import { FaUserEdit, FaHandPointRight } from "react-icons/fa";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaLocationDot } from "react-icons/fa6";
import { MdProductionQuantityLimits } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { clearToken } from '../../Store/tokenSlice'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';


const User_Profile = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [profileImage, setProfileImage] = useState("https://www.shutterstock.com/image-vector/user-profile-icon-vector-avatar-600nw-2247726673.jpg");

    const [userName, setUserName] = useState('');

    const handleLogOut = () => {
        dispatch(clearToken());
        localStorage.removeItem("token");
        navigate('/');
    }

    useEffect(() => {
        const storeUsername = localStorage.getItem('userName');
        if (storeUsername) {
            setUserName(storeUsername);
        }
    }, []);


    // for the image
    const handleImageChnage = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setProfileImage(reader.result);
            }
            reader.readAsDataURL(file);
        }
    }

    return (
        <>

            <div className="user_profile d-flex flex-column justify-content-center align-items-center">
                <h1 className='fw-bold mb-4'>User Profile</h1>
                <div className="user-img">
                    <div className="file-input-container gap-3">
                        <div className="image-preview">
                            <img src={profileImage} alt="Profile" />
                            <MdEdit className='pen-icon' />
                        </div>
                        <input type="file" id="fileInput" accept="image/*" hidden onChange={handleImageChnage} />
                        <label htmlFor="fileInput" className="file-label">
                            <MdEdit className="pen-icon" /> Choose File
                        </label>
                    </div>
                    {userName ? <h2 className='mt-3 text-center'>{userName}</h2> : <h2 className='mt-3 text-center'>Himanshu Vishwakarma</h2>}
                </div>
                <div className='d-flex gap-2 flex-md-row flex-column'>
                    <div className="user-info d-flex justify-content-between align-items-center">
                        <div className="d-flex justify-content-center align-items-center">
                            <FaUserEdit size={20} />
                            <p className='ms-2 mt-3'>Edit Profile</p>
                        </div>
                        <FaHandPointRight size={20} />
                    </div>
                    <div className="user-info d-flex justify-content-between align-items-center">
                        <div className="d-flex justify-content-center align-items-center">
                            <MdProductionQuantityLimits size={20} />
                            <p className='ms-2 mt-3'>Orders</p>
                        </div>
                        <FaHandPointRight size={20} />
                    </div>
                </div>
                <div className='d-flex gap-2 flex-md-row flex-column'>
                    <div className="user-info d-flex justify-content-between align-items-center">
                        <div className="d-flex justify-content-center align-items-center">
                            <FaLocationDot size={20} />
                            <p className='ms-2 mt-3'>Shipping Address</p>
                        </div>
                        <FaHandPointRight size={20} />
                    </div>
                    <div className="user-info d-flex justify-content-between align-items-center">
                        <div className="d-flex justify-content-center align-items-center">
                            <RiLockPasswordFill size={20} />
                            <p className='ms-2 mt-3'>Change Password</p>
                        </div>
                        <FaHandPointRight size={20} />
                    </div>
                </div>

                <button className='sign_out_btn' onClick={handleLogOut}>
                    <FaArrowRightFromBracket size={20} />
                    <p>Sign Out</p>
                </button>
            </div>

        </>
    )
}

export default User_Profile