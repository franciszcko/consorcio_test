# Introduction 
MS de la capa exposición, que comunicara el front y la capa de negocio, recibira la data desde el front (comuna y nombre de farmacia) y envíara información a MS de capa de negocios

# Getting Started
En esta sección definiremos la forma de instalar/ejecutar dependencias y ejecución 

1.	Installation: 

Npm Install 
Npm Install mocha-data-driven

2.	Software dependencies
Node 
Npm 
3.	Latest releases
Beta
4.	API references
Ejecución 

Node index.js

Localhost 
   Recibe id farmacia y id comuna 
   http://localhost:5011/api/v1/Farmacias/turno
Ejemplo de request 
   {
        "comuna": [id_comuna],
        "farmacia": [id_farmacia]
   }
# Build and Test
Para ejecutar los unit test debemos ejecutar el siguiente comando: 

 Este mostrara pequeño reporte de pruebas para humanos
 npm run test-with-coverage 
 
Este genera reporte para sonarqube
 npm run test-with-coverage-sonarqube

 En la siguiente ruta se genera un pequeño reporte
 .nyc_output


