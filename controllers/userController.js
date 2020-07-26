const uuid = require("uuid");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const User = require("../models/database").User;

exports.signupUser = async (req, res) => {
  const { username, email, password, avatarUrl } = req.body;
  const hash = await argon2.hash(password);

  const newUser = {
    id: uuid.v4(),
    username,
    email,
    password: hash,
    avatarUrl,
  };
  // Store user in db
  const userData = await User.create(newUser);

  // create object with data from db to pass to api, minus password
  const createdUser = {
    id: userData.id,
    username: userData.username,
    email: userData.email,
    avatarUrl: userData.avatarUrl,
  };

  res.json(createdUser);
};

const generateJWT = (user) => {
  const userData = {
    id: user.id,
    username: user.username,
    email: user.email,
  };

  const secret = Buffer.from(process.env.JWT_SECRET, "base64");
  const expiration = "6h";
  return jwt.sign({ userData }, secret, { expiresIn: expiration });
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  const userRecord = await User.findOne({ where: { email: email } });
  if (!userRecord) {
    throw new Error("User not found");
  } else {
    const correctPassword = await argon2.verify(userRecord.password, password);
    if (!correctPassword) {
      throw new Error("Incorrect Password");
    }
  }

  res.cookie("jwt", generateJWT(userRecord), {
    httpOnly: true,
    maxAge: 3600000,
  });

  res.json({
    id: userRecord.id,
    username: userRecord.username,
    email: userRecord.email,
    avatarUrl: userRecord.avatarUrl,
  });
};
