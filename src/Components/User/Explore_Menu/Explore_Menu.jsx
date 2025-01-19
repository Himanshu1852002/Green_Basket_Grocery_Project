import { useCallback, useRef } from 'react';
import './Explore_Menu.css';
import { menuItems_list } from '../../../assets/assets';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const ExploreMenu = ({ category, setCategory }) => {
    const navigate = useNavigate();
    const exploreMenuRef = useRef(null);

    const handleCategoryClick = useCallback((menu_name) => {
        if (menu_name === category) return;
        setCategory(menu_name);
        navigate(`/user/${menu_name.toLowerCase()}`);
    }, [navigate, category, setCategory]);

    return (
        <div className="container-fluid pt-3">
            <div className="explore_card">
                <h1>
                    Explore <span>Menu</span>
                </h1>
                <div className="card-body">
                    <div className="explore-menu" ref={exploreMenuRef}>
                        {menuItems_list.map((item, index) => (
                            <div
                                onClick={() => handleCategoryClick(item.menu_name, index)}
                                className="explore-item"
                                key={index}
                            >
                                <div
                                    className={`explore-box ${category === item.menu_name ? 'active' : ''}`}
                                    data-category={item.menu_name}
                                >
                                    <img
                                        className="explore-item-img"
                                        src={item.imgSrc}
                                        alt={item.altText}
                                    />
                                    <p>{item.menu_name}</p>
                                </div>
                            </div>
                        ))}
                    </div>


                </div>
            </div>
        </div>
    );
};

ExploreMenu.propTypes = {
    category: PropTypes.string.isRequired,
    setCategory: PropTypes.func.isRequired,
};

export default ExploreMenu;
