import Banners from "../../Components/Banners/Banners"
import ExploreMenu from "../../Components/Explore_Menu/Explore_Menu"
import Product_Item_List from "../../Components/Product_Item_List/Product_Item_List"
import veges_img from '../../assets/Images/Images/veges.png'
import { vegetables_list } from "../../assets/Images/assets"
import { useState } from "react"
const Vegetables = () => {
    const [category, setCategory] = useState("Vegetable")
    return (
        <>
            <Banners
                title1="Green and"
                title2="Fresh Vegetables"
                heading="CHOOSE FRESH AND GREEN VEGETABLES FOR HEALTH"
                item_img={veges_img}
            />
            <ExploreMenu category={category} setCategory={setCategory} />
            <Product_Item_List
                items={vegetables_list}
            />
        </>
    )
}

export default Vegetables