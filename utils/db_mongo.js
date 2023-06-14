const mongoose = require("mongoose");

//const DATABASE_URL
mongoose.connect("mongodb://localhost:27017/providers-products");

const db = mongoose.connection;

// Eventos
db.on("error", error => console.log(error));
db.once("open", () => console.log("connection to MongoDB Done"));

module.exports = mongoose;