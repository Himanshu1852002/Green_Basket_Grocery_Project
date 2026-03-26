import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { FaHeart, FaRegHeart, FaSearch } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { addToWishlistAPI, removeFromWishlistAPI } from "../../../Store/wishlistSlice";
import { addToCartAPI } from "../../../Store/cartSlice";
import { toast } from 'react-toastify';
import { IoIosCart } from "react-icons/io";
import './SearchResults.css';

const BASE_URL = "https://green-basket-grocery-project.onrender.com";

const SkeletonCard = () => (
    <div className="sr-card sr-skeleton">
        <div className="sr-skeleton-img" />
        <div className="sr-skeleton-body">
            <div className="sr-skeleton-line sr-skeleton-title" />
            <div className="sr-skeleton-line sr-skeleton-price" />
            <div className="sr-skeleton-line sr-skeleton-btn" />
        </div>
    </div>
);

const SearchResults = () => {
    const [searchParams] = useSearchParams();
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const query = searchParams.get("q");

    const dispatch = useDispatch();
    const token = useSelector((state) => state.cart.token);
    const wishlist = useSelector((state) => state.wishlist.items);

    useEffect(() => {
        if (!query) return;
        setLoading(true);
        const timer = setTimeout(() => {
            axios
                .get(`${BASE_URL}/api/search/searchItem?q=${query}`)
                .then((res) => {
                    setResults(Array.isArray(res.data?.results) ? res.data.results : []);
                    setLoading(false);
                })
                .catch(() => setLoading(false));
        }, 400);
        return () => clearTimeout(timer);
    }, [query]);

    const toggleWishlist = (productId) => {
        if (!token) { toast.error('Please log in to manage your wishlist.', { autoClose: 2000 }); return; }
        if (wishlist[productId]) {
            dispatch(removeFromWishlistAPI({ token, itemId: productId }));
            toast.info('Removed from Wishlist', { autoClose: 2000 });
        } else {
            dispatch(addToWishlistAPI({ token, itemId: productId }));
            toast.success('Added to Wishlist', { autoClose: 2000 });
        }
    };

    const handleAddToCart = (productId) => {
        if (!token) { toast.error('Please log in to add items to the cart.', { autoClose: 2000 }); return; }
        dispatch(addToCartAPI({ itemId: productId, token }));
        toast.success('Added to cart!', { autoClose: 2000 });
    };

    const discount = (price, selling) => Math.round(((price - selling) / price) * 100);

    return (
        <div className="sr-page">

            {/* Header */}
            <div className="sr-header">
                <div className="sr-header-inner">
                    <div className="sr-search-icon-wrap">
                        <FaSearch size={22} color="#059212" />
                    </div>
                    <div>
                        <h2 className="sr-title">
                            Results for <span>&quot;{query}&quot;</span>
                        </h2>
                        {!loading && (
                            <p className="sr-count">
                                {results.length > 0
                                    ? `${results.length} product${results.length > 1 ? 's' : ''} found`
                                    : 'No products found'}
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="sr-content">

                {/* Loading skeletons */}
                {loading && (
                    <div className="sr-grid">
                        {Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}
                    </div>
                )}

                {/* Results grid */}
                {!loading && results.length > 0 && (
                    <div className="sr-grid">
                        {results.map((product) => {
                            const isWishlisted = !!wishlist[product._id];
                            const disc = discount(product.price, product.sellingPrice);
                            return (
                                <div key={product._id} className="sr-card">

                                    {/* Discount badge */}
                                    {disc > 0 && (
                                        <span className="sr-discount-badge">{disc}% OFF</span>
                                    )}

                                    {/* Wishlist */}
                                    <button
                                        className={`sr-wish-btn ${isWishlisted ? 'sr-wish-active' : ''}`}
                                        onClick={() => toggleWishlist(product._id)}
                                    >
                                        {isWishlisted ? <FaHeart size={15} /> : <FaRegHeart size={15} />}
                                    </button>

                                    {/* Image */}
                                    <div className="sr-img-wrap">
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="sr-img"
                                        />
                                    </div>

                                    {/* Info */}
                                    <div className="sr-info">
                                        <h5 className="sr-name">{product.name}</h5>
                                        <div className="sr-price-row">
                                            <span className="sr-selling">₹{product.sellingPrice}</span>
                                            <span className="sr-original">₹{product.price}</span>
                                            <span className="sr-unit">/ {product.unit}</span>
                                        </div>
                                        <button className="sr-cart-btn" onClick={() => handleAddToCart(product._id)}>
                                            <IoIosCart size={16} /> Add to Cart
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* Empty state */}
                {!loading && results.length === 0 && (
                    <div className="sr-empty">
                        <div className="sr-empty-icon">
                            <FaSearch size={36} color="#c8e6c9" />
                        </div>
                        <h3 className="sr-empty-title">No results for &quot;{query}&quot;</h3>
                        <p className="sr-empty-sub">Try searching with different keywords like fruits, vegetables, snacks etc.</p>
                    </div>
                )}

            </div>
        </div>
    );
};

export default SearchResults;
