const express = require('express');
const app = express();


app.get('/', (req, res)=>{
    res.send('<a href= "auth/google">Authenticate with google </a>')
})

app.get('/dashboard', (req, res)=>{
    res.send('Hello Segun, Welcome Home')
})

const port = 3080
app.listen(port, () =>{
    console.log("Listening on localhost:"+port)
})