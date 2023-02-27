import { prisma } from "~/utils/db.server";

export type { RestTable } from "@prisma/client";

export async function getTables() {
  return prisma.restTable.findMany();
}

export async function tableExist(tableID: string) {
  return await prisma.restTable.count({ where: { id: tableID } }) > 0;
}