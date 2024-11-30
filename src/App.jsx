import { Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';
import Home from './Pages/Home/Home';
import Fruits from './Pages/Fruits/Fruits';
import Vegetables from './Pages/Vegetables/Vegetables';
import Drinks from './Pages/Drinks/Drinks';
import Snacks from './Pages/Snacks/Snacks';
import Chocolate from './Pages/Chocolate/Chocolate';
import Cart from './Pages/Cart/Cart';
import About from './Pages/About/About';
import Blog from './Pages/Blog/Blog';
import Contact from './Pages/Contact/Contact';
import Grocery from './Pages/Grocery/Grocery';
import Wishlist from './Pages/wishlist/wishlist';
import { useState } from 'react';
import LoginPopup from './Components/Login_Popup/LoginPopup';


function App() {

  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      {showLogin && <LoginPopup setShowLogin={setShowLogin} />}
      <div>
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/fruits' element={<Fruits />} />
          <Route path='/vegetables' element={<Vegetables />} />
          <Route path='/drinks' element={<Drinks />} />
          <Route path='/snacks' element={<Snacks />} />
          <Route path='/chocolates' element={<Chocolate />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/grocery' element={<Grocery />} />
          <Route path='/about' element={<About />} />
          <Route path='/blog' element={<Blog />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/wishlist' element={<Wishlist />} />
        </Routes>
      </div>
      <Footer />
    </>
  )
}

export default App