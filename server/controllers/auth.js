const User = require("../models/User");
const asyncHandler = require("express-async-handler");
const generateToken = require("../utils/generateToken");

// @route POST /auth/register
// @desc Register user
// @access Public
exports.registerUser = asyncHandler(async (req, res, next) => {
  const { primaryLanguage, email, password } = req.body;
  // This will late be initalized with an image on user regestration
  const profileImageUrl = "";
  const emailExists = await User.findOne({ email });

  if (emailExists) {
    res.status(400);
    throw new Error("A user with that email already exists");
  }

  const user = await User.create({
    primaryLanguage,
    email,
    password,
    profileImageUrl,
  });

  if (user) {
    const token = generateToken(user._id);
    const secondsInWeek = 604800;

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: secondsInWeek * 1000,
    });

    res.status(201).json({
      success: {
        user: {
          _id: user._id,
          primaryLanguage: user.primaryLanguage,
          email: user.email,
        },
      },
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @route POST /auth/login
// @desc Login user
// @access Public
exports.loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    const token = generateToken(user._id);
    const secondsInWeek = 604800;

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: secondsInWeek * 1000,
    });
    res.status(200).json({
      success: {
        user: {
          _id: user._id,
          primaryLanguage: user.primaryLanguage,
          email: user.email,
          profileImageUrl: user.profileImageUrl,
          username: user.username,
        },
      },
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @route GET /auth/user
// @desc Get user data with valid token
// @access Private
exports.loadUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("Not authorized");
  }
  console.log(user + "This is User");

  res.status(200).json({
    success: {
      user: {
        _id: user._id,
        primaryLanguage: user.primaryLanguage,
        email: user.email,
        profileImageUrl: user.profileImageUrl,
        username: user.username,
      },
    },
  });
});

// @route GET /auth/logout
// @desc Logout user
// @access Public
exports.logoutUser = asyncHandler(async (req, res, next) => {
  res.clearCookie("token");

  res.send("You have successfully logged out");
});
