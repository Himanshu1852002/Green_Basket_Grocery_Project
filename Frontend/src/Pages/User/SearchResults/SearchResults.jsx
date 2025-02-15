import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { addToWishlistAPI, removeFromWishlistAPI } from "../../../Store/wishlistSlice";
import { addToCartAPI } from "../../../Store/cartSlice";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './SearchResults.css'

const SearchResults = () => {
    const [searchParams] = useSearchParams();
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const query = searchParams.get("q");
    const url = import.meta.env.REACT_APP_API_BASE_URL;
    console.log(query)
    useEffect(() => {
        if (query) {
            setLoading(true);
            axios
                .get(`${url}/api/search/searchItem?q=${query}`)
                .then((response) => {
                    console.log('API Response:', response.data);
                    if (response.data && Array.isArray(response.data.results)) {
                        setResults(response.data.results);
                    } else {
                        setResults([]);
                    }
                    setLoading(false);
                })
                .catch((error) => {
                    console.error("Error fetching search results:", error);
                    setLoading(false);
                });
        }
    }, [query]);

    const dispatch = useDispatch();
    const token = useSelector((state) => state.cart.token);
    const wishlist = useSelector((state) => state.wishlist.items);

    const toggleWishlist = (productId) => {
        if (!token) {
            toast.error('Please log in to manage your wishlist.', { autoClose: 2000 });
            return;
        }

        const isWishlisted = wishlist[productId] !== undefined;

        if (isWishlisted) {
            dispatch(removeFromWishlistAPI({ token, itemId: productId }));
            toast.info('Removed from Wishlist', { autoClose: 2000 });
        } else {
            dispatch(addToWishlistAPI({ token, itemId: productId }));
            toast.success('Added to Wishlist', { autoClose: 2000 });
        }
    };

    const handleAddToCart = (productId) => {
        if (token) {
            dispatch(addToCartAPI({ itemId: productId, token }));
            toast.success('Product added to cart!', { autoClose: 2000 });
        } else {
            toast.error('Please log in to add items to the cart.', { autoClose: 2000 });
        }
    };
    console.log('Results Length:', results.length);
    return (
        <div className="container product_container">
            <h3 >Search Results for {query}</h3>
            <hr className="mb-5 fs-2" />
            {loading ? (
                <p>Loading...</p>
            ) : Array.isArray(results) && results.length > 0 ? (
                    <div className="row product_row">
                    {results.map((product) => {
                        return (
                            <div key={product._id} className="col-12 col-lg-4 col-md-6 mb-3">
                                <div className="card search_card position-relative">
                                    <img src={product.image} className="card-img-top" alt={product.name} />
                                    <span
                                        className="wishlist-icon position-absolute top-0 end-0 p-2"
                                        onClick={() => toggleWishlist(product._id)}
                                    >
                                        {wishlist[product._id] ? (
                                            <FaHeart className="text-danger" />
                                        ) : (
                                            <FaRegHeart className="text-dark" />
                                        )}
                                    </span>
                                    <div className="card-body product_card_body">
                                        <h5 className="card-title">{product.name}</h5>
                                        <p className="card-text"><del className="text-muted">&#8377;{product.price}</del>-&#8377;{product.sellingPrice} /{product.unit}</p>
                                        <button className="btn btn-success" onClick={() => handleAddToCart(product._id)}>
                                            Add to cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            ) : (
                <p>No products found.</p>
            )}
        </div>
    );
};

export default SearchResults;
