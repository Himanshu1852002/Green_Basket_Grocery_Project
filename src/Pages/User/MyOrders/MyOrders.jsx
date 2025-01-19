import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import no_order_img from "../../../assets/Images/Images/order_no.png";
import { fetchOrders } from "../../../Store/orderSlice";
import "./MyOrders.css";

const OrderDetails = () => {
    const dispatch = useDispatch();
    const { orders } = useSelector((state) => state.order);

    useEffect(() => {
        dispatch(fetchOrders());
    }, [dispatch]);

    return (
        <div className="order-details container py-5" style={{ marginTop: "80px" }}>
            <h2 className="mb-4 text-center">My Orders</h2>
            <hr />
            <div className="order-list">
                {orders.length === 0 ? (
                    <div className="d-flex flex-column align-items-center justify-content-center py-5">
                        <img
                            src={no_order_img}
                            alt="No Orders"
                            className="img-fluid order-no-img"
                        />
                        <h2 className="text-center">No Orders Found!</h2>
                    </div>
                ) : (
                    orders.map((order, index) => (
                        <div
                            key={index}
                            className="order-card border rounded mb-4 p-3 row align-items-center shadow-sm"
                        >
                            <div className="col-12 col-md-6 mb-2 mb-md-0">
                                <p className="mb-1 text-muted">
                                    <strong>Items:</strong>
                                </p>
                                <p className="mb-0">
                                    {order.items.map((item, i) => (
                                        <span key={i} className="d-block">
                                            <strong>{item.name}</strong> x {item.quantity} = &#8377;
                                            {item.price * item.quantity}
                                        </span>
                                    ))}
                                </p>
                            </div>
                            <div className="col-6 col-md-3 text-center">
                                <p className="mb-1 text-muted">
                                    <strong>Total Amount:</strong>
                                </p>
                                <p className="mb-0">&#8377;{order.amount}</p>
                            </div>
                            <div className="col-6 col-md-3 text-center">
                                <button className="btn btn-danger w-100">
                                    Cancel Order
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default OrderDetails;
