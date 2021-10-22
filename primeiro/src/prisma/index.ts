import {PrismaClient} from '@prisma/client';
//com isso, poderemos fazer consultas no db

const prismaClient = new PrismaClient();

export default prismaClient;