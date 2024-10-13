import jsonServer from 'json-server';
import { v4 as uuidv4 } from 'uuid';

const server = jsonServer.create();
const router = jsonServer.router('data/db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);

// Middleware para gerar o ID com uuid antes de criar um evento
server.use(jsonServer.bodyParser);

server.post('/eventos', (req, res, next) => {
    req.body.id = uuidv4(); // Gerando o ID com uuid
    next();
});

server.use(router);

const PORT = 3334;

server.listen(PORT, () => {
    console.log(`JSON Server está rodando em http://localhost:${PORT}`);
});
