// eslint-disable-next-line no-unused-vars
import React from 'react'
import './Testimonial.css';
import person1 from '../../assets/Images/Images/1.png';
import person2 from '../../assets/Images/Images/2.png';
import person3 from '../../assets/Images/Images/3.png';
import person4 from '../../assets/Images/Images/4.png';
import person5 from '../../assets/Images/Images/5.png';
import person6 from '../../assets/Images/Images/6.png';

const Testimonial = () => {
    return (
        <div>
            <div className="testimonials py-5">
                <div className="container">
                    <h1>Testimonials</h1>
                    <p className="text-center mb-4">Please Give Your Feedback for Green Basket</p>
                    <div id="testimonialCarousel" className="carousel slide" data-bs-ride="carousel">
                        <div className="carousel-inner">
                            <div className="carousel-item active">
                                <div className="row">
                                    <div className="col-md-4 mt-5">
                                        <div className="profile text-center">
                                            <img src={person1} className="user" alt="person" />
                                            <blockquote className="blockquote">
                                                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minima natus eius,
                                                    atque sed inventore nulla! Cupiditate soluta porro obcaecati id iusto amet
                                                    facere totam voluptas.</p>
                                            </blockquote>
                                            <h3>Kuldeep Mangrola <br /><span>Customer of GB</span></h3>
                                        </div>
                                    </div>
                                    <div className="col-md-4 mt-5">
                                        <div className="profile text-center">
                                            <img src={person2} className="user" alt="person" />
                                            <blockquote className="blockquote">
                                                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minima natus eius,
                                                    atque sed inventore nulla! Cupiditate soluta porro obcaecati id iusto amet
                                                    facere totam voluptas.</p>
                                            </blockquote>
                                            <h3>Arpit Vishwakarma <br /><span>Customer of GB</span></h3>
                                        </div>
                                    </div>
                                    <div className="col-md-4 mt-5">
                                        <div className="profile text-center">
                                            <img src={person3} className="user" alt="person" />
                                            <blockquote className="blockquote">
                                                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minima natus eius,
                                                    atque sed inventore nulla! Cupiditate soluta porro obcaecati id iusto amet
                                                    facere totam voluptas.</p>
                                            </blockquote>
                                            <h3>Anikesh Chouhan <br /><span>Customer of GB</span></h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="carousel-item">
                                <div className="row">
                                    <div className="col-md-4 mt-5">
                                        <div className="profile text-center">
                                            <img src={person4} className="user" alt="person" />
                                            <blockquote className="blockquote">
                                                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minima natus eius,
                                                    atque sed inventore nulla! Cupiditate soluta porro obcaecati id iusto amet
                                                    facere totam voluptas.</p>
                                            </blockquote>
                                            <h3>Rahul Sharma <br /><span>Customer of GB</span></h3>
                                        </div>
                                    </div>
                                    <div className="col-md-4 mt-5">
                                        <div className="profile text-center">
                                            <img src={person5} className="user" alt="person" />
                                            <blockquote className="blockquote">
                                                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minima natus eius,
                                                    atque sed inventore nulla! Cupiditate soluta porro obcaecati id iusto amet
                                                    facere totam voluptas.</p>
                                            </blockquote>
                                            <h3>Priya Singh <br /><span>Customer of GB</span></h3>
                                        </div>
                                    </div>
                                    <div className="col-md-4 mt-5">
                                        <div className="profile text-center">
                                            <img src={person6} className="user" alt="person" />
                                            <blockquote className="blockquote">
                                                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minima natus eius,
                                                    atque sed inventore nulla! Cupiditate soluta porro obcaecati id iusto amet
                                                    facere totam voluptas.</p>
                                            </blockquote>
                                            <h3>Sneha Patel <br /><span>Customer of GB</span></h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button className="carousel-control-prev cc-prev" type="button" data-bs-target="#testimonialCarousel" data-bs-slide="prev">
                            <span className="carousel-control-prev-icon cc-prev-icon" aria-hidden="true" />
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button className="carousel-control-next cc-next" type="button" data-bs-target="#testimonialCarousel" data-bs-slide="next">
                            <span className="carousel-control-next-icon cc-next-icon" aria-hidden="true" />
                            <span className="visually-hidden">Next</span>
                        </button>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Testimonial