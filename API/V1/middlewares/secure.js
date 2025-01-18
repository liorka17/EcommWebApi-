module.exports = (req, res, next) => {
    console.log(`Client IP: ${req.ip}`); // הדפסת כתובת ה-IP
    return next(); // מאפשר גישה לכולם
};
