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

describe ('Post a endpoint farmacias/turno, parámetros comuna y farmacias', () => {
    
      after(() => {
        console.log("termino..........");
      })

      contador = 0;
  describe('set de datos {contador}', function(){
        data_driven([
            {Comuna_id: 83, farmacia_id: 107, farmacia_nombre: 'Cruz Verde', comuna_nombre: "Buin"},
            {Comuna_id: 130, farmacia_id: 490,farmacia_nombre: 'Salco Brand', comuna_nombre: "Santiago"},
            {Comuna_id: 124, farmacia_id: 5,farmacia_nombre: 'Ahumada', comuna_nombre: "San Bernardo"}
            ],  function(){
    
                  it ('OK, Creando un request', 
                  (req,done) => {
                      request(app).post('/api/v1/Farmacias/turno').send({          

                          "comuna": req.Comuna_id,
                          "farmacia": req.farmacia_id          
                  
                      })
                      .then ((res) => {
                        
                          const body = res.body;  

                          //Recorre lista de farmacias 
                          var array_farmacias = body; 
                          var length = array_farmacias.length;
                          if (length == undefined ){
                            assert.fail("lista vacía", "lista", 'Lista vacía');
                          }

                          for (value in array_farmacias){

                            //Expect campos en cada node

                            expect(array_farmacias.local).to.contain.property('local_nombre');
                            expect(array_farmacias.local).to.contain.property('local_direccion');
                            expect(array_farmacias.local).to.contain.property('local_telefono');  
                            expect(array_farmacias.local).to.contain.property('local_lat');  
                            expect(array_farmacias.local).to.contain.property('local_lng'); 

                            //expect data en campos id farmacia,  nombre de farmacia y comuna
                            expect(array_farmacias.local.local_nombre.trim()).to.equals(farmacia_nombre);     
                            expect(array_farmacias.local.comuna_nombre.trim()).to.equals(comuna_nombre);                                           

                          }                                        
                              
                          done();
                          
                      })
                      .catch((err) => done(err));

                  });

                });
  });
});