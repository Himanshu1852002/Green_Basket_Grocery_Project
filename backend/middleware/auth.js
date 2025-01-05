import jwt from 'jsonwebtoken';

const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.json({ success: false, message: "Not Authorized. Please Login Again." });
    }

    const token = authHeader.split(' ')[1];

    try {
        // eslint-disable-next-line no-undef
        const JWT_SECRET = process.env.JWT_SECRET;
        console.log(JWT_SECRET) 
        const token_decode = jwt.verify(token, JWT_SECRET);
        req.body.userId = token_decode.id;
        next();
    } catch (error) {
        console.error('Token verification failed:', error);
        return res.json({ success: false, message: "Authentication failed." });
    }
};

export default authMiddleware;
