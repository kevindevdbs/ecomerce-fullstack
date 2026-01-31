import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const connectionString = `${process.env.DATABASE_URL}`;

// 1. Cria o Pool de conexão (Isso é obrigatório no Prisma 7 com Adapter)
const pool = new Pool({ connectionString });

// 2. Passa o pool para o adaptador
const adapter = new PrismaPg(pool);

const globalForPrisma = global as unknown as {
  prisma: PrismaClient;
};

// 3. Inicializa o Prisma com o adaptador
const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    adapter,
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;
