const express = require('express');
const session = require("express-session");
const dotenv = require('dotenv');
dotenv.config();

require('./auth');
const passport = require('passport');
const app = express();

app.use(session({ secret: process.env.SESSION_SECRET }));
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res)=>{
    res.send('<a href= "auth/google?user_type=scout">Authenticate with google </a>')
})

function isLoggedIn (req, res, next) {
    return req.user ? next() : res.sendStatus(401)
}

app.get('/auth/google', passport.authenticate('google', { scope: ['email', 'profile'], state: '/auth/google?user_type=scout' },))

app.get('/google/callback', 
    passport.authenticate('google', {
        successRedirect: "/dashboard",
        failureRedirect: '/auth/failure'
    })
);

app.get("/auth/failure", (req, res)=>{
    res.send("Something went wrong")
})

app.get('/dashboard', isLoggedIn, (req, res)=>{
    console.log(req.user);
    res.send('Hello Segun, Welcome Home')
})

app.get('/logout', (req, res) => {
    req.logout( ()=>{
        req.session.destroy();
    });
    res.send('Goodbye')
})

const port = 3080;
app.listen(port, () =>{
    console.log("Listening on localhost:"+port)
})