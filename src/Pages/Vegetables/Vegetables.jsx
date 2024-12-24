import Banners from "../../Components/Banners/Banners"
import ExploreMenu from "../../Components/Explore_Menu/Explore_Menu"
import Product_Item_List from "../../Components/Product_Item_List/Product_Item_List"
import veges_img from '../../assets/Images/Images/veges.png'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsByCategory, getProductsError, getProductsStatus, selectAllProducts } from '../../Store/productsSlice';

const Vegetables = () => {
    const [category, setCategory] = useState("Vegetables");
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
                title1="Green &"
                title2="Fresh Vegetables"
                heading="CHOOSE FRESH AND GREEN VEGETABLES FOR HEALTH"
                item_img={veges_img}
                // backgroundColor="linear-gradient(to left,#9CD4A4,#78B97B,#5D9F59,#49843E,#396929,#2A4E17,#1D340B)"
                backgroundColor="linear-gradient(to bottom,#0f2a1d,#375534,#6b9071,#aec3b0,#e3eed4)"
            />
            <ExploreMenu category={category} setCategory={setCategory} />
            {status === 'loading' && <p>Loading products...</p>}
            {status === 'failed' && <p>Error: {error}</p>}
            {status === 'succeeded' && (
                <Product_Item_List items={products} />
            )}
        </>
    )
}

export default Vegetables