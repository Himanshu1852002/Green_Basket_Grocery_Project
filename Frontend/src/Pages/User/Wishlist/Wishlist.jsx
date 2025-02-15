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
    const url = import.meta.env.REACT_APP_API_BASE_URL;

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

    return (
        <div className="container-fluid">
            {/* Header Section */}
            <div className="row d-flex justify-content-center align-items-center pt-3 pb-3" style={{ backgroundColor:'#263d2f'}}>
                <div className="col-12 d-flex justify-content-center align-items-center flex-column">
                    <p className='text-white'>Home &gt; Wishlist</p>
                    <h2 className="text-start text-white" style={{ wordSpacing: "20px" }}>Wishlist</h2>
                </div>
            </div>

            <div className='container wishlist-container rounded-4' style={{marginTop:'20px'}}>
                {/* Dynamic Content */}
                {isWishlistEmpty ? (
                    <div className="row d-flex justify-content-center align-items-center">
                        <div className="col-12 text-center">
                            <img src={empty_img} alt="Empty Wishlist" className="img-fluid empty_wish_row mt-4" />
                            <h3 className="fw-bold mt-3">Your wishlist is empty</h3>
                            <Link to="/" className="btn btn-success mt-3 mb-5">
                                Continue Shopping
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div className="row">
                        {product_list.map((item) => (
                            items[item._id] > 0 && (
                                <div key={item._id} className="col-lg-3 col-md-4 col-sm-6 col-12 mt-3 mb-4">
                                    <div className="card h-100 product_card position-relative shadow-sm">
                                        <img
                                            src={`${url}/uploads/${item.image}`}
                                            className="card-img-top"
                                            alt={item.name || 'Product'}
                                        />
                                        <div className="position-absolute top-0 end-0 p-2">
                                            <RxCross2
                                                onClick={() => removeWish(item._id)}
                                                size={25}
                                                className="text-danger"
                                                style={{cursor:'pointer'}}
                                            />
                                        </div>
                                        <div className="card-body d-flex flex-column justify-content-center align-items-center">
                                            <h5 className="card-title text-center mb-2">{item.name || 'Unnamed Product'}</h5>
                                            <p className="card-text text-center text-muted">
                                                &#8377;{item.price || 'N/A'} - {item.unit || 'N/A'}
                                            </p>
                                            <button
                                                className="btn btn-success mt-auto w-100"
                                                onClick={() => handleAddToCart(item._id)}
                                            >
                                                Add to Cart
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Wishlist;
