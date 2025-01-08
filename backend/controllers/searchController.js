import productModel from '../models/productModel.js'

const search = async (req, res) => {
    const query = req.query.q;

    // if (!query) {
    //     return res.status(400).json({ message: "Search query is required" });
    // }

    try {
        const results = await productModel.find({
            name: { $regex: query, $options: 'i' }
        });

        if (results.length === 0) {
            return res.status(404).json({ message: "No products found" });
        }

        const resultsWithFullImageUrl = results.map(product => ({
            ...product.toObject(),
            image: `http://localhost:3000/uploads/${product.image}`
        }));

        res.status(200).json({ success: true, results: resultsWithFullImageUrl })
    } catch (error) {
        console.error("Error searching products:", error);
        res.status(500).json({ message: "Failed to search products" });
    }
}
export { search }