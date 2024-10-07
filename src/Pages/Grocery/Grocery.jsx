import Grocery_img from '../../assets/Images/Images/grocery_items.png'
import Banners from '../../Components/Banners/Banners'
import ExploreMenu from '../../Components/Explore_Menu/Explore_Menu'
import { useState } from 'react'

const Grocery = () => {
    const [category, setCategory] = useState("Grocery")
    return (
        <>
            <Banners
                title1='Buy Healthy'
                title2='Make Healthy'
                heading='CHOOSE FRESH AND HEALTHY ITEMS'
                item_img={Grocery_img}
            />
            <ExploreMenu category={category} setCategory={setCategory} />
        </>
    )
}

export default Grocery