const jwt = require('jsonwebtoken');
const secretKey = 'qwertyuioplkjhgfdsazxcvbnmQWERTYUIOPLKJHGFDSAZXCVBNM.,1234567890!@#$%^&*()'; 

const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization;
   console.log(token);
  if (!token) {
    return res.status(401).json({ error:  'Unauthorized: Token missing' });
  }
  const [, actualToken] = token.split(' ');
  try {
    const decodedToken = jwt.verify(actualToken, secretKey); 
    req.userId = decodedToken.userId;
    next();
  } catch (error) {
    console.error('Error decoding token:', error);
    res.status(401).json({ error: 'Unauthorized: Invalid token' });
  }
};

module.exports = authenticateToken;
