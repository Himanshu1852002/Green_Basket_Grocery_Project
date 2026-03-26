import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import "./Testimonial.css";
import { FaStar, FaQuoteLeft } from "react-icons/fa";

const testimonials = [
    {
        name: "Anikesh Chouhan",
        location: "Khategaon, M.P.",
        rating: 5,
        text: "Green Basket has completely changed how I shop for groceries. The produce is always fresh and delivery is super fast. Highly recommended!",
        avatar: "AC",
        color: "#059212",
    },
    {
        name: "Priya Sharma",
        location: "Dewas, M.P.",
        rating: 5,
        text: "Amazing quality fruits and vegetables! The prices are very reasonable and the packaging is eco-friendly. Love shopping here every week.",
        avatar: "PS",
        color: "#1a4d2e",
    },
    {
        name: "Aman Rathod",
        location: "Indore, M.P.",
        rating: 4,
        text: "Very convenient service. I ordered late at night and received my groceries the next morning. Customer support is also very helpful.",
        avatar: "AR",
        color: "#2e7d32",
    },
    {
        name: "Kuldeep Mangrola",
        location: "Bhopal, M.P.",
        rating: 5,
        text: "Best grocery app in our area! Fresh products, great deals, and the coupon codes save me a lot every month. Keep it up Green Basket!",
        avatar: "KM",
        color: "#388e3c",
    },
    {
        name: "Sneha Joshi",
        location: "Ujjain, M.P.",
        rating: 5,
        text: "I love that they source directly from farmers. You can taste the freshness in every vegetable. Will never go back to regular stores!",
        avatar: "SJ",
        color: "#059212",
    },
];

const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
    pauseOnHover: true,
    responsive: [
        { breakpoint: 1024, settings: { slidesToShow: 2 } },
        { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
};

const Testimonial = () => (
    <div className="tm-section">
        <div className="tm-header">
            <span className="tm-tag">💬 Testimonials</span>
            <h2 className="tm-title">What Our Customers <span>Say</span></h2>
            <p className="tm-sub">Trusted by thousands of happy families across Madhya Pradesh</p>
        </div>

        <div className="tm-slider-wrap">
            <Slider {...settings}>
                {testimonials.map((t, i) => (
                    <div key={i} className="tm-slide">
                        <div className="tm-card">
                            <FaQuoteLeft size={20} className="tm-quote-icon" />

                            {/* Stars */}
                            <div className="tm-stars">
                                {Array.from({ length: 5 }).map((_, si) => (
                                    <FaStar key={si} size={13} className={si < t.rating ? "tm-star filled" : "tm-star"} />
                                ))}
                            </div>

                            <p className="tm-text">{t.text}</p>

                            {/* Author */}
                            <div className="tm-author">
                                <div className="tm-avatar" style={{ background: t.color }}>{t.avatar}</div>
                                <div>
                                    <p className="tm-name">{t.name}</p>
                                    <p className="tm-location">{t.location}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    </div>
);

export default Testimonial;
