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
import Footer from '../Components/User/Footer/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ScrollToTop from '../Pages/User/ScrollToTop/ScrollToTop';


const UserRoutes = () => {

  return (
    <>
      <div>
        <ToastContainer position="top-center" autoClose={3000} />
        <ScrollToTop/>
        <Routes>
          <Route path="fruits" element={<Fruits />} />
          <Route path="vegetables" element={<Vegetables />} />
          <Route path="coldrinks" element={<Drinks />} />
          <Route path="snacks" element={<Snacks />} />
          <Route path="chocolates" element={<Chocolate />} />
          <Route path="grocery" element={<Grocery />} />
          <Route path="about" element={<About />} />
          <Route path="blog" element={<Blog />} />
          <Route path="contact" element={<Contact />} />
          <Route path="wishlist" element={<Wishlist />} />
          <Route path="search" element={<SearchResults />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="verify" element={<Verify />} />
          <Route path="myorders" element={<MyOrders />} />
        </Routes>
        <Footer />
      </div>
    </>
  )

};

export default UserRoutes;
