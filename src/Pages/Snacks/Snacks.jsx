import chips_img from '../../assets/Images/Images/snacks_banner.png'
import Banners from '../../Components/Banners/Banners'
import Product_Item_List from '../../Components/Product_Item_List/Product_Item_List'
import { snacks_list } from '../../assets/Images/assets'
import ExploreMenu from '../../Components/Explore_Menu/Explore_Menu'
import { useState } from 'react'

const Snacks = () => {
    const [category, setCategory] = useState("Snacks");
    return (
        <>
            <Banners
                title1='Spicy and'
                title2='Crunchy Snacks'
                heading='CHOOSE CRUNCHINES FOR MORNING MOOD'
                item_img={chips_img}
                // backgroundColor='linear-gradient(to bottom, #920004,#d92200,#f3500a,#f37100)'
                backgroundColor=' linear-gradient( 179deg,  rgba(0,0,0,1) 9.2%, rgba(127,16,16,1) 103.9% )'
            />
            <ExploreMenu category={category} setCategory={setCategory} />
            <Product_Item_List
                items={snacks_list}
            />
        </>
    )
}

export default Snacks