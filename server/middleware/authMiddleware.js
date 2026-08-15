const jwt = require("jsonwebtoken");
const authMiddleware = (req, res, next) => {
    try{
        const authHeader = req.headers.authorization;
    if (!authHeader) {
    return res.status(401).json({
        message: "Authorization header missing"
    });
    }
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(
    token,
    process.env.JWT_SECRET
    );
    req.user = decoded;
    next();
    }
    catch(err){
        return res.status(401).json({
        message: "Invalid or Expired token"
    });
    }
}
module.exports = authMiddleware;
