import './Blog.css';
import { Link } from 'react-router-dom';
import { FaLeaf, FaClock, FaUser, FaArrowRight, FaFire, FaHeart } from 'react-icons/fa';

/* ── SVG Illustrations ── */
const FruitsSVG = () => (
    <svg viewBox="0 0 420 300" xmlns="http://www.w3.org/2000/svg" className="bl-svg">
        {/* Background */}
        <rect width="420" height="300" fill="#e8f5e9" rx="0" />
        {/* Soft circles bg */}
        <circle cx="340" cy="60" r="80" fill="#c8e6c9" opacity="0.5" />
        <circle cx="80" cy="240" r="60" fill="#a5d6a7" opacity="0.35" />

        {/* Watermelon slice */}
        <ellipse cx="100" cy="200" rx="62" ry="62" fill="#ef5350" />
        <ellipse cx="100" cy="200" rx="62" ry="62" fill="none" stroke="#c62828" strokeWidth="2" />
        <path d="M100 200 L38 200 A62 62 0 0 1 100 138 Z" fill="#66bb6a" />
        <path d="M100 200 L38 200 A62 62 0 0 1 100 138 Z" fill="none" stroke="#388e3c" strokeWidth="1.5" />
        <ellipse cx="100" cy="200" rx="54" ry="54" fill="#ef9a9a" opacity="0.3" />
        <circle cx="80" cy="185" r="4" fill="#1a237e" />
        <circle cx="110" cy="195" r="4" fill="#1a237e" />
        <circle cx="95" cy="215" r="4" fill="#1a237e" />

        {/* Apple */}
        <ellipse cx="220" cy="155" rx="52" ry="56" fill="#e53935" />
        <ellipse cx="220" cy="155" rx="52" ry="56" fill="none" stroke="#b71c1c" strokeWidth="2" />
        <path d="M220 100 Q228 88 238 92" stroke="#5d4037" strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d="M228 90 Q240 78 248 84" stroke="#388e3c" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <ellipse cx="205" cy="140" rx="14" ry="22" fill="#ef9a9a" opacity="0.45" transform="rotate(-20,205,140)" />
        <path d="M220 100 Q215 128 218 155" stroke="#c62828" strokeWidth="1.5" fill="none" opacity="0.5" />

        {/* Orange */}
        <circle cx="320" cy="190" r="55" fill="#fb8c00" />
        <circle cx="320" cy="190" r="55" fill="none" stroke="#e65100" strokeWidth="2" />
        <circle cx="320" cy="190" r="44" fill="none" stroke="#ffe0b2" strokeWidth="1" opacity="0.6" />
        {/* orange segments hint */}
        <line x1="320" y1="135" x2="320" y2="245" stroke="#e65100" strokeWidth="1" opacity="0.3" />
        <line x1="265" y1="190" x2="375" y2="190" stroke="#e65100" strokeWidth="1" opacity="0.3" />
        <line x1="281" y1="151" x2="359" y2="229" stroke="#e65100" strokeWidth="1" opacity="0.3" />
        <line x1="281" y1="229" x2="359" y2="151" stroke="#e65100" strokeWidth="1" opacity="0.3" />
        <ellipse cx="305" cy="172" rx="10" ry="16" fill="#ffcc80" opacity="0.4" transform="rotate(-30,305,172)" />
        <path d="M320 135 Q328 122 338 126" stroke="#5d4037" strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d="M328 124 Q336 112 346 118" stroke="#388e3c" strokeWidth="2.5" fill="none" strokeLinecap="round" />

        {/* Grapes */}
        <circle cx="155" cy="90" r="16" fill="#7b1fa2" />
        <circle cx="183" cy="90" r="16" fill="#8e24aa" />
        <circle cx="169" cy="68" r="16" fill="#9c27b0" />
        <circle cx="141" cy="68" r="16" fill="#7b1fa2" />
        <circle cx="197" cy="68" r="16" fill="#8e24aa" />
        <circle cx="155" cy="46" r="16" fill="#9c27b0" />
        <circle cx="183" cy="46" r="16" fill="#7b1fa2" />
        <circle cx="169" cy="24" r="16" fill="#8e24aa" />
        {/* grape shine */}
        <circle cx="148" cy="84" r="5" fill="#ce93d8" opacity="0.6" />
        <circle cx="176" cy="84" r="5" fill="#ce93d8" opacity="0.6" />
        <circle cx="162" cy="62" r="5" fill="#ce93d8" opacity="0.6" />
        <path d="M169 8 Q178 -4 188 2" stroke="#5d4037" strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d="M176 0 Q190 -10 198 -2" stroke="#388e3c" strokeWidth="2.5" fill="none" strokeLinecap="round" />

        {/* Banana */}
        <path d="M30 120 Q60 60 110 70 Q130 74 120 90 Q90 84 65 135 Z" fill="#fdd835" />
        <path d="M30 120 Q60 60 110 70" stroke="#f9a825" strokeWidth="2" fill="none" />
        <path d="M65 135 Q90 84 120 90" stroke="#f9a825" strokeWidth="1.5" fill="none" />

        {/* Strawberry */}
        <path d="M370 80 Q390 55 410 70 Q420 90 400 110 Q385 120 370 110 Q355 95 370 80 Z" fill="#e53935" />
        <path d="M370 80 Q390 55 410 70 Q420 90 400 110 Q385 120 370 110 Q355 95 370 80 Z" fill="none" stroke="#b71c1c" strokeWidth="1.5" />
        <circle cx="382" cy="88" r="2.5" fill="#ffcdd2" opacity="0.8" />
        <circle cx="395" cy="95" r="2.5" fill="#ffcdd2" opacity="0.8" />
        <circle cx="378" cy="100" r="2.5" fill="#ffcdd2" opacity="0.8" />
        <path d="M385 78 Q390 65 398 68" stroke="#388e3c" strokeWidth="2.5" fill="none" strokeLinecap="round" />

        {/* Decorative leaves */}
        <ellipse cx="50" cy="270" rx="22" ry="10" fill="#66bb6a" transform="rotate(-30,50,270)" />
        <ellipse cx="380" cy="270" rx="22" ry="10" fill="#81c784" transform="rotate(30,380,270)" />
        <ellipse cx="210" cy="280" rx="18" ry="8" fill="#a5d6a7" transform="rotate(10,210,280)" />
    </svg>
);

const VegetablesSVG = () => (
    <svg viewBox="0 0 420 300" xmlns="http://www.w3.org/2000/svg" className="bl-svg">
        {/* Background */}
        <rect width="420" height="300" fill="#f1f8e9" rx="0" />
        <circle cx="60" cy="60" r="70" fill="#dcedc8" opacity="0.5" />
        <circle cx="370" cy="250" r="80" fill="#c5e1a5" opacity="0.4" />

        {/* Broccoli */}
        <rect x="195" y="200" width="18" height="60" fill="#558b2f" rx="4" />
        <circle cx="204" cy="185" r="38" fill="#388e3c" />
        <circle cx="178" cy="175" r="28" fill="#43a047" />
        <circle cx="230" cy="175" r="28" fill="#43a047" />
        <circle cx="204" cy="155" r="28" fill="#4caf50" />
        <circle cx="178" cy="155" r="22" fill="#66bb6a" opacity="0.7" />
        <circle cx="230" cy="155" r="22" fill="#66bb6a" opacity="0.7" />
        <circle cx="204" cy="138" r="22" fill="#81c784" opacity="0.6" />

        {/* Carrot */}
        <path d="M80 80 Q95 140 88 200" stroke="#ef6c00" strokeWidth="28" fill="none" strokeLinecap="round" />
        <path d="M80 80 Q95 140 88 200" stroke="#ff8f00" strokeWidth="20" fill="none" strokeLinecap="round" opacity="0.6" />
        {/* carrot lines */}
        <path d="M76 110 Q90 115 100 108" stroke="#e65100" strokeWidth="2" fill="none" opacity="0.5" />
        <path d="M78 140 Q92 145 102 138" stroke="#e65100" strokeWidth="2" fill="none" opacity="0.5" />
        <path d="M80 170 Q94 175 104 168" stroke="#e65100" strokeWidth="2" fill="none" opacity="0.5" />
        {/* carrot leaves */}
        <path d="M80 80 Q60 40 40 50 Q55 70 80 80" fill="#388e3c" />
        <path d="M80 80 Q70 30 90 20 Q88 55 80 80" fill="#43a047" />
        <path d="M80 80 Q100 35 120 45 Q100 65 80 80" fill="#388e3c" />

        {/* Tomato */}
        <circle cx="330" cy="150" r="58" fill="#e53935" />
        <circle cx="330" cy="150" r="58" fill="none" stroke="#c62828" strokeWidth="2" />
        <ellipse cx="312" cy="128" rx="14" ry="22" fill="#ef9a9a" opacity="0.4" transform="rotate(-20,312,128)" />
        {/* tomato segments */}
        <path d="M330 92 Q330 150 330 208" stroke="#c62828" strokeWidth="1.5" fill="none" opacity="0.3" />
        <path d="M272 150 Q330 150 388 150" stroke="#c62828" strokeWidth="1.5" fill="none" opacity="0.3" />
        {/* stem */}
        <path d="M330 92 Q338 78 348 82" stroke="#5d4037" strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d="M330 92 Q318 76 308 82" stroke="#388e3c" strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d="M330 92 Q334 74 344 76" stroke="#388e3c" strokeWidth="2.5" fill="none" strokeLinecap="round" />

        {/* Capsicum / Bell pepper */}
        <path d="M340 240 Q320 210 330 185 Q345 170 360 185 Q375 200 370 225 Q360 250 340 240 Z" fill="#fdd835" />
        <path d="M340 240 Q320 210 330 185 Q345 170 360 185 Q375 200 370 225 Q360 250 340 240 Z" fill="none" stroke="#f9a825" strokeWidth="1.5" />
        <path d="M345 185 Q348 172 356 174" stroke="#5d4037" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <ellipse cx="336" cy="205" rx="7" ry="14" fill="#fff9c4" opacity="0.5" transform="rotate(-15,336,205)" />

        {/* Cucumber */}
        <ellipse cx="120" cy="230" rx="28" ry="55" fill="#66bb6a" transform="rotate(25,120,230)" />
        <ellipse cx="120" cy="230" rx="28" ry="55" fill="none" stroke="#388e3c" strokeWidth="2" transform="rotate(25,120,230)" />
        <ellipse cx="108" cy="210" rx="10" ry="20" fill="#a5d6a7" opacity="0.5" transform="rotate(25,108,210)" />
        {/* cucumber lines */}
        <line x1="100" y1="215" x2="140" y2="245" stroke="#388e3c" strokeWidth="1.5" opacity="0.4" />
        <line x1="95" y1="230" x2="135" y2="260" stroke="#388e3c" strokeWidth="1.5" opacity="0.4" />

        {/* Onion */}
        <ellipse cx="390" cy="80" rx="30" ry="35" fill="#ce93d8" />
        <ellipse cx="390" cy="80" rx="30" ry="35" fill="none" stroke="#9c27b0" strokeWidth="1.5" />
        <ellipse cx="390" cy="80" rx="22" ry="27" fill="none" stroke="#ba68c8" strokeWidth="1" opacity="0.6" />
        <path d="M390 45 Q396 32 404 36" stroke="#5d4037" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <path d="M390 45 Q382 30 374 36" stroke="#388e3c" strokeWidth="2.5" fill="none" strokeLinecap="round" />

        {/* Leaves decoration */}
        <ellipse cx="30" cy="280" rx="24" ry="10" fill="#81c784" transform="rotate(-25,30,280)" />
        <ellipse cx="200" cy="290" rx="20" ry="8" fill="#a5d6a7" transform="rotate(5,200,290)" />
        <ellipse cx="400" cy="285" rx="22" ry="9" fill="#66bb6a" transform="rotate(20,400,285)" />
    </svg>
);

const ChocolatesSVG = () => (
    <svg viewBox="0 0 420 300" xmlns="http://www.w3.org/2000/svg" className="bl-svg">
        {/* Background */}
        <rect width="420" height="300" fill="#fbe9e7" rx="0" />
        <circle cx="50" cy="50" r="80" fill="#ffccbc" opacity="0.4" />
        <circle cx="380" cy="260" r="90" fill="#ffab91" opacity="0.3" />

        {/* Big chocolate bar */}
        <rect x="100" y="80" width="220" height="150" rx="14" fill="#4e342e" />
        <rect x="100" y="80" width="220" height="150" rx="14" fill="none" stroke="#3e2723" strokeWidth="2.5" />
        {/* bar shine */}
        <rect x="108" y="88" width="60" height="134" rx="8" fill="#6d4c41" opacity="0.3" />
        {/* segments grid */}
        <line x1="155" y1="80" x2="155" y2="230" stroke="#3e2723" strokeWidth="2.5" />
        <line x1="210" y1="80" x2="210" y2="230" stroke="#3e2723" strokeWidth="2.5" />
        <line x1="265" y1="80" x2="265" y2="230" stroke="#3e2723" strokeWidth="2.5" />
        <line x1="100" y1="130" x2="320" y2="130" stroke="#3e2723" strokeWidth="2.5" />
        <line x1="100" y1="180" x2="320" y2="180" stroke="#3e2723" strokeWidth="2.5" />
        {/* segment shine dots */}
        <circle cx="128" cy="105" r="5" fill="#8d6e63" opacity="0.6" />
        <circle cx="183" cy="105" r="5" fill="#8d6e63" opacity="0.6" />
        <circle cx="238" cy="105" r="5" fill="#8d6e63" opacity="0.6" />
        <circle cx="293" cy="105" r="5" fill="#8d6e63" opacity="0.6" />
        <circle cx="128" cy="155" r="5" fill="#8d6e63" opacity="0.6" />
        <circle cx="183" cy="155" r="5" fill="#8d6e63" opacity="0.6" />
        <circle cx="238" cy="155" r="5" fill="#8d6e63" opacity="0.6" />
        <circle cx="293" cy="155" r="5" fill="#8d6e63" opacity="0.6" />
        <circle cx="128" cy="205" r="5" fill="#8d6e63" opacity="0.6" />
        <circle cx="183" cy="205" r="5" fill="#8d6e63" opacity="0.6" />
        <circle cx="238" cy="205" r="5" fill="#8d6e63" opacity="0.6" />
        <circle cx="293" cy="205" r="5" fill="#8d6e63" opacity="0.6" />

        {/* Broken piece */}
        <path d="M265 130 L320 130 L320 180 L265 180 Z" fill="#6d4c41" />
        <path d="M265 130 L320 130 L320 180 L265 180 Z" fill="none" stroke="#3e2723" strokeWidth="2" />
        <path d="M268 133 L317 133 L317 177 L268 177 Z" fill="#795548" opacity="0.5" />

        {/* Melting drip */}
        <path d="M155 230 Q158 255 155 270 Q152 280 158 285 Q164 280 162 270 Q160 255 163 230" fill="#4e342e" />
        <path d="M210 230 Q214 260 210 278 Q207 288 214 292 Q220 288 218 278 Q215 260 218 230" fill="#4e342e" />

        {/* Cocoa beans */}
        <ellipse cx="55" cy="180" rx="22" ry="14" fill="#6d4c41" transform="rotate(-20,55,180)" />
        <ellipse cx="55" cy="180" rx="22" ry="14" fill="none" stroke="#4e342e" strokeWidth="1.5" transform="rotate(-20,55,180)" />
        <line x1="44" y1="172" x2="66" y2="188" stroke="#4e342e" strokeWidth="1.5" opacity="0.5" transform="rotate(-20,55,180)" />

        <ellipse cx="370" cy="120" rx="22" ry="14" fill="#795548" transform="rotate(15,370,120)" />
        <ellipse cx="370" cy="120" rx="22" ry="14" fill="none" stroke="#4e342e" strokeWidth="1.5" transform="rotate(15,370,120)" />
        <line x1="359" y1="112" x2="381" y2="128" stroke="#4e342e" strokeWidth="1.5" opacity="0.5" transform="rotate(15,370,120)" />

        {/* Truffle balls */}
        <circle cx="60" cy="100" r="28" fill="#5d4037" />
        <circle cx="60" cy="100" r="28" fill="none" stroke="#3e2723" strokeWidth="1.5" />
        <circle cx="50" cy="90" r="9" fill="#8d6e63" opacity="0.5" />
        {/* sprinkles */}
        <rect x="48" y="78" width="10" height="4" rx="2" fill="#e53935" transform="rotate(30,53,80)" />
        <rect x="65" y="82" width="10" height="4" rx="2" fill="#fdd835" transform="rotate(-20,70,84)" />
        <rect x="42" y="105" width="10" height="4" rx="2" fill="#1e88e5" transform="rotate(10,47,107)" />

        <circle cx="370" cy="210" r="26" fill="#4e342e" />
        <circle cx="370" cy="210" r="26" fill="none" stroke="#3e2723" strokeWidth="1.5" />
        <circle cx="360" cy="200" r="8" fill="#6d4c41" opacity="0.5" />
        <rect x="358" y="196" width="10" height="4" rx="2" fill="#e53935" transform="rotate(-15,363,198)" />
        <rect x="372" y="202" width="10" height="4" rx="2" fill="#fdd835" transform="rotate(25,377,204)" />

        {/* Stars / sparkles */}
        <text x="340" y="55" fontSize="22" fill="#fdd835" opacity="0.8">✦</text>
        <text x="30" y="240" fontSize="16" fill="#ffab91" opacity="0.9">✦</text>
        <text x="390" y="170" fontSize="14" fill="#ffcc80" opacity="0.7">✦</text>
    </svg>
);

const posts = [
    {
        IllustrationComponent: FruitsSVG,
        tag: 'Fruits',
        tagEmoji: '🍎',
        tagColor: '#e8f5e9',
        tagText: '#2e7d32',
        title: 'Why Fresh Fruits Are Essential for a Healthy Life',
        desc: 'Experience the vibrant flavors of nature with our fresh and juicy fruits. Packed with essential vitamins and minerals, they\'re a perfect way to boost your energy and stay healthy. Whether it\'s a quick snack or a refreshing addition to your meals, our fruits are here to brighten your day with natural sweetness.',
        author: 'Green Basket',
        time: '5 min read',
        date: 'Jan 12, 2025',
        likes: 124,
    },
    {
        IllustrationComponent: VegetablesSVG,
        tag: 'Vegetables',
        tagEmoji: '🥦',
        tagColor: '#f1f8e9',
        tagText: '#558b2f',
        title: 'Farm Fresh Vegetables — From Field to Your Table',
        desc: 'Enjoy the finest selection of fresh and crisp vegetables straight from the farm. Full of nutrients and flavor, they\'re perfect for creating wholesome and delicious meals for your family. From leafy greens to crunchy favorites, our vegetables are your go-to for a healthy lifestyle.',
        author: 'Green Basket',
        time: '4 min read',
        date: 'Jan 18, 2025',
        likes: 98,
    },
    {
        IllustrationComponent: ChocolatesSVG,
        tag: 'Chocolates',
        tagEmoji: '🍫',
        tagColor: '#fbe9e7',
        tagText: '#bf360c',
        title: 'The Sweet Science — Choosing the Best Chocolates',
        desc: 'Delight in the rich and creamy taste of our premium chocolates, crafted to perfection for every occasion. Whether it\'s a simple indulgence, a thoughtful gift, or a sweet treat to lift your spirits, our chocolates bring moments of happiness to your day.',
        author: 'Green Basket',
        time: '3 min read',
        date: 'Jan 25, 2025',
        likes: 211,
    },
];

const Blog = () => {
    return (
        <div className="bl-page">

            {/* Hero */}
            <div className="bl-hero">
                <div className="bl-hero-blob bl-hero-blob1" />
                <div className="bl-hero-blob bl-hero-blob2" />
                <div className="bl-hero-inner">
                    <span className="bl-hero-tag"><FaLeaf size={11} /> Our Blog</span>
                    <h1 className="bl-hero-title">Fresh <span>Stories</span> &<br />Healthy Tips</h1>
                    <p className="bl-hero-sub">Discover recipes, health tips, and stories from the world of fresh groceries.</p>
                    <div className="bl-hero-chips">
                        <span>🍎 Fruits</span>
                        <span>🥦 Vegetables</span>
                        <span>🍫 Chocolates</span>
                        <span>🛒 Grocery</span>
                    </div>
                </div>
            </div>

            {/* Featured Post */}
            <div className="bl-content">
                <div className="bl-section-label"><FaFire size={13} color="#059212" /> Featured Post</div>

                <article className="bl-featured">
                    <div className="bl-featured-img-wrap">
                        <FruitsSVG />
                        <span className="bl-tag" style={{ background: posts[0].tagColor, color: posts[0].tagText }}>
                            {posts[0].tagEmoji} {posts[0].tag}
                        </span>
                    </div>
                    <div className="bl-featured-body">
                        <div className="bl-meta">
                            <span><FaUser size={10} /> {posts[0].author}</span>
                            <span><FaClock size={10} /> {posts[0].time}</span>
                            <span>{posts[0].date}</span>
                        </div>
                        <h2 className="bl-featured-title">{posts[0].title}</h2>
                        <p className="bl-featured-desc">{posts[0].desc}</p>
                        <div className="bl-featured-footer">
                            <Link to="/" className="bl-read-more">Read Article <FaArrowRight size={11} /></Link>
                            <span className="bl-likes"><FaHeart size={12} color="#e53935" /> {posts[0].likes}</span>
                        </div>
                    </div>
                </article>

                {/* More Posts */}
                <div className="bl-section-label" style={{ marginTop: 12 }}>More Articles</div>
                <div className="bl-grid">
                    {posts.slice(1).map((post, i) => {
                        const Illustration = post.IllustrationComponent;
                        return (
                            <article key={i} className="bl-card">
                                <div className="bl-card-img-wrap">
                                    <Illustration />
                                    <span className="bl-tag" style={{ background: post.tagColor, color: post.tagText }}>
                                        {post.tagEmoji} {post.tag}
                                    </span>
                                </div>
                                <div className="bl-card-body">
                                    <div className="bl-meta">
                                        <span><FaClock size={10} /> {post.time}</span>
                                        <span>{post.date}</span>
                                    </div>
                                    <h3 className="bl-card-title">{post.title}</h3>
                                    <p className="bl-card-desc">{post.desc}</p>
                                    <div className="bl-card-footer">
                                        <Link to="/" className="bl-read-more">Read More <FaArrowRight size={10} /></Link>
                                        <span className="bl-likes"><FaHeart size={11} color="#e53935" /> {post.likes}</span>
                                    </div>
                                </div>
                            </article>
                        );
                    })}
                </div>
            </div>

            {/* Newsletter */}
            <div className="bl-newsletter">
                <div className="bl-newsletter-inner">
                    <span className="bl-newsletter-icon">📬</span>
                    <h3 className="bl-newsletter-title">Stay Fresh, Stay Healthy</h3>
                    <p className="bl-newsletter-sub">Get weekly tips, recipes & exclusive deals straight to your inbox.</p>
                    <div className="bl-newsletter-form">
                        <input type="email" placeholder="Enter your email address" className="bl-newsletter-input" />
                        <button className="bl-newsletter-btn">Subscribe</button>
                    </div>
                </div>
            </div>

            {/* CTA */}
            <div className="bl-cta">
                <div className="bl-cta-inner">
                    <h3 className="bl-cta-title">Want Fresh Groceries? 🛒</h3>
                    <p className="bl-cta-sub">Order now and get fresh fruits, vegetables & more delivered to your door.</p>
                    <Link to="/user/fruits" className="bl-cta-btn">Shop Now <FaArrowRight size={12} /></Link>
                </div>
            </div>

        </div>
    );
};

export default Blog;
