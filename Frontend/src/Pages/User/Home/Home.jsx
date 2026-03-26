import Hero from "../../../Components/User/Hero_Banner/Hero";
import ExploreMenu from '../../../Components/User/Explore_Menu/Explore_Menu';
import TopSelling from "../../../Components/User/Top_Selling/TopSelling";
import TrendingProducts from '../../../Components/User/Trending_Products/TrendingProducts';
import Testimonial from '../../../Components/User/Testimonial/Testimonial';
import Delivery_Banner from "../../../Components/User/Delivery_Banner/Delivery_Banner";
import CategoryCards from "../../../Components/User/Category_Cards/CategoryCards";
import FlashSale from "../../../Components/User/Flash_Sale/FlashSale";
import WhyChooseUs from "../../../Components/User/Why_Choose_Us/WhyChooseUs";
import Newsletter from "../../../Components/User/Newsletter/Newsletter";
import { useState } from "react";

const Home = () => {

    const [category, setCategory] = useState("All");

    return (
        <>
            <div style={{ background: '#f7fbf7' }}>
                <Hero />
                <ExploreMenu category={category} setCategory={setCategory} />
                <TopSelling />
                <FlashSale />
                <CategoryCards />
                <TrendingProducts />
                <Testimonial />
                <Delivery_Banner />
                <WhyChooseUs />
                <Newsletter />
            </div>
        </>
    );
}

export default Home