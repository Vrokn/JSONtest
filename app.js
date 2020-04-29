const express = require('express');
const mongoose = require("mongoose");
const app = express();
mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost:27017/mongo-1', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on("error", function(e) { console.error(e); });

const ProductsSchema = new mongoose.Schema({
    name: { type: String },
    price: { type: String },
  });
const Products = mongoose.model("Products", ProductsSchema);

// contentType: "application/json"

app.use(express.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  
app.get("/products", async (req, res) => { //GET / - muestra la lista de usuarios registrados.
    const producto = await Products.find();
       res.send(JSON.stringify(producto));
  });
   
app.listen(3000, () => console.log("Listening on port 3000 ..."));

