import { useDispatch, useSelector } from "react-redux";
import Banners from "../../Components/Banners/Banners";
import ExploreMenu from "../../Components/Explore_Menu/Explore_Menu";
import Product_Item_List from "../../Components/Product_Item_List/Product_Item_List";
import coldrinks_img from '../../assets/Images/Images/coldrinks.png';
import { useState, useEffect } from "react";
import { fetchProductsByCategory, getProductsError, getProductsStatus, selectAllProducts } from '../../Store/productsSlice';

const Drinks = () => {
    const [category, setCategory] = useState("Coldrinks");
    const dispatch = useDispatch();

    const products = useSelector(selectAllProducts);
    const status = useSelector(getProductsStatus);
    const error = useSelector(getProductsError);

    useEffect(() => {
        dispatch(fetchProductsByCategory(category));
    }, [dispatch, category]);

    return (
        <>
            <Banners
                title1="Cool and"
                title2="Fresh Drinks"
                heading="DRINK FRESH AND MOOD FRESH"
                item_img={coldrinks_img}
                backgroundColor="linear-gradient( to top,  rgba(126,184,253,1) 5.6%, rgba(2,71,157,1) 95.3% )"
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

export default Drinks