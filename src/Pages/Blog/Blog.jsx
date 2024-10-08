import './Blog.css';
import blog_fruit from '../../assets/Images/Images/blog_fruit.png';
import blog_vege from '../../assets/Images/Images/blog_vege.png';
import blog_choco from '../../assets/Images/Images/blog_choco.png';

const Blog = () => {
    return (
        <div className="container-fluid blog_container">
            <div className="row blog_row d-flex justify-content-center align-items-center">
                <div className="col-12 d-flex justify-content-center align-items-center">
                    <h1 className="fw-bold fs-1">OUR BLOG</h1>
                </div>
            </div>

            <div className="row d-flex justify-content-center align-items-center my-5">
                <div className="col-lg-4 col-sm-6 col-12 d-flex justify-content-center align-items-center">
                    <div className="card" style={{ width: '18rem' }}>
                        <img src={blog_fruit} className="card-img-top" alt="Healthy Fruits" />
                        <div className="card-body">
                            <h5 className="card-title">Healthy Fruits</h5>
                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card content.</p>
                            <a href="#" className="btn btn-primary">Learn More</a>
                        </div>
                    </div>
                </div>

                <div className="col-lg-4 col-sm-6 col-12 d-flex justify-content-center align-items-center">
                    <div className="card" style={{ width: '18rem' }}>
                        <img src={blog_vege} className="card-img-top" alt="Organic Veges" />
                        <div className="card-body">
                            <h5 className="card-title">Organic Veges</h5>
                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card content.</p>
                            <a href="#" className="btn btn-primary">Learn More</a>
                        </div>
                    </div>
                </div>

                <div className="col-lg-4 col-sm-6 col-12 d-flex justify-content-center align-items-center">
                    <div className="card" style={{ width: '18rem' }}>
                        <img src={blog_choco} className="card-img-top" alt="Testy Chocolate" />
                        <div className="card-body">
                            <h5 className="card-title">Tasty Chocolate</h5>
                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card content.</p>
                            <a href="#" className="btn btn-primary">Learn More</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Blog;
