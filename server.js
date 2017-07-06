var express = require('express');
var bodyParser = require('body-parser');
var massive = require('massive');
var _ = require('lodash');
 var db = massive.connectSync({
  connectionString :  'postgres://vbkyinmcvyvvku:56456e5d1395a6077367357454077c990904c77f0c9191440895121eddf35d22@ec2-107-21-113-16.compute-1.amazonaws.com:5432/d736lme3p4m3ku?ssl=true'
});
console.log(db);



var app = express();
app.use(bodyParser.json());

var port = 3000;

app.get('/', function (req,res) {
  var cake = _.template(`
  <h1>Injuries List</h1>
    <% injuries.forEach(function(injury) { %>
    <div><%=injury.name %> - <%= injury.description %></div>
  <% }) %>
   `);

   db.getAllInjuries(function(err,injuries){
    var html= cake({
    injuries: injuries
    
  })
  res.send(html)
});
});


app.get('/incidents', function(req, res) {
  var state=req.query.state;
  if (state){
    db.getIncidentsByState([state],(function(err,incidents){
      res.send(incidents)
    }));
  }
  else {
 db.getAllIncidents(function(err,incidents){
  res.send(incidents);
    });
  }
  });
  

 


app.post('/incidents', function(req, res) {
  var incident=req.body;
  db.createIncident([incident.state,incident.injuryId, incident.causeId],function(err,result){
    res.send(result[0]);
  })

});

app.listen(port, function() {
  console.log("Started server on port", port);
});
