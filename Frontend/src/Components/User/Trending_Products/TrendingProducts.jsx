import { useEffect, useState } from 'react';
import axios from 'axios';
import './TrendingProducts.css';
import { FaFire, FaShoppingCart, FaMedal } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { addToCartAPI } from '../../../Store/cartSlice';

const BASE_URL = 'https://green-basket-grocery-project.onrender.com';

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
    const token = useSelector(s => s.cart.token);
    const productList = useSelector(s => s.cart.product_list);

    useEffect(() => {
        axios.get(`${BASE_URL}/api/orders/trending`)
            .then(res => {
                if (res.data.success) setProducts(res.data.data);
            })
            .catch(() => {})
            .finally(() => setLoading(false));
    }, []);

    const handleAddToCart = (productName) => {
        // Match by name from product_list to get _id
        const match = productList.find(p => p.name === productName);
        if (!match) return;
        dispatch(addToCartAPI({ itemId: match._id, token }));
        setAddedId(productName);
        setTimeout(() => setAddedId(null), 1200);
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
                    : products.map((product, i) => (
                        <div className="tp-card" key={i}>
                            {/* Rank badge */}
                            {i < 3 && (
                                <span className="tp-rank" style={{ background: medalColor[i] }}>
                                    <FaMedal size={10} /> #{i + 1}
                                </span>
                            )}

                            {/* Sold badge */}
                            <span className="tp-sold">{product.totalSold} sold</span>

                            {/* Image */}
                            <div className="tp-img-wrap">
                                <img
                                    src={`${BASE_URL}/images/${product.image}`}
                                    alt={product.name}
                                    className="tp-img"
                                    onError={e => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
                                />
                                <div className="tp-img-fallback">🛒</div>
                            </div>

                            {/* Info */}
                            <div className="tp-info">
                                <h4 className="tp-name">{product.name}</h4>
                                <p className="tp-price">₹{product.price}</p>
                                <button
                                    className={`tp-btn ${addedId === product.name ? 'tp-btn-added' : ''}`}
                                    onClick={() => handleAddToCart(product.name)}
                                >
                                    <FaShoppingCart size={12} />
                                    {addedId === product.name ? 'Added!' : 'Add to Cart'}
                                </button>
                            </div>
                        </div>
                    ))
                }
            </div>
        </section>
    );
};

export default TrendingProducts;
