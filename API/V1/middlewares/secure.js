module.exports = (req, res, next) => {
    console.log(`Client IP: ${req.ip}`); // הדפסת כתובת ה-IP
    return next(); // מאפשר גישה לכולם
};

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ msg: 'No token provided' });
    }

    const token = authHeader.split(' ')[1]; // "Bearer <token>"
    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ msg: 'Invalid token' });
        }
        req.user = user; // שמירת המידע של המשתמש בבקשה
        next();
    });
};

