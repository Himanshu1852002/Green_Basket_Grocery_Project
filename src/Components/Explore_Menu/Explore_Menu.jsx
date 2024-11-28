// eslint-disable-next-line no-unused-vars
import React from "react";
import './Explore_Menu.css';
import { menuItems_list } from "../../assets/assets";
import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";

const ExploreMenu = ({ category, setCategory }) => {

    const navigate = useNavigate();

    const handleCategoryClick = (menu_name) => {
        setCategory(prev => prev === menu_name ? "All" : menu_name);

        if (menu_name === "Chocolate") {
            navigate('/chocolates');
        } else if (menu_name === "Vegetable") {
            navigate('/vegetables');
        } else if (menu_name === "Fruits") {
            navigate('/fruits');
        } else if (menu_name === "Snacks") {
            navigate('/snacks');
        } else if (menu_name === "Coldrinks") {
            navigate('/drinks');
        } else if (menu_name === "Grocery") {
            navigate('/grocery');
        } else {
            navigate('/');
        }
    }


    return (
        <div className="container-fluid pt-3">
            <div className="explore_card">
                <h1>Explore <span>Menu</span></h1>
                <div className="card-body">
                    <div className="explore-menu">
                        {menuItems_list.map((item, index) => (
                            <div onClick={() => handleCategoryClick(item.menu_name)} className="explore-item" key={index}>
                                <img className={category === item.menu_name ? "active" : ""} src={item.imgSrc} alt={item.altText} />
                                <p>{item.menu_name}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
ExploreMenu.propTypes = {
    category: PropTypes.string.isRequired,
    setCategory: PropTypes.func.isRequired,
}
export default ExploreMenu;
