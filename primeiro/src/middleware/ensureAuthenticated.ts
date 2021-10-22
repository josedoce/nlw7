import { verify } from "jsonwebtoken";
import { IPayload, Next, Req, Res } from "../@types/myexpress";

export function ensureAuthenticated(req: Req, res: Res, next: Next) {
  const authToken = req.headers.authorization;

  if(!authToken) {
    return res.status(401).json({errorCode: "token.invalid"});
  }

  //Bearer sdfkdsfkjsdjfsf...

  const [, token] = authToken.split(" ");
  try {
    const {sub} = verify(token, process.env.JWT_SECRET) as IPayload;
    //se tudo correr bem, passe adiante com sub...
    req.user_id = sub;

    return next();
  } catch (error) {
    return res.status(401).json({errorCode: "token.expired"});
  }



}