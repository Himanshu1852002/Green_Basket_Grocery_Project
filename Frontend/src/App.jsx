import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Home from './Pages/User/Home/Home';
import UserRoutes from './Routes/UserRoutes';
import AdminRoutes from './Routes/Admin/AdminRoutes';
import LoginPopup from './Components/User/Login_PopUp/LoginPopup';
import Navbar from './Components/User/Navbar/Navbar';
import AdminProtectedRoutes from './Shared/AdminProtectedRoutes';
import Footer from './Components/User/Footer/Footer';

const App = () => {

  const [showLogin, setShowLogin] = useState(false);
  const role = localStorage.getItem('role');

  useEffect(() => {
    document.body.style.overflow = showLogin ? 'hidden' : 'auto';
  }, [showLogin]);


  const getRoutes = () => {
    if (role === 'admin') {
      return (
        <Route
          path="/admin/*"
          element={
            <AdminProtectedRoutes>
              <AdminRoutes />
            </AdminProtectedRoutes>
          }
        />
      );
    } else {
      return (
        <Route
          path="/user/*"
          element={<UserRoutes />}
        />
      );
    }
  };

  return (
    <>
      {role !== 'admin' && <Navbar setShowLogin={setShowLogin} />}
      {showLogin && <LoginPopup setShowLogin={setShowLogin} />}
      <Routes>
        <Route path="/" element={<Home setShowLogin={setShowLogin} />} />
        <Route path="/login" element={<LoginPopup setShowLogin={setShowLogin} />} />
        {getRoutes()}
      </Routes>
      {role !== 'admin' && <Footer />}

    </>
  );
};

export default App;
