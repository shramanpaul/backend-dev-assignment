const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

const authAdmin = async (req, res, next) => {
    const token = req.header('x-auth-token');
    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.admin = decoded;
        const admin = await Admin.findById(req.admin.id);
        if (!admin) {
            return res.status(401).json({ message: 'Authorization denied' });
        }
        next();
    } catch (err) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};

module.exports = authAdmin;
