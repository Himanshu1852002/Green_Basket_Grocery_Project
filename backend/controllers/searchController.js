import productModel from '../models/productModel.js'

const search = async (req, res) => {
    const query = req.query.q;
    try {
        const results = await productModel.find({
            name: { $regex: query, $options: 'i' }
        });

        if (results.length === 0) {
            return res.status(404).json({ message: "No products found" });
        }
        const url = "https://green-basket-grocery-project.onrender.com";
        const resultsWithFullImageUrl = results.map(product => ({
            ...product.toObject(),
            image: `${url}/uploads/${product.image}`
        }));

        res.status(200).json({ success: true, results: resultsWithFullImageUrl })
    } catch (error) {
        console.error("Error searching products:", error);
        res.status(500).json({ message: "Failed to search products" });
    }
}
export { search }