import { useSelector } from 'react-redux';
import './Checkout.css';
import { useEffect, useState } from 'react';



const Checkout = () => {

    const { totalCartAmount } = useSelector((state) => state.cart);
    const [deliverFee, setDeleveryFee] = useState(10);

    const CalculateDeleveryFee = () => {
        if (totalCartAmount > 200) {
            setDeleveryFee(20)
        }
        else if (totalCartAmount > 500) {
            setDeleveryFee(40)
        }
        else if (totalCartAmount > 1000) {
            setDeleveryFee(80)
        }
        else if (totalCartAmount > 2000) {
            setDeleveryFee(120)
        }
        else if (totalCartAmount > 4000) {
            setDeleveryFee(160)
        }
        else {
            setDeleveryFee(10)
        }
    }

    useEffect(() => {
        CalculateDeleveryFee();
    }, [totalCartAmount])

    return (
        <>
            <div className='container checkout-cotainer'>
                <div className='row'>
                    <div className='col-lg-6 address-col'>
                        <div>
                            <h2 className='fw-bold mb-3'>Delivery Information</h2>
                        </div>
                        <div className='d-flex flex-column gap-2'>
                            <div className='d-flex gap-2'>
                                <input className='w-50 p-2' type="text" placeholder='First name' />
                                <input className='w-50 p-2' type="text" placeholder='Last name' />
                            </div>
                            <div className='d-flex flex-column gap-2'>
                                <input className='p-2' type="email" placeholder='Email address' />
                                <input className='p-2' type="text" placeholder='Street' />
                            </div>
                            <div className='d-flex gap-2'>
                                <input className='w-50 p-2' type="text" placeholder='City' />
                                <input className='w-50 p-2' type="text" placeholder='State' />
                            </div>
                            <div className='d-flex gap-2'>
                                <input className='w-50 p-2' type="text" placeholder='Pin Code' />
                                <input className='w-50 p-2' type="text" placeholder='Country' />
                            </div>
                            <div className='d-flex gap-2'>
                                <input className='w-100 p-2' type="number" placeholder='Mobile No.' />
                            </div>
                        </div>
                        {/* <button className='mt-2 fw-bold w-25 p-2 rounded-5'>Add Address</button> */}
                    </div>
                    <div className='col-lg-6 mt-sm-5 mt-5 mt-lg-0'>
                        <div>
                            <h2 className='fw-bold mb-3'>Cart Total</h2>
                        </div>
                        <div className='d-flex justify-content-between border-bottom border-3'>
                            <p className='fw-bold'>Subtotal</p>
                            <p>{totalCartAmount}</p>
                        </div>
                        <div className='d-flex justify-content-between border-bottom border-3'>
                            <p className='fw-bold'>Delivery Fee</p>
                            <p>{deliverFee}</p>
                        </div>
                        <div className='d-flex justify-content-between'>
                            <p className='fw-bold'>Total</p>
                            <p>{totalCartAmount + deliverFee}</p>
                        </div>
                        <button className='mt-2 btn w-md-50 w-sm-100 pe-3 ps-3 pt-2 pb-2 cursor-pointer rounded-5'>Proceed Payment</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Checkout