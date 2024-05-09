const jwt = require('jsonwebtoken');
const User = require('../db/userSchema'); 

const authMiddleware = async (req, res, next) => {

  const token = req.headers.authorization?.replace('Bearer ', '') || req.body.token;
      // console.log(token)
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized Access' });
  }

  try {
    // Verify the token....
    const decoded = jwt.verify(token, process.env.JWT_SECRET|| 'MYMERNSTACKaSSIGNMENT'); 
    const userId = decoded.id;
    const user = await User.findById(userId);

    if (!user) {
    return res.status(401).json({ error: 'Unauthorized Access 2' })
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Unauthorized: Invalid token' });
  }
};

module.exports = authMiddleware;
