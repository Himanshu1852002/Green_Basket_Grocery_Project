import Banners from "../../../Components/User/Banners/Banners"
import ExploreMenu from "../../../Components/User/Explore_Menu/Explore_Menu"
import Product_Item_List from "../../../Components/User/Product_Item_List/Product_Item_List"
import veges_img from '../../../assets/Images/Images/veges.png'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsByCategory, getProductsError, getProductsStatus, selectAllProducts } from '../../../Store/productsSlice';

const Vegetables = () => {
    const [category, setCategory] = useState("Vegetables");
    const dispatch = useDispatch();

    const products = useSelector(selectAllProducts);
    const status = useSelector(getProductsStatus);
    const error = useSelector(getProductsError);

    useEffect(() => {
        // Fetch products whenever category changes
        const timer = setTimeout(() => {
            dispatch(fetchProductsByCategory(category));
        }, 300); // Small delay for better UX

        return () => clearTimeout(timer);
    }, [dispatch, category]); // Remove `status` dependency


    return (
        <>
            <Banners
                title1="Green &"
                title2="Fresh Vegetables"
                heading="CHOOSE FRESH AND GREEN VEGETABLES FOR HEALTH"
                item_img={veges_img}
                backgroundColor="linear-gradient(to bottom,#0f2a1d,#375534,#6b9071,#aec3b0,#e3eed4)"
            />
            <ExploreMenu category={category} setCategory={setCategory} />
            {status === "loading" && <p>Loading products...</p>}
            {status === "failed" && <p>Error: {error}</p>}
            {status === "succeeded" && <Product_Item_List items={products} />}
        </>
    )
}

export default Vegetables