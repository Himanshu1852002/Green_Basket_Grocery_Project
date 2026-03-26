import './Contact.css';
import { useState } from 'react';
import { CiLocationOn } from "react-icons/ci";
import { FaPhoneAlt, FaEnvelope, FaClock, FaChevronDown, FaChevronUp } from "react-icons/fa";

const faqs = [
    { q: "What are your delivery hours?", a: "We deliver from 8 AM to 9 PM, 7 days a week including public holidays." },
    { q: "How do I track my order?", a: "You can track your order from the 'My Orders' section after logging in." },
    { q: "What is your return policy?", a: "We offer a full refund or replacement within 24 hours if the product is damaged or incorrect." },
    { q: "Do you offer free delivery?", a: "Yes! Orders above ₹200 get free delivery. A small fee of ₹25 applies for orders below ₹200." },
    { q: "How can I cancel my order?", a: "You can cancel your order from the 'My Orders' page before it is out for delivery." },
];

const Contact = () => {
    const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
    const [submitted, setSubmitted] = useState(false);
    const [openFaq, setOpenFaq] = useState(null);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (form.name && form.email && form.message) setSubmitted(true);
    };

    return (
        <div className="ct-page">

            {/* Banner */}
            <div className="ct-banner">
                <p className="ct-breadcrumb">Home › Contact Us</p>
                <h1 className="ct-banner-title">Contact Us</h1>
                <p className="ct-banner-sub">We'd love to hear from you. Reach out anytime!</p>
            </div>

            {/* Info cards */}
            <div className="ct-info-section">
                <div className="ct-info-grid">
                    <div className="ct-info-card">
                        <div className="ct-info-icon"><CiLocationOn size={22} /></div>
                        <h4 className="ct-info-title">Our Address</h4>
                        <p className="ct-info-text">Shop No. 4, Krishna Palace, Plot No. 47, near Imli Bazar, Nehru Marg, Khategaon, Dist - Dewas, M.P. 455336</p>
                    </div>
                    <div className="ct-info-card">
                        <div className="ct-info-icon"><FaPhoneAlt size={18} /></div>
                        <h4 className="ct-info-title">Phone</h4>
                        <p className="ct-info-text">+91 6266059961</p>
                        <p className="ct-info-text">+91 9589391454</p>
                    </div>
                    <div className="ct-info-card">
                        <div className="ct-info-icon"><FaEnvelope size={18} /></div>
                        <h4 className="ct-info-title">Email</h4>
                        <p className="ct-info-text">greenbasket@gmail.com</p>
                        <p className="ct-info-text">support@greenbasket.in</p>
                    </div>
                    <div className="ct-info-card">
                        <div className="ct-info-icon"><FaClock size={18} /></div>
                        <h4 className="ct-info-title">Working Hours</h4>
                        <p className="ct-info-text">Mon – Sat: 8 AM – 9 PM</p>
                        <p className="ct-info-text">Sunday: 9 AM – 6 PM</p>
                    </div>
                </div>
            </div>

            {/* Form + Map */}
            <div className="ct-main">

                {/* Contact Form */}
                <div className="ct-form-card">
                    <h3 className="ct-form-title">Send Us a Message</h3>
                    <p className="ct-form-sub">Fill out the form and we'll get back to you within 24 hours.</p>

                    {submitted ? (
                        <div className="ct-success">
                            <div className="ct-success-icon">✅</div>
                            <h4>Message Sent!</h4>
                            <p>Thank you for reaching out. We'll get back to you shortly.</p>
                            <button className="ct-reset-btn" onClick={() => { setSubmitted(false); setForm({ name: '', email: '', subject: '', message: '' }); }}>
                                Send Another
                            </button>
                        </div>
                    ) : (
                        <form className="ct-form" onSubmit={handleSubmit}>
                            <div className="ct-form-row">
                                <div className="ct-field">
                                    <label className="ct-label">Your Name *</label>
                                    <input className="ct-input" name="name" value={form.name} onChange={handleChange} placeholder="John Doe" required />
                                </div>
                                <div className="ct-field">
                                    <label className="ct-label">Email Address *</label>
                                    <input className="ct-input" name="email" type="email" value={form.email} onChange={handleChange} placeholder="john@example.com" required />
                                </div>
                            </div>
                            <div className="ct-field">
                                <label className="ct-label">Subject</label>
                                <input className="ct-input" name="subject" value={form.subject} onChange={handleChange} placeholder="How can we help?" />
                            </div>
                            <div className="ct-field">
                                <label className="ct-label">Message *</label>
                                <textarea className="ct-textarea" name="message" rows={5} value={form.message} onChange={handleChange} placeholder="Write your message here..." required />
                            </div>
                            <button type="submit" className="ct-submit-btn">Send Message →</button>
                        </form>
                    )}
                </div>

                {/* Map */}
                <div className="ct-map-card">
                    <h3 className="ct-form-title">Find Us Here</h3>
                    <p className="ct-form-sub">Khategaon, Madhya Pradesh, India</p>
                    <div className="ct-map-wrap">
                        <iframe
                            className="ct-map"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d58937.845054058234!2d76.86798941583967!3d22.593486617681158!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x397d16d049a07e11%3A0xfafab0e267077f72!2sKhategaon%2C%20Madhya%20Pradesh%20455336!5e0!3m2!1sen!2sin!4v1735221263725!5m2!1sen!2sin"
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer"
                            sandbox="allow-scripts allow-same-origin"
                        />
                    </div>
                </div>
            </div>

            {/* FAQ */}
            <div className="ct-faq-section">
                <div className="ct-faq-header">
                    <h2 className="ct-faq-title">Frequently Asked Questions</h2>
                    <p className="ct-faq-sub">Quick answers to common questions.</p>
                </div>
                <div className="ct-faq-list">
                    {faqs.map((faq, i) => (
                        <div key={i} className={`ct-faq-item${openFaq === i ? ' open' : ''}`}>
                            <button className="ct-faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                                <span>{faq.q}</span>
                                {openFaq === i ? <FaChevronUp size={13} /> : <FaChevronDown size={13} />}
                            </button>
                            {openFaq === i && <p className="ct-faq-a">{faq.a}</p>}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Contact;
