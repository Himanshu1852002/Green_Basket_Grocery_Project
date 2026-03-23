import Card from "./Card";
import PropTypes from "prop-types";
import { useState, useMemo } from "react";
import { FaSort, FaFilter, FaTimes, FaSearch } from "react-icons/fa";
import './Product_Item_List.css';

const BASE_URL = "https://green-basket-grocery-project.onrender.com";

/* ── Skeleton Card ── */
const SkeletonCard = () => (
    <div className="col-lg-3 col-md-4 col-6 mb-3">
        <div className="pc-skeleton">
            <div className="pc-sk-img" />
            <div className="pc-sk-body">
                <div className="pc-sk-line pc-sk-stars" />
                <div className="pc-sk-line pc-sk-name" />
                <div className="pc-sk-line pc-sk-price" />
                <div className="pc-sk-line pc-sk-btn" />
            </div>
        </div>
    </div>
);

/* ── Empty State ── */
const EmptyState = ({ onReset }) => (
    <div className="pl-empty">
        <div className="pl-empty-icon">
            <FaSearch size={32} color="#c8e6c9" />
        </div>
        <h3 className="pl-empty-title">No products found</h3>
        <p className="pl-empty-sub">Try adjusting your filters or sort options to find what you&apos;re looking for.</p>
        <button className="pl-empty-btn" onClick={onReset}>Clear Filters</button>
    </div>
);

EmptyState.propTypes = { onReset: PropTypes.func.isRequired };

/* ── Main Component ── */
const Product_Item_List = ({ items = [], loading = false }) => {
    const [sort, setSort] = useState("default");
    const [maxPrice, setMaxPrice] = useState(1000);
    const [onlyDiscount, setOnlyDiscount] = useState(false);
    const [search, setSearch] = useState("");
    const [showFilters, setShowFilters] = useState(false);

    const maxAvailable = useMemo(() => {
        if (!items.length) return 1000;
        return Math.ceil(Math.max(...items.map(i => Number(i.price))) / 100) * 100;
    }, [items]);

    const filtered = useMemo(() => {
        let list = [...items];

        // Search
        if (search.trim())
            list = list.filter(i => i.name.toLowerCase().includes(search.toLowerCase()));

        // Price filter
        list = list.filter(i => Number(i.sellingPrice) <= maxPrice);

        // Discount only
        if (onlyDiscount)
            list = list.filter(i => Number(i.price) > Number(i.sellingPrice));

        // Sort
        if (sort === "price-asc")  list.sort((a, b) => a.sellingPrice - b.sellingPrice);
        if (sort === "price-desc") list.sort((a, b) => b.sellingPrice - a.sellingPrice);
        if (sort === "discount")   list.sort((a, b) => (b.price - b.sellingPrice) / b.price - (a.price - a.sellingPrice) / a.price);
        if (sort === "name-asc")   list.sort((a, b) => a.name.localeCompare(b.name));

        return list;
    }, [items, search, maxPrice, onlyDiscount, sort]);

    const hasActiveFilter = sort !== "default" || maxPrice < maxAvailable || onlyDiscount || search.trim();

    const resetFilters = () => {
        setSort("default");
        setMaxPrice(maxAvailable);
        setOnlyDiscount(false);
        setSearch("");
    };

    return (
        <div className="pl-section">

            {/* ── Top bar ── */}
            <div className="pl-topbar">
                <div className="pl-topbar-left">
                    <h2 className="pl-title">All <span>Products</span></h2>
                    {!loading && (
                        <span className="pl-count">{filtered.length} items</span>
                    )}
                </div>
                <div className="pl-topbar-right">
                    {/* Search */}
                    <div className="pl-search">
                        <FaSearch size={12} className="pl-search-icon" />
                        <input
                            className="pl-search-input"
                            type="text"
                            placeholder="Search products..."
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                        />
                        {search && (
                            <button className="pl-search-clear" onClick={() => setSearch("")}>
                                <FaTimes size={11} />
                            </button>
                        )}
                    </div>

                    {/* Sort */}
                    <div className="pl-sort-wrap">
                        <FaSort size={13} color="#059212" />
                        <select className="pl-sort" value={sort} onChange={e => setSort(e.target.value)}>
                            <option value="default">Sort By</option>
                            <option value="price-asc">Price: Low to High</option>
                            <option value="price-desc">Price: High to Low</option>
                            <option value="discount">Most Discount</option>
                            <option value="name-asc">Name: A to Z</option>
                        </select>
                    </div>

                    {/* Filter toggle */}
                    <button
                        className={`pl-filter-btn ${showFilters ? 'pl-filter-active' : ''}`}
                        onClick={() => setShowFilters(p => !p)}
                    >
                        <FaFilter size={12} />
                        Filters
                        {hasActiveFilter && <span className="pl-filter-dot" />}
                    </button>
                </div>
            </div>

            {/* ── Filter Panel ── */}
            {showFilters && (
                <div className="pl-filter-panel">
                    {/* Price range */}
                    <div className="pl-filter-group">
                        <label className="pl-filter-label">
                            Max Price <span>₹{maxPrice}</span>
                        </label>
                        <input
                            type="range"
                            className="pl-range"
                            min={0}
                            max={maxAvailable}
                            step={50}
                            value={maxPrice}
                            onChange={e => setMaxPrice(Number(e.target.value))}
                        />
                        <div className="pl-range-labels">
                            <span>₹0</span>
                            <span>₹{maxAvailable}</span>
                        </div>
                    </div>

                    {/* Discount toggle */}
                    <div className="pl-filter-group">
                        <label className="pl-filter-label">Offers</label>
                        <label className="pl-toggle">
                            <input
                                type="checkbox"
                                checked={onlyDiscount}
                                onChange={e => setOnlyDiscount(e.target.checked)}
                            />
                            <span className="pl-toggle-slider" />
                            <span className="pl-toggle-text">Discounted items only</span>
                        </label>
                    </div>

                    {/* Reset */}
                    {hasActiveFilter && (
                        <button className="pl-reset-btn" onClick={resetFilters}>
                            <FaTimes size={11} /> Clear All
                        </button>
                    )}
                </div>
            )}

            {/* ── Skeleton ── */}
            {loading && (
                <div className="row g-3">
                    {Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}
                </div>
            )}

            {/* ── Products Grid ── */}
            {!loading && filtered.length > 0 && (
                <div className="row g-3">
                    {filtered.map((item, index) => (
                        <Card
                            key={index}
                            _id={item._id}
                            name={item.name}
                            sellingPrice={item.sellingPrice}
                            price={item.price}
                            image={`${BASE_URL}/uploads/${item.image}`}
                            unit={item.unit}
                            description={item.description}
                        />
                    ))}
                </div>
            )}

            {/* ── Empty State ── */}
            {!loading && filtered.length === 0 && items.length > 0 && (
                <EmptyState onReset={resetFilters} />
            )}

        </div>
    );
};

Product_Item_List.propTypes = {
    items: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            name: PropTypes.string.isRequired,
            price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            image: PropTypes.string.isRequired,
            unit: PropTypes.string.isRequired,
        })
    ).isRequired,
    loading: PropTypes.bool,
};

export default Product_Item_List;
