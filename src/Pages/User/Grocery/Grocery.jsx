import Grocery_img from '../../../assets/Images/Images/grocery.png'
import Banners from '../../../Components/User/Banners/Banners'
import ExploreMenu from '../../../Components/User/Explore_Menu/Explore_Menu'
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
        const timer = setTimeout(() => {
            if (status === "idle") {
                dispatch(fetchProductsByCategory(category));
            }
        }, 300);

        return () => clearTimeout(timer);
    }, [dispatch, category, status]);

    return (
        <>
            <Banners
                title1='Buy Healthy'
                title2='Make Healthy'
                heading='CHOOSE FRESH AND HEALTHY ITEMS'
                item_img={Grocery_img}
                backgroundColor='linear-gradient(to top,#95C4B4, #8EBCB1,#549895,#387271,#245254'
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

export default Grocery