const express = require("express");
const { loginRequest, registerRequest } = require("../query/auth");
const bcrypt = require("bcrypt");

const router = express.Router();
const SALT_ROUNDS = 10;

router.post("/login", async function (req, res, next) {
  const { email, password } = req.body;

  const [userData, error] = await loginRequest({
    email,
    password,
  });

  console.log("userData.password : ", userData?.password);
  if (userData?.password) {
    const isPasswordMatch = await bcrypt.compare(password, userData.password);
    if (isPasswordMatch) {
      res.json({ message: "Login successful", account: userData });
    } else {
      res.status(401).json({ message: "Invalid username or password" });
    }
  } else {
    res
      .status(401)
      .json({ message: error?.message || "Invalid username or password" });
  }
});

router.post("/register", async function (req, res, next) {
  const { email, password, name } = req.body;

  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

  const [userData, error] = await registerRequest({
    name,
    email,
    password: hashedPassword,
  });

  if (userData && !error) {
    res.json({ message: "User created successfully" });
  } else {
    res.status(400).json({ message: error?.message || "Error creating user" });
  }
});

module.exports = router;
