const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {

  const {token} = req.cookies;
 console.log(req.cookie)
  if (token) {
    const decoded = jwt.verify(token, "masai", (err, decoded) => {
      if (decoded) {
        console.log(decoded);
        req.body.userID = decoded.userID;
        req.body.name = decoded.name
        console.log(req.body);
        next();
      } else {
        res.status(400).send("please login first");
      }
    });
  } else {
    res.status(400).send("please login first");
  }
};

module.exports = { auth };
