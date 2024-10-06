import Banners from "../../Components/Banners/Banners"
import choco from '../../assets/Images/Images/Chocoo.png'
const Chocolate = () => {
    return (
        <>
            <Banners
                title1="Teasty and"
                title2="Yummy Chocolates"
                heading="EAT TESTY CHOCOLATES HERE"
                item_img={choco}
            />
        </>
    )
}

export default Chocolate