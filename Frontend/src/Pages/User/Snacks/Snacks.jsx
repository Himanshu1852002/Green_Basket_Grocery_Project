import chips_img from '../../../assets/Images/Images/snacks_banner.png';
import Banners from '../../../Components/User/Banners/Banners';
import Product_Item_List from '../../../Components/User/Product_Item_List/Product_Item_List';
import ExploreMenu from '../../../Components/User/Explore_Menu/Explore_Menu';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsByCategory, getProductsError, getProductsStatus, selectAllProducts } from '../../../Store/productsSlice';

const Snacks = () => {
    const [category, setCategory] = useState("Snacks");
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
                tag="🍟 Munch Time"
                title1="Spicy &"
                title2="Crunchy Snacks"
                subtitle="From crispy chips to savory bites — explore our snack collection perfect for every mood and moment."
                item_img={chips_img}
                stats={[
                    { value: '40+', label: 'Varieties' },
                    { value: 'Crispy', label: 'Always' },
                    { value: 'Best', label: 'Sellers' },
                ]}
            />
            <ExploreMenu category={category} setCategory={setCategory} />
            {status === 'failed' && <p className="text-center py-5 text-danger">Error: {error}</p>}
            <Product_Item_List items={status === 'succeeded' ? products : []} loading={status === 'loading'} />
        </>
    );
};

export default Snacks;
