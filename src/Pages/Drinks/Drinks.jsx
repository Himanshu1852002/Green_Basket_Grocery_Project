import Banners from "../../Components/Banners/Banners"
import coldrinks_img from '../../assets/Images/Images/coldrinks.png'
const Drinks = () => {
    return (
        <>
            <Banners
                title1="Cool and"
                title2="Fresh Drinks"
                heading="DRINK FRESH AND MOOD FRESH"
                item_img={coldrinks_img}
            />
        </>
    )
}

export default Drinks