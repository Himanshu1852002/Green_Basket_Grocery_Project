import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import "./Testimonial.css";

const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 2,
            },
        },
        {
            breakpoint: 768,
            settings: {
                slidesToShow: 1,
            },
        },
    ],
};

const testimonials = [
    {
        name: "Anikesh Chouhan",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOuxrvcNMfGLh73uKP1QqYpKoCB0JLXiBMvA&s",
        text: "Dramatically maintain clicks-and-mortar solutions without functional solutions. Completely synergize resource-taxing relationships via premier niche markets.",
    },
    {
        name: "Arpit Vishwakarma",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOuxrvcNMfGLh73uKP1QqYpKoCB0JLXiBMvA&s",
        text: "Completely synergize resource-taxing relationships via premier niche markets. Professionally cultivate customer service with robust innovation.",
    },
    {
        name: "Aman Rathod",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOuxrvcNMfGLh73uKP1QqYpKoCB0JLXiBMvA&s",
        text: "Dramatically maintain clicks-and-mortar solutions without functional solutions. Completely synergize resource-taxing relationships.",
    },
    {
        name: "Kuldeep Mangrola",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOuxrvcNMfGLh73uKP1QqYpKoCB0JLXiBMvA&s",
        text: "Professionally cultivate customer service with robust ideas. Completely synergize resource-taxing relationships via premier niche markets.",
    },
    {
        name: "Rohit",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOuxrvcNMfGLh73uKP1QqYpKoCB0JLXiBMvA&s",
        text: "Dramatically maintain clicks-and-mortar solutions without functional solutions. Completely synergize resource-taxing relationships via premier niche markets.",
    },
];

const Testimonial = () => (
    <div className="testimonial-container container">
        <h1 className="testimonial-title">The Happy <span>Client</span></h1>
        <Slider {...settings}>
            {testimonials.map((testimonial, index) => (
                <div className="item" key={index}>
                    <div className="shadow-effect">
                        <img
                            src={testimonial.image}
                            alt={testimonial.name}
                            className="rounded-circle"
                        />
                        <p>{testimonial.text}</p>
                    </div>
                    <div className="testimonial-name">{testimonial.name}</div>
                </div>
            ))}
        </Slider>
    </div>
);

export default Testimonial;
