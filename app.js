const express = require("express");
const path = require("path");
const app = express();
const mongoose = require('mongoose');
const bodyparser = require('body-parser')

main().catch(err => console.log(err));

async function main() {
    mongoose.connect('mongodb://127.0.0.1:27017/contactDance');
}
const port = 8000;


// define mongoose schema
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    adress: String,
    desc: String,
  });
  const contact = mongoose.model('Contact', contactSchema)



//For Express specific stuff
app.use("/static", express.static("static"));
app.use(express.urlencoded());


//For pug specific stuff
app.set('view engine', 'pug');//this is for konsi engine use krna chahte hai.
app.set('views', path.join(__dirname, 'views'));//this is for konsi directory se read krne chahte hai.


//End points
app.get('/', (req, res) => {
    const params = { }
    res.status(200).render('home.pug');
})

app.get('/contact', (req, res) => {
    const params = { }
    res.status(200).render('contact.pug');
})
app.post('/contact', (req, res) => {
    let myData = new contact(req.body);
    myData.save().then(()=>{
        res.send("This item has been saved to the database")
    }).catch(()=>{
        res.status(400).send("Item has not been saved in the database")
    });
    // res.status(200).render('contact.pug');
})


//start the server
app.listen(port, () => {
    console.log(`The application started sucessfully on port ${port}`)
})