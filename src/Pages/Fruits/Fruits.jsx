import fruits_img from '../../assets/Images/Images/fruits.jpg';
import Banners from "../../Components/Banners/Banners"
import Product_Item_List from '../../Components/Product_Item_List/Product_Item_List';
import ExploreMenu from '../../Components/Explore_Menu/Explore_Menu';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsByCategory, getProductsError, getProductsStatus, selectAllProducts } from '../../Store/productsSlice';


const Fruits = () => {
    const [category, setCategory] = useState("Fruits");
    const dispatch = useDispatch();

    const products = useSelector(selectAllProducts);
    const status = useSelector(getProductsStatus);
    const error = useSelector(getProductsError);

    useEffect(() => {
        dispatch(fetchProductsByCategory(category));
    }, [dispatch, category])

    return (
        <>
            <Banners
                title1='Fresh &'
                title2='The Juicy Fruits'
                heading='CHOOSE FROM OUR BEST ITEMS'
                item_img={fruits_img}
                backgroundColor='linear-gradient(to top,#FFC800, #FF8F00,#FF7200,#FF5500,#FF0000'

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

export default Fruits