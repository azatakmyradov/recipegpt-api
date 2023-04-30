let express = require('express');
let app = express();
let PORT = 3000;
let bodyParser = require('body-parser');
let Cors = require('./src/Cors.js');

app.use(new Cors());
app.use(bodyParser.json());

// controllers
let Home = require('./src/controllers/Home.js');
let Recipe = require('./src/controllers/Recipe.js');
let Deploy = require('./src/controllers/Deploy.js');

// routes
app.get('/', Home.index);
app.post('/recipe/list', Recipe.list);
app.post('/recipe/make', Recipe.make);
app.post('/deploy', Deploy.pull);

app.listen(PORT, () => console.log('App listening on port: ' + PORT));
