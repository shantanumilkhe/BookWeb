const {google} = require('googleapis');
const fs = require('fs');
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const methodoverride = require('method-override');
const session = require('express-session');
const Admin = require('./models/admin');
const drive = require('./routes/drive');
const MongoDBStore = require('connect-mongo');

const Dburl = process.env.DB_URL
mongoose.connect(Dburl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
})

const app = express();


const store = new MongoDBStore({
    mongoUrl: Dburl,
    secret,
    touchAfter: 24*3600
    })
    
    store.on("error", function(e){
        console.log("session Store error", e)
    })
    
    const sessionConfig = {
        store,
        name: 'session',
        secret,
        resave: false,
        saveUninitialized: true,
        cookie: {
            httpOnly: true,
            // secure: true,
            expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
            maxAge: 1000 * 60 * 60 * 24 * 7,
        }
    
    }
    app.use(session(sessionConfig));



app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(Admin.authenticate()))
passport.serializeUser(Admin.serializeUser());
passport.deserializeUser(Admin.deserializeUser());

app.use('/drive', drive);




  
