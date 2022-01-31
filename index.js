const express = require("express") ;
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose") ;
const conversationroute = require("./routes/conversations") ;
const messageroute = require("./routes/messages") ; 
const router = express.Router();
const path = require("path") ;
const cors = require('cors');
app.use(cors()) ;
dotenv.config();
mongoose.connect(
    process.env.Mongopath,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
      console.log("Connected to MongoDB");
    }
  );
  app.use(express.json());
  app.get("/",(req,res)=>{
    res.status(200).json("FlirtAid's Chatapp") ;
  })
  app.use("/api/conversations", conversationroute);
  app.use("/api/messages", messageroute);
  app.listen(3001, () => {
    console.log("Backend server is running!");
  });