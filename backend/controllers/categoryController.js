import categoryModel from '../models/categoryModel.js';

const createCategory = async (req, res) => {
    try {
        const { name, emoji } = req.body;
        const exists = await categoryModel.findOne({ name: { $regex: new RegExp(`^${name}$`, 'i') } });
        if (exists) return res.json({ success: false, message: 'Category already exists' });
        const cat = new categoryModel({ name, emoji });
        await cat.save();
        res.json({ success: true, message: 'Category created', data: cat });
    } catch (e) { res.status(500).json({ success: false, message: e.message }); }
};

const getAllCategories = async (req, res) => {
    try {
        const cats = await categoryModel.find().sort({ createdAt: 1 });
        res.json({ success: true, data: cats });
    } catch (e) { res.status(500).json({ success: false, message: e.message }); }
};

const toggleCategory = async (req, res) => {
    try {
        const cat = await categoryModel.findById(req.body.id);
        cat.isActive = !cat.isActive;
        await cat.save();
        res.json({ success: true, data: cat });
    } catch (e) { res.status(500).json({ success: false, message: e.message }); }
};

const deleteCategory = async (req, res) => {
    try {
        await categoryModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: 'Deleted' });
    } catch (e) { res.status(500).json({ success: false, message: e.message }); }
};

export { createCategory, getAllCategories, toggleCategory, deleteCategory };
