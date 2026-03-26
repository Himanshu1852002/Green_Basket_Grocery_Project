import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import {
    FaShoppingCart, FaHeart, FaRegHeart, FaStar, FaRegStar, FaTruck,
    FaLeaf, FaArrowLeft, FaCheck, FaShieldAlt, FaUndo, FaTag
} from 'react-icons/fa';
import { MdLocalOffer, MdVerified } from 'react-icons/md';
import { addToCartAPI } from '../../../Store/cartSlice';
import { addToWishlistAPI, removeFromWishlistAPI } from '../../../Store/wishlistSlice';
import { toast } from 'react-toastify';
import './ProductDetail.css';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://green-basket-grocery-project.onrender.com';

const highlights = [
    { icon: <FaLeaf size={14} />, text: '100% Fresh & Natural' },
    { icon: <MdVerified size={14} />, text: 'Quality Verified' },
    { icon: <FaTruck size={14} />, text: 'Free Delivery above ₹200' },
    { icon: <FaUndo size={14} />, text: 'Easy Returns' },
    { icon: <FaShieldAlt size={14} />, text: 'Secure Payments' },
    { icon: <MdLocalOffer size={14} />, text: 'Best Price Guaranteed' },
];

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const token = useSelector(s => s.cart.token);
    const wishlist = useSelector(s => s.wishlist.items);
    const product_list = useSelector(s => s.cart.product_list);
    const cartItems = useSelector(s => s.cart.cartItems);

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [added, setAdded] = useState(false);
    const [qty, setQty] = useState(1);

    // Reviews state
    const [reviews, setReviews] = useState([]);
    const [reviewStats, setReviewStats] = useState({ avg: 0, total: 0 });
    const [canReview, setCanReview] = useState(false);
    const [existingReview, setExistingReview] = useState(null);
    const [reviewForm, setReviewForm] = useState({ rating: 5, comment: '' });
    const [reviewSubmitting, setReviewSubmitting] = useState(false);
    const [showReviewForm, setShowReviewForm] = useState(false);

    const isWishlisted = product ? !!wishlist[product._id] : false;
    const isOutOfStock = product?.quantity === 0;
    const cartQty = product ? (cartItems[product._id] || 0) : 0;

    const fetchReviews = async (productId) => {
        try {
            const res = await axios.get(`${BASE_URL}/api/reviews/product/${productId}`);
            if (res.data.success) {
                setReviews(res.data.reviews);
                setReviewStats({ avg: res.data.avg, total: res.data.total });
            }
        } catch { /* silent */ }
    };

    const checkCanReview = async (productId) => {
        if (!token) return;
        try {
            const res = await axios.post(`${BASE_URL}/api/reviews/canReview`,
                { productId }, { headers: { Authorization: `Bearer ${token}` } }
            );
            if (res.data.success) {
                setCanReview(res.data.canReview);
                setExistingReview(res.data.existing);
                if (res.data.existing) setReviewForm({ rating: res.data.existing.rating, comment: res.data.existing.comment });
            }
        } catch { /* silent */ }
    };

    useEffect(() => {
        const stored = product_list?.find(p => p._id === id);
        if (stored) {
            setProduct(stored);
            setLoading(false);
            fetchReviews(id);
            checkCanReview(id);
            return;
        }
        axios.get(`${BASE_URL}/api/product/list`)
            .then(res => {
                const found = res.data.data?.find(p => p._id === id) || null;
                setProduct(found);
                if (found) { fetchReviews(id); checkCanReview(id); }
            })
            .finally(() => setLoading(false));
    }, [id, product_list]);

    const handleAddToCart = () => {
        if (isOutOfStock) return;
        if (!token) { toast.error('Please log in to add items to the cart.', { autoClose: 2000 }); return; }
        for (let i = 0; i < qty; i++) dispatch(addToCartAPI({ itemId: product._id, token }));
        toast.success(`${qty} item(s) added to cart!`, { autoClose: 2000 });
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };

    const toggleWishlist = () => {
        if (!token) { toast.error('Please log in to manage your wishlist.', { autoClose: 2000 }); return; }
        if (isWishlisted) {
            dispatch(removeFromWishlistAPI({ token, itemId: product._id }));
            toast.info('Removed from Wishlist', { autoClose: 2000 });
        } else {
            dispatch(addToWishlistAPI({ token, itemId: product._id }));
            toast.success('Added to Wishlist', { autoClose: 2000 });
        }
    };

    const submitReview = async () => {
        if (!reviewForm.comment.trim()) { toast.error('Please write a comment'); return; }
        setReviewSubmitting(true);
        try {
            const res = await axios.post(`${BASE_URL}/api/reviews/add`,
                { productId: product._id, rating: reviewForm.rating, comment: reviewForm.comment },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            if (res.data.success) {
                toast.success(existingReview ? 'Review updated!' : 'Review submitted!', { autoClose: 2000 });
                setShowReviewForm(false);
                fetchReviews(product._id);
                checkCanReview(product._id);
            } else toast.error(res.data.message);
        } catch { toast.error('Failed to submit review'); }
        finally { setReviewSubmitting(false); }
    };

    if (loading) return <div className="pd-loading"><div className="pd-spinner" /></div>;
    if (!product) return (
        <div className="pd-not-found">
            <div className="pd-nf-icon">🔍</div>
            <h2>Product not found</h2>
            <button onClick={() => navigate(-1)}>← Go Back</button>
        </div>
    );

    const discount = product.price > product.sellingPrice
        ? Math.round(((product.price - product.sellingPrice) / product.price) * 100) : 0;

    return (
        <div className="pd-page">

            {/* Breadcrumb */}
            <div className="pd-breadcrumb-bar">
                <button className="pd-back-btn" onClick={() => navigate(-1)}><FaArrowLeft size={12} /> Back</button>
                <span className="pd-breadcrumb-text">Home › {product.category} › {product.name}</span>
            </div>

            <div className="pd-container">

                {/* ── Left: Image ── */}
                <div className="pd-left">
                    <div className="pd-img-wrap">
                        {isOutOfStock && <span className="pd-oos-badge">Out of Stock</span>}
                        {discount > 0 && !isOutOfStock && <span className="pd-discount-badge">{discount}% OFF</span>}
                        <img src={`${BASE_URL}/uploads/${product.image}`} alt={product.name} className="pd-img" />
                    </div>

                    {/* Highlights grid below image */}
                    <div className="pd-highlights">
                        {highlights.map((h, i) => (
                            <div key={i} className="pd-highlight-item">
                                <span className="pd-highlight-icon">{h.icon}</span>
                                <span>{h.text}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── Right: Info ── */}
                <div className="pd-right">

                    {/* Category + Name */}
                    <span className="pd-category-tag">{product.category}</span>
                    <h1 className="pd-name">{product.name}</h1>

                    {/* Stars */}
                    <div className="pd-stars-row">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <FaStar key={i} size={14} color={i < Math.round(reviewStats.avg) ? '#f59e0b' : '#e0e0e0'} />
                        ))}
                        <span className="pd-rating-text">{reviewStats.avg > 0 ? `${reviewStats.avg} · ${reviewStats.total} review${reviewStats.total !== 1 ? 's' : ''}` : 'No reviews yet'}</span>
                    </div>

                    {/* Price */}
                    <div className="pd-price-box">
                        <span className="pd-selling">₹{product.sellingPrice}</span>
                        {discount > 0 && (
                            <>
                                <del className="pd-original">₹{product.price}</del>
                                <span className="pd-save-tag"><FaTag size={10} /> Save ₹{product.price - product.sellingPrice} ({discount}% off)</span>
                            </>
                        )}
                        <span className="pd-unit">per {product.unit}</span>
                    </div>

                    {/* Stock */}
                    <div className="pd-stock-row">
                        {isOutOfStock
                            ? <span className="pd-stock-out">● Out of Stock</span>
                            : <span className="pd-stock-in">● In Stock <span className="pd-stock-count">({product.quantity} units available)</span></span>
                        }
                        {cartQty > 0 && <span className="pd-in-cart">🛒 {cartQty} in cart</span>}
                    </div>

                    {/* Description */}
                    <div className="pd-desc-box">
                        <h4 className="pd-desc-title">About this product</h4>
                        <p className="pd-desc">{product.description}</p>
                    </div>

                    {/* Product Info Table */}
                    <div className="pd-info-table">
                        <div className="pd-info-row"><span>Category</span><span>{product.category}</span></div>
                        <div className="pd-info-row"><span>Unit</span><span>{product.unit}</span></div>
                        <div className="pd-info-row"><span>MRP</span><span>₹{product.price}</span></div>
                        <div className="pd-info-row"><span>Selling Price</span><span>₹{product.sellingPrice}</span></div>
                        <div className="pd-info-row"><span>Availability</span><span>{isOutOfStock ? 'Out of Stock' : 'In Stock'}</span></div>
                    </div>

                    {/* Qty selector + Actions */}
                    {!isOutOfStock && (
                        <div className="pd-qty-row">
                            <span className="pd-qty-label">Qty:</span>
                            <div className="pd-qty-ctrl">
                                <button onClick={() => setQty(q => Math.max(1, q - 1))}>−</button>
                                <span>{qty}</span>
                                <button onClick={() => setQty(q => Math.min(product.quantity, q + 1))}>+</button>
                            </div>
                        </div>
                    )}

                    <div className="pd-actions">
                        <button
                            className={`pd-cart-btn${isOutOfStock ? ' pd-oos' : ''}${added ? ' pd-added' : ''}`}
                            onClick={handleAddToCart}
                            disabled={isOutOfStock}
                        >
                            {added
                                ? <><FaCheck size={14} /> Added to Cart!</>
                                : isOutOfStock
                                    ? 'Out of Stock'
                                    : <><FaShoppingCart size={14} /> Add to Cart</>
                            }
                        </button>
                        <button className={`pd-wish-btn${isWishlisted ? ' pd-wishlisted' : ''}`} onClick={toggleWishlist} title="Wishlist">
                            {isWishlisted ? <FaHeart size={18} /> : <FaRegHeart size={18} />}
                        </button>
                    </div>

                    {/* Delivery info */}
                    <div className="pd-delivery-info">
                        <div className="pd-delivery-item"><FaTruck size={13} /> Free delivery on orders above ₹200</div>
                        <div className="pd-delivery-item"><FaUndo size={13} /> Easy 24-hour return policy</div>
                        <div className="pd-delivery-item"><FaShieldAlt size={13} /> 100% secure & safe checkout</div>
                    </div>
                </div>
            </div>

            {/* ── Reviews Section ── */}
            <div className="pd-reviews-section">
                <div className="pd-reviews-header">
                    <h3 className="pd-reviews-title">Customer Reviews</h3>
                    {reviewStats.total > 0 && (
                        <div className="pd-reviews-avg">
                            <span className="pd-avg-num">{reviewStats.avg}</span>
                            <div className="pd-avg-stars">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <FaStar key={i} size={16} color={i < Math.round(reviewStats.avg) ? '#f59e0b' : '#e0e0e0'} />
                                ))}
                            </div>
                            <span className="pd-avg-total">({reviewStats.total} reviews)</span>
                        </div>
                    )}
                    {canReview && (
                        <button className="pd-write-review-btn" onClick={() => setShowReviewForm(p => !p)}>
                            {existingReview ? '✏️ Edit Your Review' : '⭐ Write a Review'}
                        </button>
                    )}
                </div>

                {/* Review Form */}
                {showReviewForm && canReview && (
                    <div className="pd-review-form">
                        <p className="pd-review-form-title">{existingReview ? 'Update Your Review' : 'Write a Review'}</p>
                        <div className="pd-star-select">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <button key={i} className="pd-star-btn" onClick={() => setReviewForm(p => ({ ...p, rating: i + 1 }))}>
                                    {i < reviewForm.rating
                                        ? <FaStar size={24} color="#f59e0b" />
                                        : <FaRegStar size={24} color="#e0e0e0" />}
                                </button>
                            ))}
                            <span className="pd-star-label">{reviewForm.rating}/5</span>
                        </div>
                        <textarea
                            className="pd-review-textarea"
                            rows={3}
                            placeholder="Share your experience with this product..."
                            value={reviewForm.comment}
                            onChange={e => setReviewForm(p => ({ ...p, comment: e.target.value }))}
                        />
                        <div className="pd-review-form-actions">
                            <button className="pd-review-submit" onClick={submitReview} disabled={reviewSubmitting}>
                                {reviewSubmitting ? 'Submitting...' : existingReview ? 'Update Review' : 'Submit Review'}
                            </button>
                            <button className="pd-review-cancel" onClick={() => setShowReviewForm(false)}>Cancel</button>
                        </div>
                    </div>
                )}

                {/* Reviews List */}
                {reviews.length === 0 ? (
                    <p className="pd-no-reviews">No reviews yet. Be the first to review this product!</p>
                ) : (
                    <div className="pd-reviews-list">
                        {reviews.map(r => (
                            <div key={r._id} className="pd-review-card">
                                <div className="pd-review-top">
                                    <div className="pd-reviewer-avatar">{r.userName?.charAt(0).toUpperCase()}</div>
                                    <div>
                                        <p className="pd-reviewer-name">{r.userName}</p>
                                        <div className="pd-review-stars">
                                            {Array.from({ length: 5 }).map((_, i) => (
                                                <FaStar key={i} size={12} color={i < r.rating ? '#f59e0b' : '#e0e0e0'} />
                                            ))}
                                        </div>
                                    </div>
                                    <span className="pd-review-date">{new Date(r.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                                </div>
                                <p className="pd-review-comment">{r.comment}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductDetail;
