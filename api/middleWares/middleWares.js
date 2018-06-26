const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
     try {
          req.auth = jwt.verify(req.headers.authorization, 'secretWord')
          next();
     } catch (error) {
          res.status(200).json({
               message: "your token is invalid",
               error

          })
     }
}