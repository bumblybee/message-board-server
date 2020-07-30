const uuid = require("uuid");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { Op } = require("sequelize");
const User = require("../models/database").User;
const emailHandler = require("../handlers/emailHandler");

exports.signupUser = async (req, res) => {
  try {
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

    emailHandler.sendEmail({
      subject: "Welcome to the Message Board!",
      filename: "signupEmail",
      user: {
        username,
        email,
      },
    });

    res.json(createdUser);
  } catch (error) {
    console.log(error);
  }
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

const generateJWT = (user) => {
  const userData = {
    id: user.id,
    username: user.username,
    email: user.email,
  };

  const secret = Buffer.from(process.env.JWT_SECRET, "base64");
  const expiration = "6h";
  return jwt.sign({ userData }, secret, {
    expiresIn: expiration,
    algorithm: "HS256",
  });
};

// set up password reset token and send email with url
exports.generatePasswordReset = async (req, res) => {
  try {
    //Grab email from client
    const { email } = req.body;

    //Find email in db
    const userRecord = User.findOne({ where: { email: email } });

    //If no email match, don't tell them that - pass message that email will be sent
    if (!userRecord) {
      res.json({ message: "An email has been sent to the address provided." });

      // else if email match
    } else {
      // create reset password token
      const resetToken = crypto.randomBytes(25).toString("hex");
      // set expiration of token
      const resetExpiry = Date.now() + 1000 * 60 * 60;
      // update db with reset password token and expiry
      await User.update(
        { resetPasswordToken: resetToken, resetPasswordExpiry: resetExpiry },
        { where: { email } }
      );
      // create link with current host and reset token
      const resetPasswordUrl = `http://${req.headers.host}/users/password-reset/${resetToken}`;
      // send email containing link and pass url to ejs template
      emailHandler.sendEmail({
        subject: "Password Reset for Message Board",
        filename: "resetPasswordEmail",
        user: { email },

        resetPasswordUrl,
      });
      //send json confirmation
      res.json({ message: "An email has been sent to the address provided." });
    }
  } catch (err) {
    console.log(err);
  }
};

// When user clicks URL in email, handle password reset and store in db
exports.passwordReset = async (req, res) => {
  try {
    // Grab token from url params
    const { token } = req.params;
    // Find user in db where token matches reset token and password expiry is greater than right now
    const userRecord = await User.findOne({
      where: {
        resetPasswordToken: token,
        resetPasswordExpiry: { [Op.gt]: Date.now() },
      },
    });
    // If no matching user with reset token in db, or if token expired
    if (!userRecord) {
      res.json({
        message:
          "Token not found or has expired. Try resetting your password again.",
      });

      // else if matching user
    } else {
      // Grab new password from form
      const { password } = req.body;
      // await hashed password
      const hash = await argon2.hash(password);
      // Update user in db
      userRecord.update({ password: hash });
      // send along another cookie with token so they're logged in
      res.cookie("jwt", generateJWT(userRecord), {
        httpOnly: true,
        maxAge: 3600000,
      });
      // Send data
      res.json({
        message: "Password Updated",

        id: userRecord.id,
        email: userRecord.email,
        username: userRecord.username,
        avatarUrl: userRecord.avatarUrl,
      });
    }
  } catch (err) {
    console.log(err);
  }
};
