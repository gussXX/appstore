// importando os pacotes para uso no arquivo index.js
const express     = require('express');
const morgan      = require('morgan');
const cors        = require('cors');
const bodyParser  = require('body-parser');

// crio um servidor express
const app = express();

//=======================C O R S=========================
const ampCors = require('amp-toolbox-cors');
app.use(ampCors());

app.use(ampCors({
  verifyOrigin: false
}));

app.use(ampCors({
  allowCredentials: false
}));

app.use(ampCors({
  enableAmpRedirectTo: false
}));

app.use(ampCors({
  verbose: false
}));
//=======================C O R S=========================

// aplico configurações para dentro do servidor express, adicionando middlewares (body-parser, morgan, cors)
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({origin: '*'}));


// DB local (tempo de execução)
const data = {
    "user" : "guss",
    "key" : 1
};

const routes = require('./routes');
//LIMITE DAS REQUISIÇOES JSON
app.use(routes)

// criação de rota que será acessada utilizando o método HTTP GET/
// http://localhost:9000/
app.get('/', (req, res) => {
  return res.json(data);
});

// criação de rota que será acessada utilizando o método HTTP POST/
// http://localhost:9000/add
app.post('/add', (req, res) => {
  const result = req.body;

  if (!result) {
    return res.status(400).end();
  }

  data.push(result);
  return res.json({ result });
});

// o servidor irá rodar dentro da porta 9080
app.listen(9080, () => console.log('Express Iniciado!'));