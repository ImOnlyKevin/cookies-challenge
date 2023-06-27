import express from "express";
import cookieParser from "cookie-parser";

const app = express()

// need cookieParser middleware before we can do anything with cookies
app.use(cookieParser());

// // set a cookie
// app.use(function (req, res, next) {
//   // check if client sent cookie
//   var cookie = req.cookies.cookieName;
//   if (cookie === undefined) {
//     // no: set a new cookie
//     var randomNumber=Math.random().toString();
//     randomNumber=randomNumber.substring(2,randomNumber.length);
//     res.cookie('cookieName',randomNumber, { maxAge: 900000, httpOnly: true });
//     console.log('cookie created successfully');
//   } else {
//     // yes, cookie was already present 
//     console.log('cookie exists', cookie);
//   } 
//   next(); // <-- important!
// });

app.get('/', (req, res) => {
    res.send('home. Got to /login/{your name} to login or /hello if you are already logged in')
})

app.get('/login/:name', (req, res) => {
    let cookie = req.cookies.name
    if (cookie === undefined) {
        res.cookie('name', req.params.name, {expires: new Date(new Date().getTime() + 60 * 1000)})
        res.send('name cookie created')
    }
    else {
        res.send('cookie already exists with name')
    }
})

app.get('/hello', (req, res) => {
    let cookie = req.cookies.name
    if (cookie !== undefined) {
        res.send(`Hello, ${cookie}!`)
    } else {
        res.send('no name exists. Route to /login/{your name}')
    }
})



app.listen(3001, () => console.log('server started successfully'))