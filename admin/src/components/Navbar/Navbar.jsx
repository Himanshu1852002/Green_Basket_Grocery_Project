import './Navbar.css';
import logo from '../../assets/logo_ai.png';
import profile_img from '../../assets/profile_image.png'

const Navbar = () => {
    return (
        <>
            <div className='navbar px-5'>
                <img className='logo' src={logo} alt="" />
                <img className='profile' src={profile_img} alt="" />
            </div>
        </>
    )
}
export default Navbar;

