const jwt = require('jsonwebtoken')
const User = require('../models/User')
const getToken = require('./get-token')

const checkToken = (req, res, next) => {
  const token = getToken(req)

  if(!token){
    return res.status(401).json({
      message: "Acesso negado"
    })
  }
  try{
    const verified = jwt.verify(token, 'nossosecret')
    req.user = verified
    next()
  }catch(err){
    return res.status(400).json({
      message: "Token inválido!"
    })
  }
}

module.exports = checkToken