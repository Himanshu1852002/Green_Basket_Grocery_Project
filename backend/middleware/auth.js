import jwt from 'jsonwebtoken';

const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ success: false, message: "Not Authorized. Please Login Again." });
    }

    const token = authHeader.split(' ')[1];

    try {
        // eslint-disable-next-line no-undef
        const JWT_SECRET = process.env.JWT_SECRET;
        const token_decode = jwt.verify(token, JWT_SECRET);
        // req.user = { id: token_decode.id, role: token_decode.role }
        req.body.userId = token_decode.id;
        next();
    } catch (error) {
        console.error('Token verification failed:', error);
        return res.status(403).json({ success: false, message: "Authentication failed." });
    }
};

export default authMiddleware;
