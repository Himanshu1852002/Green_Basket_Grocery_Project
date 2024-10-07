import chips_img from '../../assets/Images/Images/Chipss.png'
import Banners from '../../Components/Banners/Banners'
import Product_Item_List from '../../Components/Product_Item_List/Product_Item_List'
import { snacks_list } from '../../assets/Images/assets'
import ExploreMenu from '../../Components/Explore_Menu/Explore_Menu'

const Snacks = () => {
    return (
        <>
            <Banners
                title1='Spicy and'
                title2='Cruchy Snacks'
                heading='CHOOSE CRUNCHINES FOR MORNING MOOD'
                item_img={chips_img}
            />
            <ExploreMenu />
            <Product_Item_List
                items={snacks_list}
            />
        </>
    )
}

export default Snacks