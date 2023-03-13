const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const errorMiddleware = require("./middleware/error");
const cors = require("cors");

app.use(express.json());
app.use(cookieParser());

//Routes Import
const product = require("./routes/productRoute");
const user = require("./routes/userRoute");

app.use(cors());
const {createProxyMiddleware} = require('http-proxy-middleware');
app.use('/api/v1', createProxyMiddleware({ 
    target: 'http://localhost:3000/', //original url
    changeOrigin: true, 
    //secure: false,
    onProxyRes: function (proxyRes, req, res) {
       proxyRes.headers['Access-Control-Allow-Origin'] = '*';
    }
}));

app.use("/api/v1", product);
app.use("/api/v1", user);

//middleware for Errors
app.use(errorMiddleware);


module.exports = app;
