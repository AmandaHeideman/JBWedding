
const jwt = require("jsonwebtoken");

const secretToken = process.env.SECRET_TOKEN;

function auth () {

}

function getUserId (req, res) {

  try{
    const token = req.headers.authorization;
    const jwtUser = jwt.verify(token, secretToken);
    return jwtUser.id;
  } catch (err){
    return ({ status: 400, message: err.message })
  }
}

module.exports = {
  getUserId
}