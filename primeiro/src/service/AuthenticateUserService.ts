import axios from 'axios';
import { IAccessTokenResponse, IUserResponse } from '../@types/mytypes/oauth';
import prismaClient from '../prisma'; 
import {sign} from 'jsonwebtoken';
import { logger } from '../utils/logger';
/**
 * Passos:
 * Receber code(string)
 * Recuperar o access_token no github
 * Recuperar infos do user no github
 * Verifica se o usuário existe no DB
 * ----SIM = Gera um token
 * ----NÂO = Cria no DB, gera um token
 * Retornar o token com as infos do user
 * 
 * Usaremos o axios para tal...
*/
export class AuthenticateUserService {
  async execute(code: string){
    
    const 
      URL = "https://github.com/login/oauth/access_token",
      URL_API = "https://api.github.com/user";


    //conseguindo o token, poderemos consultar o usuário na api.
    const {data: accessTokenResponse} = await axios.post<IAccessTokenResponse>(URL, null, {
      params: {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
      },
      headers: {//exigindo um retorno em json...
        Accept:"application/json"
      }
    });

    const response = await axios.get<IUserResponse>(URL_API, {
      headers: {
        authorization: `Bearer ${accessTokenResponse.access_token}`
      }
    })
    
    const { login, id, avatar_url, name } = response.data;

    let user = await prismaClient.user.findFirst({
      where: {
        github_id: id,
      }
    });

    if(!user) {
      //se usuário não existir, crie...
      user = await prismaClient.user.create({
        data: {
          github_id: id,
          login,
          avatar_url,
          name
        }
      });
      logger.info(`${user.name} was created`);
    }
    //criando o token.
    const token = sign({
      user: {
        name: user.name,
        avatar_url: user.avatar_url,
        id: user.id
      }
    }, process.env.JWT_SECRET,
    {
      subject: user.id,
      expiresIn: process.env.JWT_EXPIRES
    });

    return {token, user};
  }
}