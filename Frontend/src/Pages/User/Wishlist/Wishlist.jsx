import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './Wishlist.css';
import { fetchProductList, removeFromWishlistAPI, fetchWishlist } from '../../../Store/wishlistSlice';
import empty_img from '../../../assets/Images/Images/Empty Cart Icon.png';
import { useEffect } from 'react';
import { addToCartAPI } from '../../../Store/cartSlice';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaHeart, FaShoppingCart, FaTrash } from 'react-icons/fa';

const Wishlist = () => {
    const { items, product_list } = useSelector((state) => state.wishlist);
    const token = useSelector((state) => state.wishlist.token);
    const cartToken = useSelector((state) => state.cart.token);
    const dispatch = useDispatch();
    const url = import.meta.env.VITE_API_BASE_URL || "https://green-basket-grocery-project.onrender.com";

    useEffect(() => { dispatch(fetchProductList()); }, [dispatch]);
    useEffect(() => { if (token) dispatch(fetchWishlist(token)); }, [dispatch, token]);

    const removeWish = (itemId) => {
        if (token) dispatch(removeFromWishlistAPI({ token, itemId }));
        else toast.error("Please log in to modify your wishlist.", { autoClose: 2000 });
    };

    const handleAddToCart = (itemId) => {
        if (cartToken) {
            dispatch(addToCartAPI({ itemId, token: cartToken }));
            toast.success('Product added to cart!', { autoClose: 2000 });
        } else {
            toast.error('Please log in to add items to the cart.', { autoClose: 2000 });
        }
    };

    const wishlistProducts = product_list.filter((item) => items[item._id] > 0);

    return (
        <div className="wl-page">

            {/* Banner */}
            <div className="wl-banner">
                <p className="wl-breadcrumb">Home › Wishlist</p>
                <h1 className="wl-banner-title">My Wishlist</h1>
                <p className="wl-banner-sub">
                    <FaHeart size={13} style={{ marginRight: 6 }} />
                    {wishlistProducts.length} saved item{wishlistProducts.length !== 1 ? 's' : ''}
                </p>
            </div>

            <div className="wl-container">
                {wishlistProducts.length === 0 ? (
                    <div className="wl-empty">
                        <img src={empty_img} alt="Empty Wishlist" className="wl-empty-img" />
                        <h3 className="wl-empty-title">Your wishlist is empty</h3>
                        <p className="wl-empty-sub">Save items you love and come back to them anytime.</p>
                        <Link to="/" className="wl-shop-btn">
                            Continue Shopping
                        </Link>
                    </div>
                ) : (
                    <div className="wl-grid">
                        {wishlistProducts.map((item) => {
                            const discount = item.price && item.sellingPrice
                                ? Math.round(((item.price - item.sellingPrice) / item.price) * 100)
                                : 0;
                            return (
                                <div key={item._id} className="wl-card">

                                    {/* Remove button */}
                                    <button className="wl-remove-btn" onClick={() => removeWish(item._id)} title="Remove from wishlist">
                                        <FaTrash size={11} />
                                    </button>

                                    {/* Discount badge */}
                                    {discount > 0 && (
                                        <span className="wl-discount-badge">-{discount}%</span>
                                    )}

                                    {/* Image */}
                                    <div className="wl-img-wrap">
                                        <img src={`${url}/uploads/${item.image}`} alt={item.name} className="wl-img" />
                                    </div>

                                    {/* Info */}
                                    <div className="wl-info">
                                        <h6 className="wl-name">{item.name}</h6>
                                        <div className="wl-price">
                                            {item.sellingPrice && item.price !== item.sellingPrice && (
                                                <del className="wl-original">₹{item.price}</del>
                                            )}
                                            <span className="wl-selling">₹{item.sellingPrice || item.price}</span>
                                            <span className="wl-unit">/ {item.unit}</span>
                                        </div>
                                        <button className="wl-cart-btn" onClick={() => handleAddToCart(item._id)}>
                                            <FaShoppingCart size={13} /> Add to Cart
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Wishlist;
