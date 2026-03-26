import { Routes, Route } from 'react-router-dom';
import Fruits from '../Pages/User/Fruits/Fruits';
import Vegetables from '../Pages/User/Vegetables/Vegetables';
import Drinks from '../Pages/User/Drinks/Drinks';
import Snacks from '../Pages/User/Snacks/Snacks';
import Chocolate from '../Pages/User/Chocolate/Chocolate';
import About from '../Pages/User/About/About';
import Blog from '../Pages/User/Blog/Blog';
import Contact from '../Pages/User/Contact/Contact';
import Grocery from '../Pages/User/Grocery/Grocery';
import Checkout from '../Pages/User/Checkout/Checkout';
import Verify from '../Pages/User/Verify/Verify';
import SearchResults from '../Pages/User/SearchResults/SearchResults';
import MyOrders from '../Pages/User/MyOrders/MyOrders';
import Wishlist from '../Pages/User/Wishlist/Wishlist';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ScrollToTop from '../Pages/User/ScrollToTop/ScrollToTop';
import Home from '../Pages/User/Home/Home';
import PrivacyPolicy from '../Pages/User/PrivacyPolicy/PrivacyPolicy';
import TermsOfService from '../Pages/User/TermsOfService/TermsOfService';
import RefundPolicy from '../Pages/User/RefundPolicy/RefundPolicy';
import Profile from '../Pages/User/Profile/Profile';
import ProductDetail from '../Pages/User/ProductDetail/ProductDetail';
import UserProtectedRoute from '../Shared/UserProtectedRoute';

const UserRoutes = () => {
  return (
    <>
      <div>
        <ToastContainer position="top-center" autoClose={3000} />
        <ScrollToTop />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path="fruits" element={<Fruits />} />
          <Route path="vegetables" element={<Vegetables />} />
          <Route path="coldrinks" element={<Drinks />} />
          <Route path="snacks" element={<Snacks />} />
          <Route path="chocolates" element={<Chocolate />} />
          <Route path="grocery" element={<Grocery />} />
          <Route path="about" element={<About />} />
          <Route path="blog" element={<Blog />} />
          <Route path="contact" element={<Contact />} />
          <Route path="wishlist" element={<UserProtectedRoute><Wishlist /></UserProtectedRoute>} />
          <Route path="search" element={<SearchResults />} />
          <Route path="checkout" element={<UserProtectedRoute><Checkout /></UserProtectedRoute>} />
          <Route path="verify" element={<UserProtectedRoute><Verify /></UserProtectedRoute>} />
          <Route path="myorders" element={<UserProtectedRoute><MyOrders /></UserProtectedRoute>} />
          <Route path="privacy-policy" element={<PrivacyPolicy />} />
          <Route path="terms-of-service" element={<TermsOfService />} />
          <Route path="refund-policy" element={<RefundPolicy />} />
          <Route path="profile" element={<UserProtectedRoute><Profile /></UserProtectedRoute>} />
          <Route path="product/:id" element={<ProductDetail />} />
        </Routes>
      </div>
    </>
  )

};

export default UserRoutes;