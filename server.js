// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// Get api/timestamp/:date_string

app.get('/api/timestamp/:date_string?', (req, res) => {
  const date = new Date((req.params.date_string)); // Get :date_string value && check is it's a valid date
  const newDate = new Date(Number(req.params.date_string)); // Get :date_string value,  convert it to a number && check is it's a valid date
  
  //Store dates
  
  let UTCDate;
  let unixDate;
  
  // If date string is not a number
  
  if(isNaN(req.params.date_string)) {
    UTCDate = date.toUTCString(); // Convert date to UTC && Store in variable
    unixDate = date.getTime(); // Convert date to unix
  } else {
    UTCDate = newDate.toUTCString();
    unixDate = newDate.getTime();
  }
  
  // If date is a date object
  
  if(Object.prototype.toString.call(date) === "[object Date]") {
  res.json({"unix": unixDate, "utc": UTCDate}); // Respond with dates
}

  
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});