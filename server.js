require('dotenv').config()
const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')

app.use(express.json())

const port = 3000
const posts =[{
    username :"ahmed",
    title:"Hello 1"
},
{
    username :"nada",
    title:"Hello 2"
}
]
// app.get(`/posts`,(req,res)=>{
// res.send(posts)
// })

app.get(`/posts`,auth,(req,res)=>{
    res.json(posts.filter(post => post.username === req.user.name))
    })





function auth(req,res,next){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token ==null) return res.sendStatus(401)

    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user)=>{
        if (err) return res.sendStatus(403) 

        req.user = user
        next()



    })
}





app.listen(port,()=>{
    console.log(`Server running on Port ${port}`)
})