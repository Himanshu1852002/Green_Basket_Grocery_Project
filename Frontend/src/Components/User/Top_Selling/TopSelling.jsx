import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addToCartAPI } from '../../../Store/cartSlice';
import { addToWishlistAPI, removeFromWishlistAPI } from '../../../Store/wishlistSlice';
import { toast } from 'react-toastify';
import { FaShoppingCart, FaCheck, FaHeart, FaRegHeart, FaStar, FaChevronRight, FaFire } from 'react-icons/fa';
import './TopSelling.css';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://green-basket-grocery-project.onrender.com';

// Smart badge
const getSmartBadge = (product, index) => {
    const disc = product.price > product.sellingPrice
        ? Math.round(((product.price - product.sellingPrice) / product.price) * 100) : 0;
    if (product.quantity === 0) return null;
    if (disc >= 30) return { label: '🔥 Hot Deal', cls: 'ts-smart-hot' };
    if (['Fruits', 'Vegetables'].includes(product.category)) return { label: '🌿 Organic', cls: 'ts-smart-organic' };
    if (index < 2) return { label: '⭐ Best Seller', cls: 'ts-smart-best' };
    if (product.sellingPrice <= 30) return { label: '💰 Budget Pick', cls: 'ts-smart-budget' };
    return null;
};

// Stock urgency
const getUrgency = (qty) => {
    if (qty === 0 || qty > 10) return null;
    if (qty <= 3) return { label: `⚠️ Only ${qty} left!`, cls: 'ts-urg-low' };
    return { label: `🕐 Only ${qty} left`, cls: 'ts-urg-mid' };
};

const CATEGORIES = [
    { key: 'Fruits',     label: '🍎 Fruits',      color: '#ff6b35', bg: '#fff4f0' },
    { key: 'Vegetables', label: '🥦 Vegetables',   color: '#059212', bg: '#f0faf0' },
    { key: 'Chocolates', label: '🍫 Chocolates',   color: '#6d4c41', bg: '#fdf4f0' },
    { key: 'Snacks',     label: '🍿 Snacks',       color: '#f59e0b', bg: '#fffbeb' },
    { key: 'Coldrinks',  label: '🥤 Cold Drinks',  color: '#3b82f6', bg: '#eff6ff' },
    { key: 'Grocery',    label: '🛒 Grocery',      color: '#8b5cf6', bg: '#f5f3ff' },
];

const ProductCard = ({ product, accentColor, cardBg, index }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = useSelector(s => s.cart.token);
    const cartItems = useSelector(s => s.cart.cartItems);
    const wishlist = useSelector(s => s.wishlist.items);
    const [added, setAdded] = useState(false);

    const isWishlisted = !!wishlist[product._id];
    const isOutOfStock = product.quantity === 0;
    const cartQty = cartItems[product._id] || 0;
    const discount = product.price > product.sellingPrice
        ? Math.round(((product.price - product.sellingPrice) / product.price) * 100) : 0;
    const smartBadge = getSmartBadge(product, index || 0);
    const urgency = getUrgency(product.quantity);

    const handleAddToCart = (e) => {
        e.stopPropagation();
        if (isOutOfStock) return;
        if (!token) { toast.error('Please log in to add items to the cart.', { autoClose: 2000 }); return; }
        dispatch(addToCartAPI({ itemId: product._id, token }));
        toast.success('Added to cart!', { autoClose: 1500 });
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };

    const handleWishlist = (e) => {
        e.stopPropagation();
        if (!token) { toast.error('Please log in.', { autoClose: 2000 }); return; }
        if (isWishlisted) {
            dispatch(removeFromWishlistAPI({ token, itemId: product._id }));
            toast.info('Removed from Wishlist', { autoClose: 1500 });
        } else {
            dispatch(addToWishlistAPI({ token, itemId: product._id }));
            toast.success('Added to Wishlist', { autoClose: 1500 });
        }
    };

    return (
        <div className="ts-card" style={{ '--accent': accentColor, '--card-bg': cardBg }}
            onClick={() => navigate(`/user/product/${product._id}`)}>

            {/* Badges */}
            <div className="ts-badges">
                {isOutOfStock
                    ? <span className="ts-badge ts-oos">Out of Stock</span>
                    : discount > 0
                        ? <span className="ts-badge ts-discount">{discount}% OFF</span>
                        : smartBadge && <span className={`ts-badge ${smartBadge.cls}`}>{smartBadge.label}</span>
                }
            </div>

            {/* Wishlist */}
            <button className={`ts-wish ${isWishlisted ? 'ts-wishlisted' : ''}`} onClick={handleWishlist}>
                {isWishlisted ? <FaHeart size={13} /> : <FaRegHeart size={13} />}
            </button>

            {/* Image */}
            <div className="ts-img-wrap">
                <img src={`${BASE_URL}/uploads/${product.image}`} alt={product.name} className="ts-img" />
            </div>

            {/* Info */}
            <div className="ts-info">
                <div className="ts-stars">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <FaStar key={i} size={9} color={i < 4 ? '#f59e0b' : '#e0e0e0'} />
                    ))}
                </div>
                <h6 className="ts-name">{product.name}</h6>
                <div className="ts-price-row">
                    <span className="ts-selling" style={{ color: accentColor }}>₹{product.sellingPrice}</span>
                    {discount > 0 && <del className="ts-original">₹{product.price}</del>}
                    <span className="ts-unit">/{product.unit}</span>
                </div>
                {urgency && !isOutOfStock && (
                    <span className={`ts-urgency ${urgency.cls}`}>{urgency.label}</span>
                )}

                {/* Cart controls */}
                {cartQty > 0 ? (
                    <div className="ts-qty-ctrl" style={{ borderColor: accentColor }}>
                        <button onClick={(e) => { e.stopPropagation(); dispatch(addToCartAPI({ itemId: product._id, token })); }}
                            style={{ color: accentColor }}>+</button>
                        <span>{cartQty}</span>
                        <button onClick={(e) => { e.stopPropagation(); dispatch(addToCartAPI({ itemId: product._id, token })); }}
                            style={{ color: accentColor }}>−</button>
                    </div>
                ) : (
                    <button
                        className={`ts-cart-btn${isOutOfStock ? ' ts-oos-btn' : ''}${added ? ' ts-added' : ''}`}
                        style={!isOutOfStock ? { background: accentColor } : {}}
                        onClick={handleAddToCart}
                        disabled={isOutOfStock}
                    >
                        {added
                            ? <><FaCheck size={10} /> Added!</>
                            : isOutOfStock
                                ? 'Out of Stock'
                                : <><FaShoppingCart size={10} /> Add to Cart</>
                        }
                    </button>
                )}
            </div>
        </div>
    );
};

const TopSelling = () => {
    const product_list = useSelector(s => s.cart.product_list);
    const [activeTab, setActiveTab] = useState('Fruits');
    const navigate = useNavigate();

    const activeCat = CATEGORIES.find(c => c.key === activeTab);

    // Get first 4 products of active category
    const products = product_list
        .filter(p => p.category === activeTab)
        .slice(0, 4);

    const skeletons = Array.from({ length: 4 });

    return (
        <section className="ts-section">
            {/* Header */}
            <div className="ts-header">
                <div className="ts-header-left">
                    <span className="ts-tag"><FaFire size={12} /> Top Selling</span>
                    <h2 className="ts-title">Best <span>Sellers</span></h2>
                    <p className="ts-sub">Most loved products across all categories</p>
                </div>
                <button className="ts-view-all" onClick={() => navigate(`/user/${activeTab.toLowerCase()}`)}>
                    View All <FaChevronRight size={11} />
                </button>
            </div>

            {/* Category Tabs */}
            <div className="ts-tabs">
                {CATEGORIES.map(cat => (
                    <button
                        key={cat.key}
                        className={`ts-tab ${activeTab === cat.key ? 'ts-tab-active' : ''}`}
                        style={activeTab === cat.key ? { background: cat.color, borderColor: cat.color } : {}}
                        onClick={() => setActiveTab(cat.key)}
                    >
                        {cat.label}
                    </button>
                ))}
            </div>

            {/* Products Grid */}
            <div className="ts-grid">
                {products.length > 0
                    ? products.map((p, i) => (
                        <ProductCard
                            key={p._id}
                            product={p}
                            accentColor={activeCat.color}
                            cardBg={activeCat.bg}
                            index={i}
                        />
                    ))
                    : skeletons.map((_, i) => (
                        <div key={i} className="ts-skeleton">
                            <div className="ts-sk-img" />
                            <div className="ts-sk-body">
                                <div className="ts-sk-line ts-sk-name" />
                                <div className="ts-sk-line ts-sk-price" />
                                <div className="ts-sk-line ts-sk-btn" />
                            </div>
                        </div>
                    ))
                }
            </div>
        </section>
    );
};

export default TopSelling;
