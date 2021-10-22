import { Req, Res } from "../@types/myexpress";
import { ProfileUserService } from "../service/ProfileUserService";

export class ProfileUserController {
  async handle(req: Req, res: Res) {
    const {user_id} = req;

    const service = new ProfileUserService();

    const result = await service.execute(user_id);

    return res.json(result);
  }
}