import 'dotenv/config';
import express from 'express';
import { route } from './src/route';
import { logger } from './src/utils/logger';
import { Server } from 'socket.io';
import http from 'http';
import cors from 'cors';

const app = express();
app.use(cors());
const serverHttp = http.createServer(app);

const io = new Server(serverHttp, {
  cors: {
    origin: '*'
  }
});

io.on('connection', socket => {
  logger.info('Usuário conectado no socket '+socket.id);
});

app
.use(express.json())
.use(route);

export {serverHttp, io};