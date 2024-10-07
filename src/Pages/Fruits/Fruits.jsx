import fruits_img from '../../assets/Images/Images/fruits.jpg';
import Banners from "../../Components/Banners/Banners"
import Product_Item_List from '../../Components/Product_Item_List/Product_Item_List';
import { fruits_list } from '../../assets/Images/assets'
import ExploreMenu from '../../Components/Explore_Menu/Explore_Menu';
const Fruits = () => {
    return (
        <>
            <Banners
                title1='Fresh'
                title2='Fruits'
                heading='CHOOSE FROM OUR BEST ITEMS'
                item_img={fruits_img}

            />
            <ExploreMenu />
            <Product_Item_List
                items={fruits_list}
            />
        </>
    )
}

export default Fruits