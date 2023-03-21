const app = require("./app");
const cloudinary = require("cloudinary");
const dotenv = require("dotenv");
const connectDatabase = require("./config/database");
// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

//handle uncaught exceptions
// const paymentIntent = async() => await stripe.paymentIntents.create({
//   amount: 1099,
//   currency: 'usd',
//   description: 'Software development services',
// });

process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting down the server due to uncaught exception");
  process.exit(1);
});



//config
dotenv.config({ path: "./config/config.env" });

connectDatabase();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_APIKEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});


// console.log(process.env.CLOUDINARY_NAME, 'cloudinary name')

const server = app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});


//unhandled promise rejections

process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting down the server due to unhandled promise rejection");
  server.close(() => {
    process.exit(1);
  });
});