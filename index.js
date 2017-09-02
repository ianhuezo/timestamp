var express = require('express'),
  app = express(),
  http = require('http'),
  httpServer = http.Server(app);
var url = require('url');
app.use(express.static(__dirname));

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});
app.get('*', function(req,res){
  var theDate = req.path.substring(1);
  var input = theDate;
  var normalDate = timeConverterNormal(theDate);
  var unixDate = timeConverterUnix(theDate);
  var theTime = checkDate(normalDate, unixDate, input);
  if(theTime.natural === "NaN undefined NaN"){
    theTime.natural = null;
  }
  res.end(JSON.stringify({
    "unix": theTime.unix,
    "natural": theTime.natural,
  }))
});
app.listen(7000);

function checkDate(normalDate, unixDate, input){
  var dateObject = {};
  if(normalDate === "NaN undefined NaN" && unixDate === "NaN"){
    unixDate = null;
    normalDate = null;
  }
  else if(unixDate !== null && normalDate === "NaN undefined NaN"){
    normalDate = timeConverterNormal(unixDate);
  }
  else if(normalDate !== "NaN undefined NaN"){
    unixDate = timeConverterUnix(normalDate)
  }
  return dateObject = {"unix": unixDate, "natural": normalDate}
}


function timeConverterNormal(UNIX_timestamp){
  var a = new Date(UNIX_timestamp*1000);
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var time = date + ' ' + month + ' ' + year;
  return time;
}

function timeConverterUnix(timestamp){
  var E = Date.parse(timestamp);
  if(E !== "NaN"){
    return E / 1000;
  }
}
