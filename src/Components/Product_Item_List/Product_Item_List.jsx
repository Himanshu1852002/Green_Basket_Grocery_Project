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
                    {row.map((card, index) => (
                        <Card key={index} title={card.item_name} price={card.item_price} imageSrc={card.imgSrc} />
                    ))}
                </div>
            ))}
        </div>
    );
};

Product_Item_List.propTypes = {
    items: PropTypes.arrayOf(
        PropTypes.shape({
            item_name: PropTypes.string.isRequired,
            item_price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            imgSrc: PropTypes.string.isRequired,
        })
    ).isRequired,
};

export default Product_Item_List;
