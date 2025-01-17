import Hero from "../../../Components/User/Hero_Banner/Hero";
import ExploreMenu from '../../../Components/User/Explore_Menu/Explore_Menu';
import Featured_Product from "../../../Components/User/Featured_Product/Featured_Product";
import Testimonial from '../../../Components/User/Testimonial/Testimonial';
import Support_Banner from "../../../Components/User/Support_Banner/Support_Banner";
import Delivery_Banner from "../../../Components/User/Delivery_Banner/Delivery_Banner";
import { useState } from "react";
import Footer from "../../../Components/User/Footer/Footer";

const Home = () => {

    const [category, setCategory] = useState("All");

    return (
        <>
            <div>
                <Hero />
                <ExploreMenu category={category} setCategory={setCategory} />
                <Featured_Product />
                <Testimonial />
                <Delivery_Banner />
                <Support_Banner />
                <Footer />
            </div>
        </>
    );
}

export default Home