import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Home from './Pages/User/Home/Home';
import UserRoutes from './Routes/UserRoutes';
import AdminRoutes from './Routes/Admin/AdminRoutes';
import LoginPopup from './Components/User/Login_PopUp/LoginPopup';
import Navbar from './Components/User/Navbar/Navbar';
import AdminProtectedRoutes from './Shared/AdminProtectedRoutes';
import Footer from './Components/User/Footer/Footer';
import NotFound from './Pages/User/NotFound/NotFound';
import PageLoader from './Components/User/PageLoader/PageLoader';

const App = () => {

  const [showLogin, setShowLogin] = useState(false);
  const role = localStorage.getItem('role');

  useEffect(() => {
    document.body.style.overflow = showLogin ? 'hidden' : 'auto';
  }, [showLogin]);

  return (
    <>
      <PageLoader />
      {role !== 'admin' && <Navbar setShowLogin={setShowLogin} />}
      {showLogin && <LoginPopup setShowLogin={setShowLogin} />}
      <Routes>
        <Route path="/" element={<Home setShowLogin={setShowLogin} />} />
        <Route path="/login" element={<LoginPopup setShowLogin={setShowLogin} />} />
        <Route
          path="/admin/*"
          element={
            <AdminProtectedRoutes>
              <AdminRoutes />
            </AdminProtectedRoutes>
          }
        />
        <Route path="/user/*" element={<UserRoutes />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {role !== 'admin' && <Footer />}
    </>
  );
};

export default App;
