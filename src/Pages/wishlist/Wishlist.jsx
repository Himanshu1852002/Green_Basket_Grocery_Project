import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './Wishlist.css';
import { fetchProductList, removeFromWishlistAPI, fetchWishlist } from '../../Store/wishlistSlice';
import empty_img from '../../assets/Images/Images/Empty Cart Icon.png';
import { useEffect } from 'react';

const Wishlist = () => {
    const { items, product_list } = useSelector((state) => state.wishlist);
    const token = useSelector((state) => state.wishlist.token);
    const dispatch = useDispatch();
    const url = "http://localhost:3000"


    useEffect(() => {
        dispatch(fetchProductList());
    }, [dispatch]);

    useEffect(() => {
        if (token) {
            dispatch(fetchWishlist(token))
        }
    }, [dispatch, token]);

    const removeWish = (itemId) => {
        if (token) {
            dispatch(removeFromWishlistAPI({ token, itemId }));
        } else {
            alert("Please log in to modify your wishlist.");
        }
    };
    const isWishlistEmpty = Object.keys(items).length === 0;

    if (isWishlistEmpty) {
        return (
            <div className="container text-center mt-5">
                <div className="row empty_wish_row d-flex justify-content-center align-items-center">
                    <div className="col-12">
                        <h2 className="fw-bold text-start ms-4 mt-5">YOUR WISHES</h2>
                        <hr />
                        <img src={empty_img} alt="Empty Wishlist" />
                        <h3 className="fw-bold">Your wishlist is empty</h3>
                        <Link to="/" className="btn mt-3 mb-5">
                            Continue Shopping
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container">
            <div className="row d-flex justify-content-center align-items-center wish_row">
                <div className="col-12">
                    <h2 className="fw-bold ms-4 mt-5">YOUR WISHES</h2>
                    <hr />
                </div>
            </div>
            <div className="row wishlist_row">
                {product_list.map((item) => (
                    items[item._id] > 0 && (
                        <div key={item._id} className="col-lg-3 col-md-4 col-sm-6 col-12 mt-3 mb-4 wishlist_columns">
                            <div className="card product_card">
                                <img src={`${url}/uploads/${item.image}`} className="card-img-top" alt={item.name || 'Product'} />
                                <div className="card-body d-flex flex-column justify-content-center align-items-center">
                                    <h5 className="card-title">{item.name || 'Unnamed Product'}</h5>
                                    <p className="card-text">{item.price || 'N/A'} - {item.unit || 'N/A'}</p>
                                    <button className="btn" onClick={() => removeWish(item._id)}>Remove</button>
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
