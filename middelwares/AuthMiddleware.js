
const jwt=require("jsonwebtoken")
// Middleware to verify JWT token
module.exports = function Tokenverify(req, res, next) {
    const token = req.headers["authorization"];
  // console.log(token);
    if (!token) {
      return res.status(403).json({ error: "No token provided" });
    }
  // console.log( process.env.ACCESS_TOKEN_SECRET);
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err,decoded) => {
      if (err) {
        return res.status(401).json({ error: "Unauthorized" });
      }
  
      req.username = decoded.username;
      next();
    });
  };
