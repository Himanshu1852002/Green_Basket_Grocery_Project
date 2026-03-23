import coldrinks_img from '../../../assets/Images/Images/coldrinks.png';
import Banners from "../../../Components/User/Banners/Banners";
import ExploreMenu from "../../../Components/User/Explore_Menu/Explore_Menu";
import Product_Item_List from "../../../Components/User/Product_Item_List/Product_Item_List";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsByCategory, getProductsError, getProductsStatus, selectAllProducts } from '../../../Store/productsSlice';

const Drinks = () => {
    const [category, setCategory] = useState("Coldrinks");
    const dispatch = useDispatch();
    const products = useSelector(selectAllProducts);
    const status = useSelector(getProductsStatus);
    const error = useSelector(getProductsError);

    useEffect(() => {
        const timer = setTimeout(() => { dispatch(fetchProductsByCategory(category)); }, 300);
        return () => clearTimeout(timer);
    }, [dispatch, category]);

    return (
        <>
            <Banners
                tag="🥤 Stay Refreshed"
                title1="Cool &"
                title2="Fresh Drinks"
                subtitle="Beat the heat with our wide range of refreshing cold drinks, juices, and beverages. Chilled and ready to go."
                item_img={coldrinks_img}
                stats={[
                    { value: '25+', label: 'Brands' },
                    { value: 'Ice', label: 'Cold' },
                    { value: 'Fast', label: 'Delivery' },
                ]}
            />
            <ExploreMenu category={category} setCategory={setCategory} />
            {status === 'failed' && <p className="text-center py-5 text-danger">Error: {error}</p>}
            <Product_Item_List items={status === 'succeeded' ? products : []} loading={status === 'loading'} />
        </>
    );
};

export default Drinks;
