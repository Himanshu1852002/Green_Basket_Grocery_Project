const isAdmin = (req, res, next) => {
    if (req.user?.role !== 'admin') {
        return res.status(403).json({
            success: false,
            message: "Access Denied: Admins Only"
        })
    }
    next();
}
export default isAdmin;