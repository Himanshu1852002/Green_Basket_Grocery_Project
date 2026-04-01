import express from 'express';
import { createCoupon, getAllCoupons, toggleCoupon, deleteCoupon, applyCoupon } from '../controllers/couponController.js';

const couponRouter = express.Router();
couponRouter.post('/create', createCoupon);
couponRouter.get('/all', getAllCoupons);
couponRouter.post('/toggle', toggleCoupon);
couponRouter.post('/delete', deleteCoupon);
couponRouter.post('/apply', applyCoupon);

export default couponRouter;
