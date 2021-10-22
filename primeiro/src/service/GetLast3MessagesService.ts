import prismaClient from "../prisma";

export class GetLast3MessagesService {
  async execute(){
    const massages = await prismaClient.message.findMany({
      take: 3, //traga 3
      orderBy: {
        //na ordem descrescente.
        created_at: 'desc'
      },
      include: {
        //incluindo o usuário.
        user: true
      }
    });

    return massages;
  }
}