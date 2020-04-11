const assert = require ('chai').assert;
var data_driven = require('mocha-data-driven');
const expect = require ('chai').expect;
const app = require('../index.js');
const request = require('supertest');
const conn = require('../conexionBD/conn.js');

describe ('Post /api/v1/FURI/insDeclaracionJurada', () => {
    
      after(() => {
        console.log("termino..........");
      })
    
    it ('OK, Creando un request', (done) => {
        request(app).post('/api/v1/FURI/insDeclaracionJurada').send({

            "tipoDocumento":"1",
            "nroDocumento":"13973798-9",
            "nombres": "Juan",
            "apellidos": "Segovia",
            "idNacionalidad":"7",
            "idGenero":"M",            
            "idMedioTransporte": "9",
            "idControlFronterizo": "5",
            "idPaisProcedencia":"1",
            "direccionEnChile":"La Paloma 245",
            "fechaDeclaracion":"20-08-2019"
         })
         .then ((res) => {
           
             const body = res.body;                            
             expect(body).to.contain.property('idDeclaracionJurada');
             expect(body).to.contain.property('codigoError');
             expect(body).to.contain.property('mensError');   
             expect(body.mensError).to.equals('');            
             done();
            
         })
         .catch((err) => done(err));

    });



});