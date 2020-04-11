const express = require('express');
const bodyParser = require('body-parser');
var app = express();
const config = require('./config/config');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const puerto = config.port;
const endpoint_farmacias = config.endpoint_farmacias;

app.listen(puerto, () => {
  console.log(`Server running on port${puerto}`);
});
  //POST Recibe parámetros
app.post('/api/v1/Farmacias/turno', function (req, res, next) {

      var searchArgs = 
      {

        "ft_comuna": req.body.comuna,
        "ft_farmacia": req.body.farmacia
      
      }  

      console.log("---------------------------------------");
      console.log("Recibiendo nueva solicitud con datos:");
      console.log("---------------------------------------");
      console.log("Argumentos recibidos: ", searchArgs);      

      var request = require('request');
      var options = {

        'method': 'GET',
        'url': endpoint_farmacias

      };

      request(options, function (error, response) { 
          if (error) throw new Error(error);
          console.log(response.body);
      });
      
      res.send('requerimiento ' + "comuna: " + req.body.comuna + "farmacia: " + req.body.farmacia);



})
  
app.get('/health.json', function(req, res) {
    res.status(200).json({"status": "UP"});
});
  
app.use( (req, res, next) => {
    res.status(404);
    res.json({     
      "mensError": "Ruta no encontrada"
    });
});
  
app.use( (err, req, res, next) => {
    res.status(500);    
    res.json({   
      "mensError": '${err}'    
    });
});




module.exports = app;