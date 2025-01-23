import productModel from '../models/productModel.js';
import fs from 'fs';


// add product

const addProduct = async (req, res) => {
    let image_filename = `${req.file.filename}`;

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

    try {
        await product.save();
        res.json({ success: true, message: "Product Added" });
    } catch (error) {
        console.error(error)
        res.json({ success: false, message: "Error" });
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


export { addProduct, listProduct, removeProduct, updateProduct }