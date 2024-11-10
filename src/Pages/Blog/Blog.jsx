import './Blog.css';
import blog_fruit from '../../assets/Images/Images/blog_fruit.png';
import blog_vege from '../../assets/Images/Images/blog_vege.png';
import blog_choco from '../../assets/Images/Images/blog_choco.png';

const Blog = () => {
    return (
        <div className="container-fluid blog_container">
            <div className="row blog_row d-flex justify-content-center align-items-center">
                <div className="col-12 d-flex justify-content-center align-items-center">
                    <h1 className="fw-bold fs-1">OUR BLOGS</h1>
                </div>
            </div>

            <div className="row d-flex justify-content-center align-items-center mx-3 my-5">
                <div className="col-lg-6 col-sm-6 col-12 d-flex justify-content-center align-items-center">
                    
                        <img src={blog_fruit} className="h-50 w-50" alt="Healthy Fruits" />
                </div>
                <div className='className="col-lg-6 col-sm-6 col-12 d-flex flex-column '>
                    <h2 className='fw-bold'>FRUITS</h2>
                    <p className='blog_text'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore, odit ratione tenetur quae optio tempore blanditiis beatae fugiat unde eveniet animi amet ipsam commodi vel minima distinctio totam tempora esse temporibus delectus, pariatur praesentium in? Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem provident libero maiores, fugiat sed vel.</p>
                </div>
            </div>
            <div className="row d-flex justify-content-center align-items-center mx-3">
                    <div className='className="col-lg-6 col-sm-6 col-12 d-flex flex-column '>
                        <h2 className='fw-bold'>VEGETABLES</h2>
                        <p className='blog_text'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore, odit ratione tenetur quae optio tempore blanditiis beatae fugiat unde eveniet animi amet ipsam commodi vel minima distinctio totam tempora esse temporibus delectus, pariatur praesentium in? Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem provident libero maiores, fugiat sed vel.</p>
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
                    <p className='blog_text'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore, odit ratione tenetur quae optio tempore blanditiis beatae fugiat unde eveniet animi amet ipsam commodi vel minima distinctio totam tempora esse temporibus delectus, pariatur praesentium in? Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem provident libero maiores, fugiat sed vel.</p>
                </div>
            </div>
        </div>
    );
};

export default Blog;
