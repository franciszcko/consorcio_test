const sql = require('mssql');
const config = require('../config/config');
const configdb = {
  user: config.db.user,
  password: config.db.pass,
  server: config.db.url, // You can use 'localhost\\instance' to connect to named instance
  database: config.db.dbname,
  port: config.db.port

  // options: {
  //     encrypt: true // Use this if you're on Windows Azure
  // }
}

var executeQuery = function(resp, query){
    sql.connect(configdb, function (err) {
        if (err) {
                    console.log("Error while connecting database :- " + err);
                    res.send(err);
        }
        else {
              // create Request object
              var request = new sql.Request();
              // query to the database
              request.query(query, function (err, res) {
                if (err) {
                            console.log("Error while querying database :- " + err);
                            sql.close();
                            resp.json({
                              "codigo-respuesta": 500,
                              "detalle": `${err}`
                            });
                          // resp.send(err);
                            
                }
                else {
                        console.log(res)
                        sql.close();
                        resp.json({
                          "codigo-respuesta": 200,
                          "detalle": `Registro ok`
                        });
                      }
                });
          }
     });           
  }



  var  executeProcedure = function(resp, args){

    var djcId = 0;
    var codErr = 1;
    var msgErr = "Error desconocido";


    sql.connect(configdb, function (err) {
        if (err) {
              console.log("Error conectando a la BD : " + err);
              codErr = 2;
              msgErr = "Error al conectar con Servidor de Base de Datos";
        }
        else {

              console.log("Conexión a BD OK... Preparando parametros de entrada...");

              var request = new sql.Request();
              try{
                  request.input('djc_TipoDocumento', sql.Int, args.djc_TipoDocumento);      
                  request.input('djc_Documento', sql.NVarChar, args.djc_Documento);  
                  request.input('djc_Nombres', sql.NVarChar, args.djc_Nombres);
                  request.input('djc_Apellidos', sql.NVarChar, args.djc_Apellidos);
                  request.input('djc_Nacionalidad', sql.Int, args.djc_Nacionalidad);    
                  request.input('djc_Genero', sql.NVarChar, args.djc_Genero);
                  request.input('djc_MedioTranspId', sql.Int, args.djc_MedioTranspId);
                  request.input('djc_ControlFrontId', sql.Int, args.djc_ControlFrontId);
                  request.input('djc_PaisProcId', sql.Int, args.djc_PaisProcId);
                  request.input('djc_DireccionChile', sql.NVarChar, args.djc_DireccionChile);
                  request.input('djc_FechaDeclaracion', sql.NVarChar, args.djc_FechaDeclaracion); //formato yyyy-mm-dd
              } catch (err){
                  console.log(err);
                  codErr = 3;
                  msgErr = "Error en formato de parametro de entrada : " + err;
              }
              
              
              request.execute('INS_DeclaracionJurada', (errSP, result) =>  {
                  
                  if(errSP) {
                      console.log("Error al ejecutar procedimiento : " + errSP);
                      codErr = 4;
                      msgErr = "Error interno al ejecutar Procedimiento Almacenado : " + errSP;


                  } else {
                    
                    if(result.recordsets.length>0){
                        var cantResultSet = result.recordsets.length;
                        var indx = cantResultSet - 1;

                        console.log("Respuesta desde SP:");
                        console.log(result.recordset);

                        djcId = result.recordset[indx].djcId;
                        codErr = result.recordset[indx].codError;
                        msgErr = result.recordset[indx].msgError;


                    } else {
                        console.log("Sin respuesta desde SP");
                        codErr = 5;
                        msgErr = "No se recibió respuesta desde Procedimiento Almacenado";
                    }                    
                  }

                  sql.close();
                  console.log("===>> Finaliza ejecución del SP.... Enviando respuesta....");

                  resp.send({
                    "idDeclaracionJurada" : djcId,
                    "codigoError": codErr,
                    "mensError": msgErr
                  });

              });                  
            }
        });           
  }

  module.exports.executeQuery = executeQuery;
  module.exports.executeProcedure = executeProcedure;
  