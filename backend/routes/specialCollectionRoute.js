import express from 'express';
import { createCollection, getAllCollections, getActiveCollections, updateCollection, deleteCollection } from '../controllers/specialCollectionController.js';

const specialCollectionRouter = express.Router();

specialCollectionRouter.post('/create', createCollection);
specialCollectionRouter.get('/all', getAllCollections);
specialCollectionRouter.get('/active', getActiveCollections);
specialCollectionRouter.post('/update', updateCollection);
specialCollectionRouter.post('/delete', deleteCollection);

export default specialCollectionRouter;
