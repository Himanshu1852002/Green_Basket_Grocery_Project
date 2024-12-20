import fruits_img from '../../assets/Images/Images/fruits.jpg';
import Banners from "../../Components/Banners/Banners"
import Product_Item_List from '../../Components/Product_Item_List/Product_Item_List';
import { fruits_list } from '../../assets/Images/assets'
import ExploreMenu from '../../Components/Explore_Menu/Explore_Menu';
import { useState } from 'react';

const Fruits = () => {
    const [category, setCategory] = useState("Fruits")
    return (
        <>
            <Banners
                title1='Fresh &'
                title2='The Juicy Fruits'
                heading='CHOOSE FROM OUR BEST ITEMS'
                item_img={fruits_img}
                backgroundColor='linear-gradient(to top,#FFC800, #FF8F00,#FF7200,#FF5500,#FF0000'

            />
            <ExploreMenu category={category} setCategory={setCategory} />
            <Product_Item_List
                items={fruits_list}
            />
        </>
    )
}

export default Fruits