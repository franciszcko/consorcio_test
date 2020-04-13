const assert = require ('chai').assert;
var data_driven = require('mocha-data-driven');
const expect = require ('chai').expect;
const app = require('../index.js');
const request = require('supertest');
var data_driven = require('mocha-data-driven');


describe ('¿Está vivo!!!!?', () => {
    
      after(() => {
        console.log("termino..........");
      })
        it ('OK, Creando un request', 
                  (done) => {
                      request(app).get('/api/v1/Farmacias/health.json')
                      .then ((res) => {
                        
                        //validando status code                           
                          expect(res.statusCode).to.equal(200);; 

                         
                          done();
                          
                      })
                      .catch((err) => done(err));

        });                
  
});

describe ('Post a endpoint farmacias, parámetros comuna y farmacias', () => {
    
      after(() => {
        console.log("termino..........");
      })

      contador = 0;
  describe('set de datos {contador}', function(){
        data_driven([
            {Comuna_id: "83", farmacia_id: 107, farmacia_nombre: 'CRUZ VERDE', comuna_nombre: "Buin"},
            {Comuna_id: "130", farmacia_id: 490,farmacia_nombre: 'CRUZ VERDE', comuna_nombre: "Santiago"}, 
            {Comuna_id: "124", farmacia_id: 5,farmacia_nombre: 'AHUMADA', comuna_nombre: "San Bernardo"}
            ],  function(){
    
                  it ('OK, Creando un request', 
                  (req,done) => {
                      request(app).post('/api/v1/Farmacias/turno').send({          

                          "comuna": req.Comuna_id,
                          "farmacia": req.farmacia_nombre        
                  
                      })
                      .then ((res) => {
                        
                          const body = res.body.farmacias;  

                          //Recorre lista de farmacias 

                          console.log(body);
                          var array_farmacias = body; 
                          var length = array_farmacias.length;
                          if (length == undefined ){
                            assert.fail("lista vacía", "lista", 'Lista vacía');
                          }

                          for (value in array_farmacias){

                            //Expect campos en cada node

                            expect(array_farmacias[value]).to.contain.property('local_nombre');
                            expect(array_farmacias[value]).to.contain.property('local_direccion');
                            expect(array_farmacias[value]).to.contain.property('local_telefono');  
                            expect(array_farmacias[value]).to.contain.property('local_lat');  
                            expect(array_farmacias[value]).to.contain.property('local_lng'); 

                            //expect data en campos id farmacia,  nombre de farmacia y comuna
                            expect(array_farmacias[value].local_nombre.trim()).to.equals(req.farmacia_nombre.toUpperCase());    
                            expect(array_farmacias[value].comuna_nombre.trim()).to.equals(req.comuna_nombre.toUpperCase());     
                            expect(array_farmacias[value].fk_comuna).to.equals(req.Comuna_id);                                           

                          }                                        
                              
                          done();
                          
                      })
                      .catch((err) => done(err));

                  });

                });
  });
});