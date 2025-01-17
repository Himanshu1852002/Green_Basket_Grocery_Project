import chips_img from '../../../assets/Images/Images/snacks_banner.png'
import Banners from '../../../Components/User/Banners/Banners'
import Product_Item_List from '../../../Components/User/Product_Item_List/Product_Item_List'
import ExploreMenu from '../../../Components/User/Explore_Menu/Explore_Menu'
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
                title1='Spicy and'
                title2='Crunchy Snacks'
                heading='CHOOSE CRUNCHINES FOR MORNING MOOD'
                item_img={chips_img}
                backgroundColor=' linear-gradient( 179deg,  rgba(0,0,0,1) 9.2%, rgba(127,16,16,1) 103.9% )'
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

export default Snacks