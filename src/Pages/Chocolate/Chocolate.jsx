import Banners from "../../Components/Banners/Banners";
import Product_Item_List from "../../Components/Product_Item_List/Product_Item_List";
import choco from '../../assets/Images/Images/Chocoo.png';
import { chocolates_list } from '../../assets/Images/assets';
import Explore_Menu from '../../Components/Explore_Menu/Explore_Menu'
import { useState } from "react";

const Chocolate = () => {
    const [category, setCategory] = useState("Chocolate")
    return (
        <>
            <Banners
                title1="Teasty and"
                title2="Yummy Chocolates"
                heading="EAT TESTY CHOCOLATES HERE"
                item_img={choco}
            />
            <Explore_Menu category={category} setCategory={setCategory} />
            <Product_Item_List
                items={chocolates_list}
            />
        </>
    )
}

export default Chocolate