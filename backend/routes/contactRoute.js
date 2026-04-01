import express from 'express';
import { submitContact, getAllContacts, markAsRead, deleteContact } from '../controllers/contactController.js';

const contactRouter = express.Router();

contactRouter.post('/submit', submitContact);
contactRouter.get('/all', getAllContacts);
contactRouter.post('/read', markAsRead);
contactRouter.post('/delete', deleteContact);

export default contactRouter;
