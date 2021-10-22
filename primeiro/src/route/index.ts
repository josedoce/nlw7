import {Router} from 'express';
import { Req, Res } from '../@types/myexpress';
import { AuthenticateUserController } from '../controller/AuthenticateUserController';
import { CreateMessageController } from '../controller/CreateMessageController';
import { GetLast3MessagesController } from '../controller/GetLast3MessagesController';
import { ProfileUserController } from '../controller/ProfileUserController';
import { ensureAuthenticated } from '../middleware/ensureAuthenticated';

const route = Router();

route
.post('/authenticate', new AuthenticateUserController().handle)
.post('/messages', ensureAuthenticated, new CreateMessageController().handle)
.get('/messages/last3', new GetLast3MessagesController().handle)
.get('/profile', ensureAuthenticated, new ProfileUserController().handle)
.get('/github', (req: Req, res: Res)=>{
  /**
   * Ao ser direcionado para esse link, será exigido a authorização
   * depois, o usuário será redirecionado com seus dados
   * para uma rota definida na mesma aplicação...
   * no caso, a rota abaixo: /signin/callbasck
   */
  return res.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`);
})

.get('/signin/callbasck', (req: Req, res: Res)=>{
  /**
   * Esse código será usado para criar um usuário
   * autenticado no github para nossa aplicação.
   */
  const { code } = req.query;
  
  return res.json(code);
});

export { route }