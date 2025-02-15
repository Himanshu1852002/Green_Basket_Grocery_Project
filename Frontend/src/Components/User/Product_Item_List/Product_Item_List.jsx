import Card from "./Card";
import PropTypes from "prop-types";
import './Product_Item_List.css';

const Product_Item_List = ({ items = [] }) => {
    const rows = [];
    for (let i = 0; i < items.length; i += 4) {
        rows.push(items.slice(i, i + 4));
    }
    const url = "https://green-basket-grocery-project.onrender.com"

    return (
        <div className="container product_container">
            {rows.map((row, rowIndex) => (
                <div className="row" key={rowIndex}>
                    {row.map((item, index) => {
                        const imageUrl = `${url}/uploads/${item.image}`;
                        return (
                            <Card
                                key={index}
                                _id={item._id}
                                name={item.name}
                                sellingPrice={item.sellingPrice}
                                price={item.price}
                                image={imageUrl}
                                unit={item.unit}
                                description={item.description}
                            />
                        );
                    })}
                </div>
            ))}
        </div>
    );
};

Product_Item_List.propTypes = {
    items: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            name: PropTypes.string.isRequired,
            price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            image: PropTypes.string.isRequired,
            unit: PropTypes.string.isRequired,
        })
    ).isRequired,
};

export default Product_Item_List;
