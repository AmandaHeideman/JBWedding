const UserModel = require('../models/UsersModel');
const { getUserId } = require('../auth');

const getAdmin = async (req, res) => {
  const _id = getUserId(req);
  try {
    const user = await UserModel.findOne({ _id });
    /* if(!user.admin){
      res.status(400).json({ message: "Not admin "});
    } */
    res.status(200).send(user.admin);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
}

module.exports = {
  getAdmin
}