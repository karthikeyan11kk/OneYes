if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express")
const mongoose = require("mongoose");
const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
const dbUrl=process.env.Db_url;
// ""mongodb://127.0.0.1:27017/oneyes"
mongoose.connect(dbUrl);


const contactSchema = new mongoose.Schema({
  name: {
    type:String,
    required:true
  },
  email: {
    type:String,
    required:true
  },
  subject: {
    type:String,
    required:true
  },
  message: {
    type:String,
    required:true
  },
});
const Contact = mongoose.model("Contact", contactSchema);
app.get("/", async (req, res) => {
  res.render("home");
});
var namecust;
app.post("/contact", async (req, res) => {
  const customer = new Contact({
      name: req.body.name,
      email: req.body.email,
      subject: req.body.subject,
      message: req.body.message
  });
      namecust=customer.name;
      await customer.save();
      res.redirect("/thanks");
});
app.get("/thanks", (req, res) => {
  res.render("thanks", { cusname: namecust});
});

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



