import Grocery_img from '../../assets/Images/Images/grocery_items.png'
import Banners from '../../Components/Banners/Banners'
import ExploreMenu from '../../Components/Explore_Menu/Explore_Menu'

const Grocery = () => {
    return (
        <>
            <Banners
                title1='Buy Healthy'
                title2='Make Healthy'
                heading='CHOOSE FRESH AND HEALTHY ITEMS'
                item_img={Grocery_img}
            />
            <ExploreMenu />
        </>
    )
}

export default Grocery