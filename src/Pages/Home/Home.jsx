import Hero from "../../Components/Hero_Banner/Hero"
import ExploreMenu from '../../Components/Explore_Menu/Explore_Menu'
import Featured_Product from "../../Components/Featured_Product/Featured_Product"
import Testimonial from '../../Components/Testimonial/Testimonial';
import { useState } from "react";
import Support_Banner from "../../Components/Support_Banner/Support_Banner";
import Delivery_Banner from "../../Components/Delivery_Banner/Delivery_Banner";

const Home = () => {

    const [category, setCategory] = useState("All")

    return (
        <div>
            <Hero />
            <ExploreMenu category={category} setCategory={setCategory} />
            <Featured_Product />
            <Testimonial />
            <Delivery_Banner />
            <Support_Banner />
        </div>
    )
}

export default Home