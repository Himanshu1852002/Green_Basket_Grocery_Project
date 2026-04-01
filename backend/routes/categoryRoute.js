import express from 'express';
import { createCategory, getAllCategories, toggleCategory, deleteCategory } from '../controllers/categoryController.js';

const categoryRouter = express.Router();
categoryRouter.post('/create', createCategory);
categoryRouter.get('/all', getAllCategories);
categoryRouter.post('/toggle', toggleCategory);
categoryRouter.post('/delete', deleteCategory);

export default categoryRouter;
