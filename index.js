const express = require("express");
const session = require("express-session");
const app = express();
const path = require('path');
const bodyParser = require("body-parser");
const authRoutes = require("./routes/auth");
const transactionRoutes = require('./routes/transactions');

app.use(session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: true,
}));

app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static(path.join(__dirname,"public")));
app.set('view engine','ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/',authRoutes);
app.use('/', transactionRoutes);

const port = 3080;

app.listen(port,()=>{
    console.log(`app is listening at port : ${port}`);
});



