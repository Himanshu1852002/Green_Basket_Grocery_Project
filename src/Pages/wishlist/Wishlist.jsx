import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './Wishlist.css'
import { removeFromWishlist } from '../../Store/wishlistSlice';
import empty_img from '../../assets/Images/Images/Empty Cart Icon.png'

const Wishlist = () => {
    // Access the wishlist items from the Redux store
    const wishlistItems = useSelector((state) => state.wishlist.items);

    const dispatch = useDispatch();

    const removeWish = (item_id) => {
        dispatch(removeFromWishlist(item_id))
    }

    if (wishlistItems.length === 0) {
        return (
            <div className="container text-center mt-5">
                <div className="row empty_wish_row d-flex justify-content-center align-items-center">
                    <div className="col-12">
                        <h2 className="fw-bold text-start ms-4 mt-5">YOUR WISHES</h2>
                        <hr />
                        <img src={empty_img} />
                        <h3 className='fw-bold'>Your wishlist is empty</h3>
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
            <div className="row">
                {wishlistItems.map((item) => (
                    <div key={item.item_id} className="col-lg-3 col-md-4 col-sm-6 col-12 mt-3 mb-4">
                        <div className="card product_card">
                            <img src={item.imageSrc} className="card-img-top" alt={item.title} />
                            <div className="card-body">
                                <h5 className="card-title">{item.title}</h5>
                                <p className="card-text">{item.price} - rs</p>
                                <button className='btn' onClick={() => removeWish(item.item_id)}>Remove</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Wishlist;
