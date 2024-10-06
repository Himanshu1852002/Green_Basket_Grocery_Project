// eslint-disable-next-line no-unused-vars
import React from "react";
import './Explore_Menu.css';
import { menuItems_list } from "../../assets/assets";
import PropTypes from 'prop-types';

const ExploreMenu = ({ category, setCategory }) => {


    return (
        <div className="container-fluid p-0">
            <div className="explore_card">
                <h1>Explore <span>Menu</span></h1>
                <div className="card-body">
                    <div className="explore-menu">
                        {menuItems_list.map((item, index) => (
                            <div onClick={() => setCategory(prev => prev === item.menu_name ? "All" : item.menu_name)} className="explore-item" key={index}>
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
