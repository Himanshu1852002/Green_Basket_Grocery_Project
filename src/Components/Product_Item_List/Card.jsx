import PropTypes from "prop-types";

const Card = ({ title, price, imageSrc }) => {

    return (
        <div className="col-lg-3 col-md-6 col-sm-6 col-12 mb-3">
            <div className="card product_card">
                <img src={imageSrc} className="card-img-top" alt={title} />
                <div className="card-body product_card_body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{price}</p>
                    <button className="btn ">Add to cart</button>
                </div>
            </div>
        </div>
    );
}

Card.propTypes = {
    title: PropTypes.string.isRequired,
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    imageSrc: PropTypes.string.isRequired,
};



export default Card