const UserModel = require("../models/UsersModel");
const bcrypt = require("bcrypt");

const salt = Number(process.env.SALT);

const getAllUsers = async (req, res) => {
  try {
    const allUsers = await UserModel.find();
    res.status(200).json(allUsers);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

const signInUser = (req, res, next) => {
  const { email, password } = req.body;

  UserModel.findOne({ email }).exec((err, user) => {
    if (user) {
      bcrypt.compare(password, user.password, (error, match) => {
        if (error) res.status(500).json({ msg: error });
        else if (match)
          res.status(200).json({ token: generateToken(user._id) });
        else res.status(403).json({ msg: "wrong email or password" });
      });
    } else {
      res.status(403).json({ msg: "wrong email or password" });
    }
  });
};

const newUser = (req, res, next) => {
  let fullName = "AmandaHeideman";
  let password = "12345";
  let admin = true;
  let attending = true;
  let alcohol = false;
  let dietaryRestriction = "veg";
  let performing = false;
  bcrypt.hash(password, salt, (error, hash) => {
    if (error) res.status(500);
    const newUser = new UserModel({
      fullName,
      password: hash,
      admin,
      attending,
      alcohol,
      dietaryRestriction,
      performing,
    });
    newUser
      .save()
      .catch((err) => {
        res.status(400).json({ msg: err.message });
      })
      .then(res.json({ Added: newUser.fullName }));
  });
}

module.exports = { getAllUsers, signInUser, newUser };