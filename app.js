const express = require('express'); //Define the express' library
const app = express(); //Create an instance of the express' app
const port = 3000; //We choose the port where it's gonna be executed
const routerApi = require('./routes'); //Calling the routerApi modules
const {logErrors, errorHandler, boomErrorHandler} = require('./middlewares/errorHandler');//Calling the error's middlewares

//Middleware to recognize JSON objects
app.use(express.json());

app.get('/', (req, res) => {
  res.send({
    name: 'Reynel Santiago Bustamante',
    topic: 'Starting express\'webserver'
  });
});

//Starting the routerApi segment
routerApi(app);

//Starting the errormidlewares, who were previously put in the error section of the services
app.use(logErrors);
app.use(boomErrorHandler); 
app.use(errorHandler);


app.listen(port, () => {
  console.log(`The server is running in the port ${port}`);
})
