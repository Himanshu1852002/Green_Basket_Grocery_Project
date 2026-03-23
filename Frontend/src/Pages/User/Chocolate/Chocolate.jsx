import chocolate from '../../../assets/Images/Images/Chocoo.png';
import Banners from "../../../Components/User/Banners/Banners";
import Product_Item_List from "../../../Components/User/Product_Item_List/Product_Item_List";
import Explore_Menu from '../../../Components/User/Explore_Menu/Explore_Menu';
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsByCategory, getProductsError, getProductsStatus, selectAllProducts } from '../../../Store/productsSlice';

const Chocolate = () => {
    const [category, setCategory] = useState("Chocolates");
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
                tag="🍫 Sweet Treats"
                title1="Tasty &"
                title2="Yummy Chocolates"
                subtitle="Indulge in premium chocolates and sweet treats. From rich dark to creamy milk — something for every craving."
                item_img={chocolate}
                stats={[
                    { value: '30+', label: 'Brands' },
                    { value: 'Premium', label: 'Quality' },
                    { value: 'Gift', label: 'Ready' },
                ]}
            />
            <Explore_Menu category={category} setCategory={setCategory} />
            {status === 'failed' && <p className="text-center py-5 text-danger">Error: {error}</p>}
            <Product_Item_List items={status === 'succeeded' ? products : []} loading={status === 'loading'} />
        </>
    );
};

export default Chocolate;
