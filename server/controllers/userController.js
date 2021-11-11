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

const loginUser = async (req, res, next) => {
  const { fullName, password } = req.body;
  const user = await UserModel.findOne({ fullName });

  UserModel.findOne({ fullName }).exec((err, user) => {
    if (user) {
      bcrypt.compare(password, user.password, (error, match) => {
        if (error) res.status(500).json({ message: error });
        else if (match)
          res.status(200).send(user);
        else res.status(403).json({ message: "Fel användarnamn eller lösenord" });
      });
    } else {
      res.status(403).json({ message: "Fel användarnamn eller lösenord" });
    }
  });
};

const register = (req, res, next) => {
  const { fullName, attending } = req.body;
  try {
    UserModel.findOneAndUpdate(
      { fullName: fullName }, { $set: { attending: attending } }, { upsert: true }
    )
      .catch((err) => res.status(500).json({ msg: err.message }));
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
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

module.exports = { getAllUsers, loginUser, newUser, register };