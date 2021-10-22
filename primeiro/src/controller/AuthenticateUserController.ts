import { Req, Res } from "../@types/myexpress";
import { AuthenticateUserService } from "../service/AuthenticateUserService";

export class AuthenticateUserController {
  async handle(req: Req, res: Res){
    const { code } = req.body;
    const service = new AuthenticateUserService();
    try {
      const result = await service.execute(code);
      return res.json(result);
    } catch (error) {
      return res.json({error: error.message});
    }

  }
}