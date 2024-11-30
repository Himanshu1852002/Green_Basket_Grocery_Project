import Banners from "../../Components/Banners/Banners"
import ExploreMenu from "../../Components/Explore_Menu/Explore_Menu"
import Product_Item_List from "../../Components/Product_Item_List/Product_Item_List"
import coldrinks_img from '../../assets/Images/Images/coldrinks.png'
import { coldrinks_list } from "../../assets/Images/assets"
import { useState } from "react"
const Drinks = () => {
    const [category, setCategory] = useState("Coldrinks");
    return (
        <>
            <Banners
                title1="Cool and"
                title2="Fresh Drinks"
                heading="DRINK FRESH AND MOOD FRESH"
                item_img={coldrinks_img}
                backgroundColor="linear-gradient( to top,  rgba(126,184,253,1) 5.6%, rgba(2,71,157,1) 95.3% )"
            />
            
            <ExploreMenu category={category} setCategory={setCategory} />
            <Product_Item_List
                items={coldrinks_list}
            />
        </>
    )
}

export default Drinks