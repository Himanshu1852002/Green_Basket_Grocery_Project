import Card from "./Card";
import PropTypes from "prop-types";
import './Product_Item_List.css';

const Product_Item_List = ({ items }) => {
    const rows = [];
    for (let i = 0; i < items.length; i += 4) {
        rows.push(items.slice(i, i + 4));
    }

    return (
        <div className="container product_container">
            {rows.map((row, rowIndex) => (
                <div className="row" key={rowIndex}>
                    {row.map((item, index) => (
                        <Card key={index}
                            item_id={item.item_id}
                            title={item.item_name}
                            price={item.item_price}
                            imageSrc={item.imgSrc}
                            unit={item.unit} />
                    ))}
                </div>
            ))}
        </div>
    );
};

Product_Item_List.propTypes = {
    items: PropTypes.arrayOf(
        PropTypes.shape({
            item_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            item_name: PropTypes.string.isRequired,
            item_price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            imgSrc: PropTypes.string.isRequired,
        })
    ).isRequired,
};

export default Product_Item_List;