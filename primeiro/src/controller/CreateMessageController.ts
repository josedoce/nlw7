import { Req, Res } from "../@types/myexpress";
import { CreateMessageService } from "../service/CreateMessageService";

export class CreateMessageController {
  async handle(req: Req, res: Res) {
    const { message } = req.body;
    const { user_id } = req;

    const service = new CreateMessageService();
    const result = await service.execute(message, user_id);
    return res.json(result);
  }
}