import Grocery_img from '../../../assets/Images/Images/grocery.png';
import Banners from '../../../Components/User/Banners/Banners';
import ExploreMenu from '../../../Components/User/Explore_Menu/Explore_Menu';
import Product_Item_List from '../../../Components/User/Product_Item_List/Product_Item_List';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsByCategory, getProductsError, getProductsStatus, selectAllProducts } from '../../../Store/productsSlice';

const Grocery = () => {
    const [category, setCategory] = useState("Grocery");
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
                tag="🛒 Daily Essentials"
                title1="Buy Healthy,"
                title2="Live Healthy"
                subtitle="Stock up on all your daily essentials — from grains and spices to oils and dairy. Quality guaranteed."
                item_img={Grocery_img}
                stats={[
                    { value: '200+', label: 'Products' },
                    { value: 'Daily', label: 'Restocked' },
                    { value: 'Best', label: 'Prices' },
                ]}
            />
            <ExploreMenu category={category} setCategory={setCategory} />
            {status === 'failed' && <p className="text-center py-5 text-danger">Error: {error}</p>}
            <Product_Item_List items={status === 'succeeded' ? products : []} loading={status === 'loading'} />
        </>
    );
};

export default Grocery;
