import productModel from '../models/productModel.js';
import fs from 'fs';


// add product

const addProduct = async (req, res) => {
    let image_filename = `${req.file.filename}`;
    try {
        const exists = await productModel.findOne({ name: { $regex: new RegExp(`^${req.body.name}$`, 'i') } });
        if (exists) return res.json({ success: false, message: 'Product with this name already exists' });

        if (Number(req.body.sellingPrice) > Number(req.body.price))
            return res.json({ success: false, message: 'Selling price cannot be greater than MRP' });

        const product = new productModel({
            name: req.body.name,
            unit: req.body.unit,
            description: req.body.description,
            price: req.body.price,
            sellingPrice: req.body.sellingPrice,
            category: req.body.category,
            image: image_filename,
            quantity: req.body.quantity
        });
        await product.save();
        res.json({ success: true, message: 'Product Added' });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: 'Error' });
    }
}

// All product list show

const listProduct = async (req, res) => {
    const { category } = req.query;
    try {
        let products;
        if (category) {
            products = await productModel.find({ category });
        }
        else {
            products = await productModel.find({});

        }
        res.json({ success: true, data: products });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
}

// remove products

const removeProduct = async (req, res) => {
    try {
        const product = await productModel.findById(req.body.id);
        fs.unlink(`uploads/${product.image}`, () => { });

        await productModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: "Product Removed" })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
}


// update products

const updateProduct = async (req, res) => {
    const { id } = req.body;
    try {
        const product = await productModel.findById(id);
        if (!product) {
            return res.json({ success: false, message: "Product not found" });
        }

        // If a new image is uploaded, replace the old 
        if (req.file) {
            if (product.image) {
                fs.unlink(`uploads/${product.image}`, () => { });
            }
            product.image = req.file.filename;
        }

        product.name = req.body.name || product.name;
        product.unit = req.body.unit || product.unit;
        product.description = req.body.description || product.description;
        product.price = req.body.price || product.price;
        product.sellingPrice = req.body.sellingPrice || product.sellingPrice;
        product.category = req.body.category || product.category;
        product.quantity = req.body.quantity || product.quantity;

        await product.save();

        res.json({ success: true, message: "Product Updated", data: product });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: "Error" });
    }
};

const productCount = async (req, res) => {
    try {
        const count = await productModel.countDocuments();
        res.status(200).json({ success: true, count });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching product count' });
    }
};

const lowStockProducts = async (req, res) => {
    try {
        const products = await productModel.find({ quantity: { $lte: 10 } }).sort({ quantity: 1 }).limit(10);
        res.status(200).json({ success: true, data: products });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching low stock products' });
    }
};

export { addProduct, listProduct, removeProduct, updateProduct, productCount, lowStockProducts }