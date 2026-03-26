import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './PageLoader.css';

const PageLoader = () => {
    const location = useLocation();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => setLoading(false), 800);
        return () => clearTimeout(timer);
    }, [location.pathname]);

    if (!loading) return null;

    return (
        <div className="pgl-overlay">
            <div className="pgl-box">

                {/* Animated basket */}
                <div className="pgl-basket-wrap">
                    <div className="pgl-basket-bounce">
                        <svg width="56" height="56" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4 12h20l-2.5 10H6.5L4 12z" fill="#059212" />
                            <path d="M7 12l1.5 10M14 12v10M21 12l-1.5 10" stroke="#1a4d2e" strokeWidth="0.8" strokeOpacity="0.5"/>
                            <path d="M5.5 17h17M5 14.5h18" stroke="#1a4d2e" strokeWidth="0.8" strokeOpacity="0.3"/>
                            <path d="M9 12 Q9 6 14 6 Q19 6 19 12" stroke="#1a4d2e" strokeWidth="2" fill="none" strokeLinecap="round"/>
                            <path d="M14 6 Q16 3 19 4 Q17 7 14 6Z" fill="#4caf50"/>
                        </svg>
                    </div>
                    {/* Shadow under basket */}
                    <div className="pgl-shadow" />
                </div>

                {/* Brand name */}
                <p className="pgl-brand">
                    <span className="pgl-green">Green</span>
                    <span className="pgl-dark">Basket</span>
                </p>

                {/* Animated dots */}
                <div className="pgl-dots">
                    <span className="pgl-dot" />
                    <span className="pgl-dot" />
                    <span className="pgl-dot" />
                </div>
            </div>
        </div>
    );
};

export default PageLoader;
