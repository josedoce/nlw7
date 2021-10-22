import { Req, Res } from "../@types/myexpress";
import { GetLast3MessagesService } from "../service/GetLast3MessagesService";

export class GetLast3MessagesController {
  async handle(req: Req, res: Res) {
    const service = new GetLast3MessagesService();

    const result = await service.execute();

    return res.json(result);
  }
}