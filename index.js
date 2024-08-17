const express = require('express');
const mysql = require("mysql2");
const routes = require("./route")

const app = express();
const port = 3000;

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({
  extended: true,
  limit: '50mb',
  parameterLimit: 50000
}));
app.use(express.raw({type: '*/*', limit: '50mb'}))


app.use('/', routes);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
