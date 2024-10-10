import Grocery_img from '../../assets/Images/Images/grocery_items.png'
import Banners from '../../Components/Banners/Banners'
import ExploreMenu from '../../Components/Explore_Menu/Explore_Menu'
import { useState } from 'react'
import Product_Item_List from '../../Components/Product_Item_List/Product_Item_List';
import { grocerys_list } from '../../assets/Images/assets';

const Grocery = () => {
    const [category, setCategory] = useState("Grocery")
    return (
        <>
            <Banners
                title1='Buy Healthy'
                title2='Make Healthy'
                heading='CHOOSE FRESH AND HEALTHY ITEMS'
                item_img={Grocery_img}
                backgroundColor='#D5B4B4'
            />
            <ExploreMenu category={category} setCategory={setCategory} />
            <Product_Item_List
                items={grocerys_list}
            />
        </>
    )
}

export default Grocery