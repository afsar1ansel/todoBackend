const mongoose = require('mongoose');
const dotenv = require("dotenv").config()


     async function dbConnect(){
         try {
              await mongoose.connect(process.env.mongoURL)
            console.log('db connected')
         } catch (error) {
          console.log(error)  
         }
     }


    module.exports = dbConnect
    