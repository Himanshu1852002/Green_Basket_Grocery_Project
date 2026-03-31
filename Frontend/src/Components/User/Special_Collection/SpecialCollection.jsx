import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaHeart, FaRegHeart, FaShoppingCart, FaCheck } from 'react-icons/fa';
import { addToCartAPI } from '../../../Store/cartSlice';
import { addToWishlistAPI, removeFromWishlistAPI } from '../../../Store/wishlistSlice';
import { toast } from 'react-toastify';
import './SpecialCollection.css';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://green-basket-grocery-project-1.onrender.com';

const SpecialCollection = () => {
    const [collections, setCollections] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = useSelector(s => s.cart.token);
    const wishlist = useSelector(s => s.wishlist.items);

    useEffect(() => {
        axios.get(`${BASE_URL}/api/special-collections/active`)
            .then(res => { if (res.data.success) setCollections(res.data.data); })
            .catch(() => {});
    }, []);

    if (collections.length === 0) return null;

    return (
        <>
            {collections.map(col => (
                <CollectionSection key={col._id} col={col} token={token} wishlist={wishlist} dispatch={dispatch} navigate={navigate} />
            ))}
        </>
    );
};

const CollectionSection = ({ col, token, wishlist, dispatch, navigate }) => (
    <section className="spc-section" style={{ background: col.bgColor }}>
        <div className="spc-inner">
            <div className="spc-header">
                <div className="spc-tag-row">
                    {col.tag && <span className="spc-tag" style={{ color: col.accentColor, borderColor: col.accentColor }}>{col.tag}</span>}
                    <span className="spc-live"><span className="spc-live-dot" />Limited Time Special</span>
                </div>
                <h2 className="spc-title" style={{ color: col.accentColor }}>{col.title}</h2>
                {col.subtitle && <p className="spc-sub">{col.subtitle}</p>}
            </div>
            <div className="spc-grid">
                {col.products.slice(0, 4).map((product, i) => (
                    <ProductCard key={product._id} product={product} accentColor={col.accentColor} token={token} wishlist={wishlist} dispatch={dispatch} navigate={navigate} index={i} />
                ))}
            </div>
        </div>
    </section>
);

const ProductCard = ({ product, accentColor, token, wishlist, dispatch, navigate }) => {
    const [added, setAdded] = useState(false);
    const isWishlisted = !!wishlist[product._id];
    const isOutOfStock = product.quantity === 0;
    const discount = product.price > product.sellingPrice
        ? Math.round(((product.price - product.sellingPrice) / product.price) * 100) : 0;

    const handleCart = (e) => {
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
        <div className="spc-card" onClick={() => navigate(`/user/product/${product._id}`)}>
            {discount > 0 && <span className="spc-discount" style={{ background: accentColor }}>{discount}% OFF</span>}
            <button className={`spc-wish ${isWishlisted ? 'spc-wishlisted' : ''}`} onClick={handleWishlist}>
                {isWishlisted ? <FaHeart size={13} color="#e53935" /> : <FaRegHeart size={13} />}
            </button>
            <div className="spc-img-wrap">
                <img src={product.image} alt={product.name} className="spc-img" />
            </div>
            <div className="spc-info">
                <h6 className="spc-name">{product.name}</h6>
                <div className="spc-price-row">
                    <span className="spc-selling" style={{ color: accentColor }}>₹{product.sellingPrice}</span>
                    {discount > 0 && <del className="spc-original">₹{product.price}</del>}
                    <span className="spc-unit">/{product.unit}</span>
                </div>
                <button
                    className={`spc-cart-btn${added ? ' spc-added' : ''}${isOutOfStock ? ' spc-oos' : ''}`}
                    style={!isOutOfStock && !added ? { background: accentColor } : {}}
                    onClick={handleCart}
                    disabled={isOutOfStock}
                >
                    {isOutOfStock ? 'Out of Stock' : added ? <><FaCheck size={11} /> Added!</> : <><FaShoppingCart size={11} /> Add to Cart</>}
                </button>
            </div>
        </div>
    );
};

export default SpecialCollection;
