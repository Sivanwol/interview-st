import { prisma } from "~/utils/db.server";


export async function getTables() {
  return prisma.tables.findMany();
}

export async function tableExist(tableID: string) {
  return await prisma.tables.count({ where: { id: tableID } }) > 0;
}