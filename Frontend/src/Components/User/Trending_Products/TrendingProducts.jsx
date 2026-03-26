import { useEffect, useState } from 'react';
import axios from 'axios';
import './TrendingProducts.css';
import { FaFire, FaShoppingCart, FaMedal, FaCheck } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { addToCartAPI } from '../../../Store/cartSlice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://green-basket-grocery-project.onrender.com';

const SkeletonCard = () => (
    <div className="tp-card tp-skeleton">
        <div className="tp-sk-img" />
        <div className="tp-sk-body">
            <div className="tp-sk-line tp-sk-title" />
            <div className="tp-sk-line tp-sk-price" />
            <div className="tp-sk-btn" />
        </div>
    </div>
);

const TrendingProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [addedId, setAddedId] = useState(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = useSelector(s => s.cart.token);
    const productList = useSelector(s => s.cart.product_list);

    useEffect(() => {
        axios.get(`${BASE_URL}/api/orders/trending`)
            .then(res => { if (res.data.success) setProducts(res.data.data); })
            .catch(() => {})
            .finally(() => setLoading(false));
    }, []);

    // Get full product data from productList using itemId
    const getProductData = (trendItem) => {
        if (trendItem.itemId) {
            const match = productList.find(p => p._id === trendItem.itemId);
            if (match) return match;
        }
        return productList.find(p => p.name === trendItem.name) || null;
    };

    const handleAddToCart = (trendItem) => {
        if (!token) {
            toast.error('Please log in to add items to cart', { autoClose: 2000 });
            return;
        }
        const product = getProductData(trendItem);
        if (!product) { toast.error('Product not found', { autoClose: 2000 }); return; }
        if (product.quantity === 0) { toast.error('This product is out of stock', { autoClose: 2000 }); return; }
        dispatch(addToCartAPI({ itemId: product._id, token }));
        toast.success(`${product.name} added to cart!`, { autoClose: 1500 });
        setAddedId(trendItem.name);
        setTimeout(() => setAddedId(null), 1500);
    };

    const getImage = (trendItem) => {
        const product = getProductData(trendItem);
        if (product?.image) return product.image.startsWith('http') ? product.image : `${BASE_URL}/uploads/${product.image}`;
        return `${BASE_URL}/uploads/${trendItem.image}`;
    };

    const getPrice = (trendItem) => {
        const product = getProductData(trendItem);
        return product?.sellingPrice || trendItem.price;
    };

    const isOutOfStock = (trendItem) => {
        const product = getProductData(trendItem);
        return product?.quantity === 0;
    };

    const medalColor = ['#FFD700', '#C0C0C0', '#CD7F32'];

    if (!loading && products.length === 0) return null;

    return (
        <section className="tp-section">
            <div className="tp-header">
                <span className="tp-tag"><FaFire size={12} /> Trending</span>
                <h2 className="tp-title">Most <span>Purchased</span> Products</h2>
                <p className="tp-sub">Top picks loved by our customers this week</p>
            </div>

            <div className="tp-grid">
                {loading
                    ? Array(8).fill(0).map((_, i) => <SkeletonCard key={i} />)
                    : products.map((product, i) => {
                        const oos = isOutOfStock(product);
                        const isAdded = addedId === product.name;
                        return (
                            <div
                                className={`tp-card${oos ? ' tp-oos' : ''}`}
                                key={i}
                                onClick={() => { const p = getProductData(product); if (p) navigate(`/user/product/${p._id}`); }}
                                style={{ cursor: 'pointer' }}
                            >
                                {/* Rank badge */}
                                {i < 3 && (
                                    <span className="tp-rank" style={{ background: medalColor[i] }}>
                                        <FaMedal size={10} /> #{i + 1}
                                    </span>
                                )}

                                {/* Sold / OOS badge */}
                                {oos
                                    ? <span className="tp-oos-badge">Out of Stock</span>
                                    : <span className="tp-sold">{product.totalSold} sold</span>
                                }

                                {/* Image */}
                                <div className="tp-img-wrap">
                                    <img
                                        src={getImage(product)}
                                        alt={product.name}
                                        className="tp-img"
                                        onError={e => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
                                    />
                                    <div className="tp-img-fallback">🛒</div>
                                </div>

                                {/* Info */}
                                <div className="tp-info">
                                    <h4 className="tp-name">{product.name}</h4>
                                    <p className="tp-price">₹{getPrice(product)}</p>
                                    <button
                                        className={`tp-btn${isAdded ? ' tp-btn-added' : ''}${oos ? ' tp-btn-oos' : ''}`}
                                        onClick={e => { e.stopPropagation(); handleAddToCart(product); }}
                                        disabled={oos}
                                    >
                                        {isAdded ? <><FaCheck size={12} /> Added!</> : <><FaShoppingCart size={12} /> {oos ? 'Out of Stock' : 'Add to Cart'}</>}
                                    </button>
                                </div>
                            </div>
                        );
                    })
                }
            </div>
        </section>
    );
};

export default TrendingProducts;
