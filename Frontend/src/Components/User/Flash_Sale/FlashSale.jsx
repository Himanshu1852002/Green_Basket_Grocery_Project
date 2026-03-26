import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBolt, FaArrowRight } from 'react-icons/fa';
import './FlashSale.css';

// Set sale end time — 24 hours from now on first load
const getSaleEndTime = () => {
    const stored = localStorage.getItem('flashSaleEnd');
    if (stored && Number(stored) > Date.now()) return Number(stored);
    const end = Date.now() + 24 * 60 * 60 * 1000;
    localStorage.setItem('flashSaleEnd', end);
    return end;
};

const pad = (n) => String(n).padStart(2, '0');

const FlashSale = () => {
    const navigate = useNavigate();
    const [timeLeft, setTimeLeft] = useState({ h: '00', m: '00', s: '00' });
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const endTime = getSaleEndTime();

        const tick = () => {
            const diff = endTime - Date.now();
            if (diff <= 0) {
                setTimeLeft({ h: '00', m: '00', s: '00' });
                return;
            }
            const h = Math.floor(diff / 3600000);
            const m = Math.floor((diff % 3600000) / 60000);
            const s = Math.floor((diff % 60000) / 1000);
            setTimeLeft({ h: pad(h), m: pad(m), s: pad(s) });
        };

        tick();
        const id = setInterval(tick, 1000);
        return () => clearInterval(id);
    }, []);

    if (!visible) return null;

    return (
        <div className="fs-wrap">
            <div className="fs-banner">

                {/* Left */}
                <div className="fs-left">
                    <div className="fs-bolt-wrap">
                        <FaBolt size={20} />
                    </div>
                    <div>
                        <p className="fs-label">⚡ Flash Sale</p>
                        <h3 className="fs-title">Up to <span>50% OFF</span> on Fresh Groceries!</h3>
                        <p className="fs-sub">Limited time offer — grab your favourites before it ends</p>
                    </div>
                </div>

                {/* Center — Countdown */}
                <div className="fs-countdown">
                    <p className="fs-ends-in">Ends in</p>
                    <div className="fs-timer">
                        <div className="fs-time-block">
                            <span className="fs-num">{timeLeft.h}</span>
                            <span className="fs-unit">HRS</span>
                        </div>
                        <span className="fs-colon">:</span>
                        <div className="fs-time-block">
                            <span className="fs-num">{timeLeft.m}</span>
                            <span className="fs-unit">MIN</span>
                        </div>
                        <span className="fs-colon">:</span>
                        <div className="fs-time-block">
                            <span className="fs-num">{timeLeft.s}</span>
                            <span className="fs-unit">SEC</span>
                        </div>
                    </div>
                </div>

                {/* Right */}
                <div className="fs-right">
                    <button className="fs-shop-btn" onClick={() => navigate('/user/fruits')}>
                        Shop Now <FaArrowRight size={13} />
                    </button>
                    <button className="fs-close" onClick={() => setVisible(false)}>✕</button>
                </div>

                {/* Decorative blobs */}
                <div className="fs-blob fs-blob-1" />
                <div className="fs-blob fs-blob-2" />
            </div>
        </div>
    );
};

export default FlashSale;
