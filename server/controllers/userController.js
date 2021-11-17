const UserModel = require("../models/UsersModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const salt = Number(process.env.SALT);
const secretToken = process.env.SECRET_TOKEN;

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
  const { attending, alcohol, diet, performing } = req.body;
  const token = req.headers.authorization;
  
  try {
    const user = jwt.verify(token, secretToken);
    const _id = user.id;
    UserModel.findOneAndUpdate(
      { _id }, 
      { $set: { 
        attending: attending, 
        alcohol: alcohol,
        diet: diet, 
        performing: performing 
      } }
    )
      .catch((err) => res.status(500).json({ msg: err.message }));
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

const getRegistration = async (req, res) => {
  const token = req.headers.authorization;

  try{
    const user = jwt.verify(token, secretToken);
    const _id = user.id;

    const getUser = await UserModel.findOne({ _id });
    res.json({ user: getUser });
  } catch(err){
    console.log(err);
    res.json({ status: 'error' })
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

module.exports = { getAllUsers, loginUser, newUser, register, getRegistration };