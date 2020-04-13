const express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
var app = express();
const config = require('./config/config');
const request = require('request');
var cors = require('cors');

app.use(cors());
app.options('*', cors());
app.use(express.json());

 app.use('*',function(req, res, next) {

  res.header("Access-Control-Allow-Origin", "*"); 
  res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
 
  next(); 

  
}); 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/', router);

const puerto = config.port;
const endpoint_proxy = config.proxy_cors;
const url = config.endpoint_farmacias;

app.listen(puerto, () => {
  console.log(`Server running on port${puerto}`);
});



  //POST Recibe parámetros
   
app.post('/api/v1/Farmacias/turno', function (req, res,next) {

    var searchArgs = 
      {
        "comuna": req.body.comuna,
        "farmacia": req.body.farmacia      
      }  
 
      console.log("---------------------------------------");
      console.log("Recibiendo nueva solicitud con datos:");
      console.log("---------------------------------------");
      console.log("Argumentos recibidos: ", req.body);      

      var options = {
        headers: {
          'origin': 'x-requested-with'
        },
        'url': url
      };
      var json_farmacias = {farmacias:[]};      
      request(options, function (error, response) { 

          if (error) throw new Error(error);        
          var arrayJson = JSON.parse(response.body);        
          console.log(arrayJson.length);      

          for (value in arrayJson){
              if (arrayJson[value].fk_comuna == req.body.comuna && arrayJson[value].local_nombre.toUpperCase() == req.body.farmacia.toUpperCase() ){
                           
                json_farmacias.farmacias.push(arrayJson[value]);

              }                        
          }            

          console.log(json_farmacias);  
          res.json(json_farmacias);             
      });       
})
  
app.get('/api/v1/Farmacias/health.json', function(req, res) {
    res.status(200).json({"status": "UP"});
});
  
app.use( (req, res, next) => {
    res.status(404);
    res.json({     
      "mensError": "Ruta no encontrada2"
    });
});
  
app.use( (err, req, res, next) => {
    res.status(500);    
    res.json({   
      "mensError": err.message    
    });
});

module.exports = app;