import { useState } from 'react';
import { FaEnvelope, FaCheck, FaGift } from 'react-icons/fa';
import './Newsletter.css';

const Newsletter = () => {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email.trim()) { setError('Please enter your email.'); return; }
        if (!/\S+@\S+\.\S+/.test(email)) { setError('Please enter a valid email.'); return; }
        setError('');
        setSubmitted(true);
    };

    return (
        <section className="nl-section">
            <div className="nl-inner">

                {/* Left */}
                <div className="nl-left">
                    <div className="nl-gift-icon"><FaGift size={28} /></div>
                    <div>
                        <span className="nl-tag">🎁 Exclusive Offer</span>
                        <h2 className="nl-title">Get <span>10% OFF</span> Your First Order!</h2>
                        <p className="nl-sub">Subscribe to our newsletter and receive exclusive deals, fresh arrivals & seasonal offers directly in your inbox.</p>
                        <div className="nl-perks">
                            {['Weekly fresh deals', 'Exclusive discount codes', 'New arrivals first'].map((p, i) => (
                                <span key={i} className="nl-perk"><FaCheck size={10} /> {p}</span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right */}
                <div className="nl-right">
                    {submitted ? (
                        <div className="nl-success">
                            <div className="nl-success-icon"><FaCheck size={28} /></div>
                            <h3>You&apos;re subscribed! 🎉</h3>
                            <p>Check your inbox for your <strong>10% OFF</strong> coupon code.</p>
                            <span className="nl-coupon">Use code: <strong>WELCOME10</strong></span>
                        </div>
                    ) : (
                        <form className="nl-form" onSubmit={handleSubmit}>
                            <p className="nl-form-title">Join 10,000+ happy subscribers</p>
                            <div className="nl-input-wrap">
                                <FaEnvelope size={15} className="nl-input-icon" />
                                <input
                                    type="email"
                                    className="nl-input"
                                    placeholder="Enter your email address"
                                    value={email}
                                    onChange={e => { setEmail(e.target.value); setError(''); }}
                                />
                            </div>
                            {error && <p className="nl-error">{error}</p>}
                            <button type="submit" className="nl-btn">
                                Subscribe & Get 10% OFF →
                            </button>
                            <p className="nl-note">No spam, unsubscribe anytime. We respect your privacy.</p>
                        </form>
                    )}
                </div>

                {/* Decorative */}
                <div className="nl-blob nl-blob-1" />
                <div className="nl-blob nl-blob-2" />
            </div>
        </section>
    );
};

export default Newsletter;
