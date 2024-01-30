
const Try = (req,res,next)=>{

    console.log("try middleware")
    next()
}

module.exports = Try