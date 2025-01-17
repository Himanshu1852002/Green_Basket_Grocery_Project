import { useDispatch, useSelector } from 'react-redux';
import { RxCross2 } from "react-icons/rx";
import { Link } from 'react-router-dom';
import './Wishlist.css';
import { fetchProductList, removeFromWishlistAPI, fetchWishlist } from '../../../Store/wishlistSlice';
import empty_img from '../../../assets/Images/Images/Empty Cart Icon.png';
import { useEffect } from 'react';
import { addToCartAPI } from "../../../Store/cartSlice";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Wishlist = () => {
    const { items, product_list } = useSelector((state) => state.wishlist);
    const token = useSelector((state) => state.wishlist.token);
    const dispatch = useDispatch();
    const url = "http://localhost:3000";

    useEffect(() => {
        dispatch(fetchProductList());
    }, [dispatch]);

    useEffect(() => {
        if (token) {
            dispatch(fetchWishlist(token));
        }
    }, [dispatch, token]);

    const removeWish = (itemId) => {
        if (token) {
            dispatch(removeFromWishlistAPI({ token, itemId }));
        } else {
            toast.error("Please log in to modify your wishlist.", { autoClose: 2000 });
        }
    };

    const isWishlistEmpty = Object.keys(items).length === 0;

    const Carttoken = useSelector((state) => state.cart.token);

    const handleAddToCart = (itemId) => {
        if (Carttoken) {
            dispatch(addToCartAPI({ itemId: itemId, token }));
            toast.success('Product added to cart!', { autoClose: 2000 });
        } else {
            toast.error('Please log in to add items to the cart.', { autoClose: 2000 });
        }
    };

    if (isWishlistEmpty) {
        return (
            <div className="container text-center" style={{marginTop:"70px"}}>
                <div className="row d-flex justify-content-center align-items-center">
                    <div className="col-12">
                        <h2 className="fw-bold text-start ms-4 mt-5">YOUR WISHES</h2>
                        <hr />
                        <img src={empty_img} alt="Empty Wishlist" className="img-fluid empty_wish_row " />
                        <h3 className="fw-bold">Your wishlist is empty</h3>
                        <Link to="/" className="btn  mt-3 mb-5">
                            Continue Shopping
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container" style={{ marginTop: "70px" }}>
            <div className="row d-flex justify-content-center align-items-center">
                <div className="col-12">
                    <h2 className="fw-bold ms-4 mt-5">YOUR WISHES</h2>
                    <hr />
                </div>
            </div>
            <div className="row">
                {product_list.map((item) => (
                    items[item._id] > 0 && (
                        <div key={item._id} className="col-lg-3 col-md-4 col-sm-6 col-12 mt-3 mb-4">
                            <div className="card h-100 product_card position-relative shadow-sm">
                                <img src={`${url}/uploads/${item.image}`} className="card-img-top" alt={item.name || 'Product'} />
                                <div className="position-absolute top-0 end-0 p-2">
                                    <RxCross2 onClick={() => removeWish(item._id)} size={25} className="text-danger cursor-pointer" />
                                </div>
                                <div className="card-body d-flex flex-column justify-content-center align-items-center">
                                    <h5 className="card-title text-center mb-2">{item.name || 'Unnamed Product'}</h5>
                                    <p className="card-text text-center text-muted">&#8377;{item.price || 'N/A'} - {item.unit || 'N/A'}</p>
                                    <button className="btn mt-auto w-100" onClick={() => handleAddToCart(item._id)}>
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    )
                ))}
            </div>
        </div>
    );
};

export default Wishlist;