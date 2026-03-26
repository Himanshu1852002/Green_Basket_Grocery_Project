import fruits_img from '../../../assets/Images/Images/fruits.jpg';
import Banners from "../../../Components/User/Banners/Banners";
import Product_Item_List from '../../../Components/User/Product_Item_List/Product_Item_List';
import ExploreMenu from '../../../Components/User/Explore_Menu/Explore_Menu';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsByCategory, getProductsError, getProductsStatus, selectAllProducts } from '../../../Store/productsSlice';

const Fruits = () => {
    const [category, setCategory] = useState("Fruits");
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
                tag="🍎 Fresh Picks"
                title1="Fresh &"
                title2="Juicy Fruits"
                subtitle="Handpicked seasonal fruits delivered fresh to your doorstep. Rich in vitamins, bursting with flavor."
                item_img={fruits_img}
                stats={[
                    { value: '50+', label: 'Varieties' },
                    { value: '100%', label: 'Fresh' },
                    { value: '4.9★', label: 'Rated' },
                ]}
            />
            <ExploreMenu category={category} setCategory={setCategory} />
            {status === "failed" && <p className="text-center py-5 text-danger">Error: {error}</p>}
            <Product_Item_List items={status === "succeeded" ? products : []} loading={status === "loading"} />
        </>
    );
};

export default Fruits;
