const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partial');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now} : ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (error) => {
    if(error){
      console.log('Unable to append server.log file');
    }
  });
  next();
});

//app.use((req, res, next) => {
//  res.render('maintenance.hbs', {
//    pageTitle : "Maintance Page",
//    welcomeMessage : "Site under maintance we will right back soon"
//  });
//});

hbs.registerHelper('getCurrentYear', () =>{
  return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) =>{
  return text.toUpperCase();
});

app.use(express.static(__dirname + '/public'));

app.get('/',(req, res) => {
  res.render('home.hbs', {
    pageTitle : "Home Page",
    welcomeMessage : "Welcome To DVPS School Site.We provide better education for your child for better future"
    });
});

app.get('/about', (req, res) =>{
  res.render('about.hbs', {
    pageTitle : "About Page"
  });
});

app.get('/contactUs', (req, res) =>{
  res.render('contactUs.hbs', {
    pageTitle : "Contact Us",
    welcomeMessage : "Please Contact us : \n Email : sudhirthakur4@gmail.com \n Mobile No : 07411793462"
  });
});

app.get('/home', (req, res) =>{
  res.send('<h1>Home Page!</h1>');
});

app.get('/bad', (req, res) =>{
  res.send({
    error : 'Unable to handel request'
  });
});

app.listen(port, () => {
  console.log(`Server started and listen into port ${port}`);
});
