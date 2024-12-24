import Banners from "../../Components/Banners/Banners";
import Product_Item_List from "../../Components/Product_Item_List/Product_Item_List";
import chocolate from '../../assets/Images/Images/Chocoo.png';
import Explore_Menu from '../../Components/Explore_Menu/Explore_Menu'
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsByCategory, getProductsError, getProductsStatus, selectAllProducts } from '../../Store/productsSlice';

const Chocolate = () => {
    const [category, setCategory] = useState("Chocolates");
    const dispatch = useDispatch();

    const products = useSelector(selectAllProducts);
    const status = useSelector(getProductsStatus);
    const error = useSelector(getProductsError);

    useEffect(() => {
        dispatch(fetchProductsByCategory(category));
    }, [dispatch, category])


    return (
        <>
            <Banners
                title1="Teasty and"
                title2="Yummy Chocolates"
                heading="EAT TESTY CHOCOLATES HERE"
                item_img={chocolate}
                // backgroundColor="linear-gradient(to left,#F6B165,#D58D57,#B36C49,#914F3B,#6F362D,#4E211F,#2C1112)"
                backgroundColor="linear-gradient(to bottom,#291c0e,#6e473b,#beb5a9,#e1d4c2)"
            />
            <Explore_Menu category={category} setCategory={setCategory} />
            {status === 'loading' && <p>Loading products...</p>}
            {status === 'failed' && <p>Error: {error}</p>}
            {status === 'succeeded' && (
                <Product_Item_List items={products} />
            )}

        </>
    )
}

export default Chocolate