const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const UserSc = require("../Schema/userSchema");
const jwt = require("jsonwebtoken");

router.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  try {
    bcrypt.hash(password, 5, async (err, hash) => {
      if (err) {
        res.send("somehting went wrong hashing" + err);
      } else {
        const user = new UserSc({
          name,
          email,
          password: hash,
        });
        await user.save();
        res.send("user have added");
      }
    });
  } catch (error) {
    res.send(error);
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserSc.findOne({ email });
    if (user) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
          const token = jwt.sign(
            { userID: user._id, name: user.name },
            "masai",
            {
              expiresIn: "1h",
            }
          );
          res.cookie("token", token, { maxAge: 7*24*60*60*1000, httpOnly: true, sameSite: "none", secure: true });
          res.send({ msg: "login successfully", token: token });
        } else {
          res.status(401).send("wrong password");
        }
      });
    } else {
      res.status(400).send("user not found");
    }
  } catch (error) {
    res.send(error);
  }
});

router.get("/logout" , (req, res) => {
  
   res.clearCookie("token");
   res.clearCookie("refreshToken");

  res.send("logout successfully")
})

module.exports = router;
