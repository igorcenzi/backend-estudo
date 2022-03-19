const mongoose = require('mongoose')

async function main(){
  await mongoose.connect('mongodb+srv://igorcenzi:missdreavus@cluster0.wocz1.mongodb.net/getapet?retryWrites=true&w=majority')
  console.log('Conectou ao Mongoose!',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useFindAndModify: false,
  })
}

main().catch(err => console.log(err))

module.exports = mongoose
