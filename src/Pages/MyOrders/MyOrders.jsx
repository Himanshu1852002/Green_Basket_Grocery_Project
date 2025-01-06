import './MyOrders.css'
import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux";
import parcel_img from '../../assets/Images/Images/parcel.png'
import { fetchOrders } from '../../Store/orderSlice';


const MyOrders = () => {

    const dispatch = useDispatch();
    const { orders } = useSelector((state) => state.order);

    useEffect(() => {
        dispatch(fetchOrders());
    }, [dispatch]);

    return (
        <div className="my-orders">
            <h2>My Orders</h2>
            <div className="conateiner">
                {orders.map((order, index) => {
                    return (
                        <div key={index} className="my-orders-order">
                            <img className="parcel-img" src={parcel_img} alt="" />
                            <p>{order.items.map((item, index) => {
                                if (index === order.items.length - 1) {
                                    return item.name + " x " + item.quantity
                                }
                                else {
                                    return item.name + " x " + item.quantity + " , "
                                }
                            })}</p>
                            <p>&#8377;{order.amount}</p>
                            <p>Items: {order.items.length}</p>
                            <p><span>&#x25cf;</span><b>{order.status}</b></p>
                            <button>Track Order</button>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default MyOrders