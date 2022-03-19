const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

//helpers
const createUserToken = require('../helpers/create-user-token')
const getToken = require('../helpers/get-token')

module.exports = class UserController{
  static async register(req, res){
    const {name, email, password, phone, image} = req.body
    if(!req.body.name){
      res.status(422).json({message: 'O nome é obrigatório'})
      return
    }
    if(!req.body.email){
      res.status(422).json({message: 'O email é obrigatório'})
      return
    }
    if(!req.body.phone){
      res.status(422).json({message: 'O telefone é obrigatório'})
      return
    }
    if(!req.body.password){
      res.status(422).json({message: 'A senha é obrigatória'})
      return
    }
    const userExists = await User.findOne({email: email})

    if(userExists){
      console.log(userExists)
      res.status(422).json({message: "Usuário já cadastrado."})
      return
    }

    //create a password
    const salt = await bcrypt.genSalt(12)
    const passwordHash = await bcrypt.hash(password, salt)

    const user = new User({
      name, email, phone, image, password: passwordHash
    })

    try{
      const newUser = await user.save()
      await createUserToken(newUser, req, res)
    }catch(err){
      console.log(err)
      res.status(500).json({message: error})
    }
  }

  static async login(req, res){
    const {email, password} = req.body
    if(!email){
      res.status(422).json({message: 'O email é obrigatório'})
      return
    }
    if(!password){
      res.status(422).json({message: 'A senha é obrigatória'})
      return
    }
    const user = await User.findOne({email})
    if(!user){
      res.status(422).json({message: "Usuário não cadastrado."})
      return
    }

    // check if password matches with db password
    const checkPassword = await bcrypt.compare(password, user.password)

    if(!checkPassword){
      res.status(422).json({message: "Senha inválida."})
      return
    }

    await createUserToken(user, req, res)
  }

  static async checkUser(req, res){
    let currentUser

    if(req.headers.authorization){
      const token = getToken(req)
      const decoded = jwt.verify(token, 'nossosecret')

      currentUser = await User.findById(decoded.id)

      currentUser.password = undefined

    }else{
      currentUser = null
    }

    res.status(200).send(currentUser)
  }
  static async getUserById(req, res) {
    const id = req.params.id

    const user = await User.findById(id).select("-password")

    if(!user){
      res.status(422).json({
        message: "Usuário não encontrado!"
      })
      return
    }
    res.status(200).send(user)
  }
  static async editUser(req, res){
    const id = req.params.id
    const user = await User.findById(id)

    if(!user){
      res.status(422).json({
        message: "Usuário não encontrado!"
      })
      return
    }
    const editedUser = await User.findByIdAndUpdate(id, req.body, {new: true})
    res.send({
      message: 'Usuário atualizado!',
      data: editedUser
    })

  }
}