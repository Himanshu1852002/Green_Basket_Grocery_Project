import Hero from "../../../Components/User/Hero_Banner/Hero";
import ExploreMenu from '../../../Components/User/Explore_Menu/Explore_Menu';
import FeaturedProduct from "../../../Components/User/Featured_Product/FeaturedProduct";
import Testimonial from '../../../Components/User/Testimonial/Testimonial';
import Support_Banner from "../../../Components/User/Support_Banner/Support_Banner";
import Delivery_Banner from "../../../Components/User/Delivery_Banner/Delivery_Banner";
import { useState } from "react";

const Home = () => {

    const [category, setCategory] = useState("All");

    return (
        <>
            <div>
                <Hero />
                <ExploreMenu category={category} setCategory={setCategory} />
                <FeaturedProduct />
                <Testimonial />
                <Delivery_Banner />
                <Support_Banner />
            </div>
        </>
    );
}

export default Home