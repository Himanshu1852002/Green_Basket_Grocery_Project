import './Verify.css'
import success_img from '../../../assets/Images/Images/success.png'
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';

const Verify = () => {
    const navigate = useNavigate();

    const myorderHandler = async () => {
        navigate('/myorder');
    }

    return (
        <div className='pt-5 pb-5 d-flex justify-content-center align-items-center flex-column gap-4 '>
            <div className='mt-5 pt-5 h-100 w-100 d-flex justify-content-center align-items-center'>
                <img className='success-img' src={success_img} alt="" />
            </div>
            <div className='d-flex justify-content-center align-items-center gap-2 flex-column'>
                <h1>Thank You !</h1>
                <div className='d-flex justify-content-center align-items-center gap-4'>
                    <IoCheckmarkDoneCircle size={30} style={{ color: 'green' }} />
                    <h3>Payment Done Successfully</h3>
                </div>
                <p className='text-center'>Your order has been placed successfully and is now being prepared for delivery.</p>
                <button onClick={myorderHandler} className='btn'>Check Order!</button>
            </div>
        </div>
    );
}

export default Verify