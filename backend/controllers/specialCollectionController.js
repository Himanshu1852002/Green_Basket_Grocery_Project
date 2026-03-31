import specialCollectionModel from '../models/specialCollectionModel.js';
import productModel from '../models/productModel.js';

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

// Create collection
const createCollection = async (req, res) => {
    try {
        const { title, subtitle, tag, bgColor, accentColor, productIds } = req.body;
        const collection = new specialCollectionModel({ title, subtitle, tag, bgColor, accentColor, productIds: productIds || [] });
        await collection.save();
        res.json({ success: true, message: 'Collection created', data: collection });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get all collections (admin)
const getAllCollections = async (req, res) => {
    try {
        const collections = await specialCollectionModel.find().sort({ createdAt: -1 });
        res.json({ success: true, data: collections });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get active collections with products (frontend)
const getActiveCollections = async (req, res) => {
    try {
        const collections = await specialCollectionModel.find({ isActive: true }).sort({ createdAt: -1 });
        const result = await Promise.all(collections.map(async (col) => {
            const products = await productModel.find({ _id: { $in: col.productIds } });
            const productsWithImage = products.map(p => ({
                ...p.toObject(),
                image: `${req.protocol}://${req.get('host')}/uploads/${p.image}`
            }));
            return { ...col.toObject(), products: productsWithImage };
        }));
        res.json({ success: true, data: result });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Update collection
const updateCollection = async (req, res) => {
    try {
        const { id, title, subtitle, tag, bgColor, accentColor, productIds, isActive } = req.body;
        const collection = await specialCollectionModel.findByIdAndUpdate(
            id, { title, subtitle, tag, bgColor, accentColor, productIds, isActive }, { new: true }
        );
        res.json({ success: true, message: 'Collection updated', data: collection });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Delete collection
const deleteCollection = async (req, res) => {
    try {
        await specialCollectionModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: 'Collection deleted' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export { createCollection, getAllCollections, getActiveCollections, updateCollection, deleteCollection };
