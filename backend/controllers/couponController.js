import couponModel from '../models/couponModel.js';

const createCoupon = async (req, res) => {
    try {
        const { code, type, value, minOrder, maxUses, expiresAt } = req.body;
        const exists = await couponModel.findOne({ code: code.toUpperCase() });
        if (exists) return res.json({ success: false, message: 'Coupon code already exists' });
        const coupon = new couponModel({ code, type, value, minOrder, maxUses, expiresAt: expiresAt || null });
        await coupon.save();
        res.json({ success: true, message: 'Coupon created', data: coupon });
    } catch (e) { res.status(500).json({ success: false, message: e.message }); }
};

const getAllCoupons = async (req, res) => {
    try {
        const coupons = await couponModel.find().sort({ createdAt: -1 });
        res.json({ success: true, data: coupons });
    } catch (e) { res.status(500).json({ success: false, message: e.message }); }
};

const toggleCoupon = async (req, res) => {
    try {
        const coupon = await couponModel.findById(req.body.id);
        coupon.isActive = !coupon.isActive;
        await coupon.save();
        res.json({ success: true, data: coupon });
    } catch (e) { res.status(500).json({ success: false, message: e.message }); }
};

const deleteCoupon = async (req, res) => {
    try {
        await couponModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: 'Deleted' });
    } catch (e) { res.status(500).json({ success: false, message: e.message }); }
};

const applyCoupon = async (req, res) => {
    try {
        const { code, orderAmount } = req.body;
        const coupon = await couponModel.findOne({ code: code.toUpperCase(), isActive: true });
        if (!coupon) return res.json({ success: false, message: 'Invalid or inactive coupon' });
        if (coupon.expiresAt && new Date() > new Date(coupon.expiresAt))
            return res.json({ success: false, message: 'Coupon has expired' });
        if (coupon.minOrder > 0 && orderAmount < coupon.minOrder)
            return res.json({ success: false, message: `Minimum order ₹${coupon.minOrder} required` });
        if (coupon.maxUses > 0 && coupon.usedCount >= coupon.maxUses)
            return res.json({ success: false, message: 'Coupon usage limit reached' });

        const discount = coupon.type === 'percent'
            ? Math.round(orderAmount * coupon.value / 100)
            : coupon.value;

        res.json({ success: true, discount, coupon: { code: coupon.code, type: coupon.type, value: coupon.value, label: coupon.type === 'percent' ? `${coupon.value}% off` : `₹${coupon.value} off` } });
    } catch (e) { res.status(500).json({ success: false, message: e.message }); }
};

export { createCoupon, getAllCoupons, toggleCoupon, deleteCoupon, applyCoupon };
