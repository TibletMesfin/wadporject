var express = require("express"); // require express module.
var app = express();
//var fs = require('fs');
// If it says its running use "killall -r node" for this error Error: listen EADDRINUSE 0.0.0.0:3000
var mysql = require('mysql');


var fs = require('fs');
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));

const path = require('path'); // all application follow directory path
const VIEWS = path.join(__dirname, 'views'); // Allow the application access to the views folder

const fileUpload = require('express-fileupload');
app.use(fileUpload());


app.use(express.static("scripts")); // Allow access to scripts folder
app.use(express.static("images")); // Allow access to images folder
app.use(express.static("models")); // Allow access to models folder

app.set("view engine", "jade"); // Set the default view engine

var contact = require("./models/contactstore.json") // Allow access to contact json file


// ***** Define the database connection **** // 

const db = mysql.createConnection({
 host: 'den1.mysql6.gear.host',
 user: 'frank',
 password: 'Uj60?m4Y6ZA_',
 database: 'frank'
  
});


db.connect((err) => {
  if(err){
     console.log("You broke it")
         }
  else {
    console.log("Connected to database with style!")
  }
});






// Set up a function to greet us when a get request is called.

app.get('/', function(req, res) { // Call a get request when somebody visits the main url
    res.render('index', {root:VIEWS});   // Sending a response which is just a string.
  console.log("You made your first application work.... Well Done!")
        
});






// ******************************* SQL ROUTES START HERE **********************//
setInterval(function () {
    db.query('SELECT 1');
}, 5000);

// Route to cretate table 
app.get('/createtable', function(req,res){
  let sql = 'CREATE TABLE makeup (Id int NOT NULL AUTO_INCREMENT PRIMARY KEY, Name varchar(255), Price int, Image varchar(255), Brand varchar(255))';
  let query = db.query(sql, (err, res) =>{
    if(err) throw err
    console.log(res)
  });
  
  res.send("The table was created");
});


// Route to cretate makeup item 
app.get('/createitem', function(req,res){
  let sql = 'INSERT INTO makeup (Name, Price, Image, Brand) VALUES ("Lipstick", 20, "box.jpg", "Mac")';
  let query = db.query(sql, (err, res) =>{
    if(err) throw err
    console.log(res)
  });
  
  res.send("Item Inserted");
});

// Route to cretate makeup item 
app.get('/createitem', function(req,res){
  let sql = 'INSERT INTO makeup (Name, Price, Image, Brand) VALUES ("Lipstick", 30, "pic1.jpg", "Nars")';
  let query = db.query(sql, (err, res) =>{
    if(err) throw err
    console.log(res)
  });
  
  res.send("Item Inserted");
});


// This next function renders the products.html page whe somebody calls the /landmarks url
app.get('/newproducts', function(req, res) { // Call a get request when somebody visits the main url
   
  let sql = 'SELECT * FROM makeup';
  let query = db.query(sql, (err, res1) =>{
    if(err) throw err
    console.log(res1)
    res.render('newproducts', {root:VIEWS, res1});   // Sending a response which is just a string.
  });
  
    
  console.log("You are on the new product page")
        
});



app.get('/editmakeup/:id', function(req, res) {
   let sql = 'SELECT * FROM makeup WHERE Id = "'+req.params.id+'"'
 let query = db.query(sql, (err, res1) =>{
  if(err)
  throw(err);
 
  res.render('editmakeup', {root: VIEWS, res1}); // use the render command so that the response object renders a HHTML page
  
 });
 
  console.log("edit products page")
        
});

// Post Route to cretate landmark 
app.post('/editmakeup/:word', function(req,res){
 // let sql = 'UPDATE products SET Name = "'+req.body.name+'", Price = "'+req.body.price+'", Activity = "'+req.body.activity+'", Image = "'+req.body.image+'" WHERE Id = "'+req.params.word+'";'
  let sql = 'UPDATE makeup SET Name = "'+req.body.name+'", Price = "'+req.body.price+'",  Image = "'+req.body.image+'", Brand = "'+req.body.brand+'" WHERE Id = '+req.params.word+';'
  let query = db.query(sql, (err, res) =>{
    if(err) throw err
    console.log(res)
  });
  
  res.redirect("/newproducts");
});


// This next function renders the products.html page whe somebody calls the /landmarks url
app.get('/products/:id', function(req, res) { // Call a get request when somebody visits the main url
   
  let sql = 'DELETE FROM makeup WHERE Id = "'+req.params.id+'"';
  let query = db.query(sql, (err, res1) =>{
    if(err) throw err
    console.log(res1)
    console.log("Id being deleted " + req.params.id)
      // Sending a response which is just a string.
  });
  
  res.redirect("/newproducts");
  console.log("Its Gone !!!!")
        
});



// Page to add new product
app.get('/createproduct', function(req, res) { // Call a get request when somebody visits the main url
   
 
    res.render('createmakeup');   // Sending a response which is just a string.
 
 
  
    
  console.log("You are on the createmakeup page")
        
});

// Page to about us
app.get('/aboutus', function(req, res) { // Call a get request when somebody visits the main url
   
 
    res.render('aboutus.jade');   // Sending a response which is just a string.
 
 
  
    
  console.log("You are on the about us page")
        
});

// Post Route to cretate product
app.post('/createproduct', function(req,res){
 
  
  let sql = 'INSERT INTO makeup (Name, Price, Image, Brand) VALUES ("'+req.body.name+'", '+req.body.price+', "'+req.body.image+'", "'+req.body.brand+'")';
  let query = db.query(sql, (err, res) =>{
    if(err) throw err
    console.log(res)
  });
  

  
  
  
  res.redirect("/newproducts");
});






// Page to show individual landmark
app.get('/show/:id', function(req, res) { // Call a get request when somebody visits the main url
   
  let sql = 'SELECT * FROM makeup WHERE Id = "'+req.params.id+'"';
  let query = db.query(sql, (err, res1) =>{
    if(err) throw err
    console.log(res1)
    res.render('show', {root:VIEWS, res1});   // Sending a response which is just a string.
 
  });
  
    
  console.log("You are on the cart page")
        
});






//***************** JSON ROUTES START HERE ******************************//




app.get('/contact', function(req, res) {
    res.render('contact', {root:VIEWS, contact});
  console.log("Here is the contact page")
        
});


app.get('/contactus', function(req, res) { 
    res.render('addcontact', {root:VIEWS});
  console.log("You are on the contact us page")
        
});




app.post('/contactus', function(req, res){
var count = Object.keys(contact).length;
console.log(count);

function getMax(contacts , id) {
var max
for (var i=0; i<contacts.length; i++) {
if(!max || parseInt(contact[i][id]) > parseInt(max[id]))
max = contacts[i];
}
return max;
}
var maxPpg = getMax(contact, "id");
newId = maxPpg.id + 1;
console.log(newId);
var contactsx = {
    name: req.body.name,
    id: newId,
    Comment: req.body.Comment,
    email: req.body.email,
    choice: req.body.choice
  };
  
  console.log(contactsx);
  var json = JSON.stringify(contact); 
  

  
  fs.readFile('./models/contactstore.json', 'utf8', function readFileCallback(err, data){
    if(err){
     throw(err);
         
    } else {
      
      contact.push(contactsx); 
      json = JSON.stringify(contact, null, 5);
      fs.writeFile('./models/contactstore.json', json, 'utf8')
    }
    
  })
  res.redirect("/contact");
  
});



app.get("/deletecontact/:id", function(req, res){
  var json = JSON.stringify(contact); 
  
  var keyToFind = parseInt(req.params.id) 
  var data = contact;
  var index = data.map(function(d) {return d.id;}).indexOf(keyToFind)
  console.log("The Key you ar looking for is : " + keyToFind);
  console.log("Delete process is done");
  contact.splice(index, 1);
  json = JSON.stringify(contact, null, 5); 
      fs.writeFile('./models/contactstore.json', json, 'utf8')
  res.redirect("/contact");
});



app.get('/editcontact/:id', function(req, res){
 function chooseProd(indOne){
   return indOne.id === parseInt(req.params.id)
 }
 
  var indOne = contact.filter(chooseProd);
  
   res.render('editcontact' , {indOne});
 
 });



app.post('/editcontact/:id', function(req, res){
 var json = JSON.stringify(contact);
 var keyToFind = parseInt(req.params.id); 
 var data = contact;
 var index = data.map(function(contact) {return contact.id;}).indexOf(keyToFind)
 var y = req.body.Comment
 var z = parseInt(req.params.id)
 var x = req.body.choice
 contact.splice(index, 1, {name: req.body.name, Comment: y, id: z, email: req.body.email, choice: x});
 json = JSON.stringify(contact, null, 5);
 fs.writeFile('./models/contactstore.json', json, 'utf8'); // Write the file back
 res.redirect("/");
});


/// *********************** UPLOADER ***************************** ////

app.get('/upload', function(req, res) { // Call a get request when somebody visits the main url
    res.render('upload', {root:VIEWS});   // Sending a response which is just a string.
 
        
});




app.post('/upload', function(req, res) {
  if (!req.files)
    return res.status(400).send('No files were uploaded.');
 
  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  let sampleFile = req.files.sampleFile;
  filename = sampleFile.name;
  // Use the mv() method to place the file somewhere on your server
  sampleFile.mv('./images/' + filename, function(err) {
    if (err)
      return res.status(500).send(err);
 console.log("Here is the image " + req.files.sampleFile)
    res.redirect('/');
  });
});

//////// ******************* UPLOADER END ************************** ///


// Set up the location that the application runs on (The server)

app.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
  console.log("You are no connected......")
  
  
});