import veges_img from '../../../assets/Images/Images/veges.png';
import Banners from "../../../Components/User/Banners/Banners";
import ExploreMenu from "../../../Components/User/Explore_Menu/Explore_Menu";
import Product_Item_List from "../../../Components/User/Product_Item_List/Product_Item_List";
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
        const timer = setTimeout(() => { dispatch(fetchProductsByCategory(category)); }, 300);
        return () => clearTimeout(timer);
    }, [dispatch, category]);

    return (
        <>
            <Banners
                tag="🥦 Farm Fresh"
                title1="Green &"
                title2="Fresh Vegetables"
                subtitle="Sourced directly from local farms. Crisp, nutritious, and delivered fresh every morning."
                item_img={veges_img}
                stats={[
                    { value: '40+', label: 'Varieties' },
                    { value: 'Daily', label: 'Fresh Stock' },
                    { value: '100%', label: 'Organic' },
                ]}
            />
            <ExploreMenu category={category} setCategory={setCategory} />
            {status === "failed" && <p className="text-center py-5 text-danger">Error: {error}</p>}
            <Product_Item_List items={status === "succeeded" ? products : []} loading={status === "loading"} />
        </>
    );
};

export default Vegetables;
