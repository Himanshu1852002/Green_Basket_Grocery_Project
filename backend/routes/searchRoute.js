import express from 'express';
import { search } from '../controllers/searchController.js';

const searchRouter = express.Router();

searchRouter.get("/searchItem", search);

export default searchRouter;