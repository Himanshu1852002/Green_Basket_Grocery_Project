import './Blog.css';
import blog_fruit from '../../../assets/Images/Images/blog_fruit.png';
import blog_vege from '../../../assets/Images/Images/blog_vege.png';
import blog_choco from '../../../assets/Images/Images/blog_choco.png';

const Blog = () => {
    return (
        <div className="container-fluid blog_container">
            <div className="row blog_row d-flex justify-content-center align-items-center">
                <div className="col-12 d-flex justify-content-center flex-column align-items-center">
                    <p className=' text-white'>Home &gt; Blog</p>
                    <h1 className="fw-bold text-white">OUR BLOGS</h1>
                </div>
            </div>

            <div className="row d-flex justify-content-center align-items-center mx-3 my-5">
                <div className="col-lg-6 col-sm-6 col-12 d-flex justify-content-center align-items-center">
                    
                        <img src={blog_fruit} className="h-50 w-50" alt="Healthy Fruits" />
                </div>
                <div className='className="col-lg-6 col-sm-6 col-12 d-flex flex-column '>
                    <h2 className='fw-bold'>FRUITS</h2>
                    <p className='blog_text'>Experience the vibrant flavors of nature with our fresh and juicy fruits. Packed with essential vitamins and minerals, they’re a perfect way to boost your energy and stay healthy. Whether it’s a quick snack or a refreshing addition to your meals, our fruits are here to brighten your day with natural sweetness.</p>
                </div>
            </div>
            <div className="row d-flex justify-content-center align-items-center mx-3">
                    <div className='className="col-lg-6 col-sm-6 col-12 d-flex flex-column '>
                        <h2 className='fw-bold'>VEGETABLES</h2>
                    <p className='blog_text'>Enjoy the finest selection of fresh and crisp vegetables straight from the farm. Full of nutrients and flavor, they’re perfect for creating wholesome and delicious meals for your family. From leafy greens to crunchy favorites, our vegetables are your go-to for a healthy lifestyle.</p>
                    </div>
                <div className="col-lg-6 col-sm-6 col-12 d-flex justify-content-center align-items-center">
                    <img src={blog_vege} className="h-50 w-50" alt="Organic Veges" />
                </div>
               
            </div>
            <div className="row d-flex justify-content-center align-items-center mx-3 my-5">
                <div className="col-lg-6 col-sm-6 col-12 d-flex justify-content-center align-items-center">
                    <img src={blog_choco} className="h-50 w-50"  alt="Testy Chocolate" />
                </div>
                <div className='className="col-lg-6 col-sm-6 col-12 d-flex flex-column '>
                    <h2 className='fw-bold'>CHOCOLATES</h2>
                    <p className='blog_text'>Delight in the rich and creamy taste of our premium chocolates, crafted to perfection for every occasion. Whether it’s a simple indulgence, a thoughtful gift, or a sweet treat to lift your spirits, our chocolates bring moments of happiness to your day. Indulge guilt-free in the magic of sweetness.</p>
                </div>
            </div>
        </div>
    );
};

export default Blog;
