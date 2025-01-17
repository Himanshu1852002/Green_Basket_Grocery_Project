import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import parcel_img from "../../../assets/Images/Images/parcel.png";
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
        <div className="order-details container py-5" style={{marginTop:"80px"}}>
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
                            className="order-card border gap-3 gap-sm-0 rounded mb-4 p-3 row align-items-center"
                        >
                            <div className="col-12 col-md-2 text-center mb-3 mb-md-0">
                                <img
                                    src={parcel_img}
                                    alt="Parcel"
                                    className="img-fluid order-img"
                                />
                            </div>
                            <div className="col-12 col-md-4 mb-2 mb-md-0">
                                <p className="mb-1 text-muted">
                                    <strong>Items:</strong>
                                </p>
                                <p className="mb-0">
                                    {order.items.map((item, i) => (
                                        <span key={i}>
                                            {item.name} x {item.quantity}
                                            {i < order.items.length - 1 && ", "}
                                        </span>
                                    ))}
                                </p>
                            </div>
                            <div className="col-6 col-md-2 text-center">
                                <p className="mb-1 text-muted">
                                    <strong>Amount:</strong>
                                </p>
                                <p className="mb-0">&#8377;{order.amount}</p>
                            </div>
                            <div className="col-6 col-md-2 text-center">
                                <p className="mb-1 text-muted">
                                    <strong>Status:</strong>
                                </p>
                                <p className="mb-0 text-success">{order.status}</p>
                            </div>
                            <div className="col-12 col-md-2 text-center">
                                <button className="btn btn-outline-primary w-100">
                                    Track Order
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
