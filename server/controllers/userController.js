const UserModel = require("../models/UsersModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { getUserId } = require("../auth");

const salt = Number(process.env.SALT);
const secretToken = process.env.SECRET_TOKEN;

const getUser = async (req, res) => {
  const _id = getUserId(req);
  try {
    const user = await UserModel.findOne({ _id });
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

const loginUser = async (req, res, next) => {
  const { fullName, password } = req.body;
  
  UserModel.findOne({ fullName }).exec((err, user) => {
    if (user) {
      bcrypt.compare(password, user.password, (error, match) => {
        if (error) res.status(500).json({ status: 'error', error: error });
        else if (match){
          const token = jwt.sign({ id: user._id, fullName: user.fullName }, secretToken)
          res.status(200).json({ status: 'ok', token: token });
        }
        else res.status(403).json({ status: 'error', error: "wrong email or password" });
      });
    } else {
      res.status(403).json({ status: 'error', error: "wrong email or password" });
    }
  });
};

const register = (req, res, next) => {
  const { attending, alcohol, diet, performing, email } = req.body;
  const _id = getUserId(req);
  
  try {
    UserModel.findOneAndUpdate(
      { _id }, 
      { $set: { 
        attending: attending, 
        alcohol: alcohol,
        diet: diet, 
        performing: performing, 
        email: email 
      } }
      )
      .catch((err) => res.status(500).json({ message: err.message }));
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

const getRegistration = async (req, res) => {
  
  const _id = getUserId(req);
  if(_id.status !== 400) {
    try{
      const getUser = await UserModel.findOne({ _id });
      res.json({ user: getUser });
    } catch(err){
      res.json({ message: err.message })
    }
  } else {
    res.status(400).json({ message: "Not logged in"});
  }
}

const newUser = (req, res, next) => {
  let fullName = "test2";
  let password = "12345";
  let admin = false;
  bcrypt.hash(password, salt, (error, hash) => {
    if (error) res.status(500);
    const newUser = new UserModel({
      fullName,
      password: hash,
      admin
    });
    newUser
      .save()
      .catch((err) => {
        res.status(400).json({ msg: err.message });
      })
      .then(res.json({ Added: newUser.fullName }));
  });
}

module.exports = { getUser, loginUser, newUser, register, getRegistration };