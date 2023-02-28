import { prisma } from "~/utils/db.server";
import moment from "moment";


export async function getReservationTables() {
  return prisma.tables.findMany({
    where: {
      reservations: {
        every: {
          registerAt: {
            gte: moment().toDate()
          },
          cancelAt: null
        }
      }
    },
    include: {
      reservations: true
    }
  });
}

export async function getFreeTables() {
  return prisma.tables.findMany({
    where: {
      OR: [
        {
          reservations: {
            none: {}
          }
        }, {
          reservations: {
            every: {
              registerAt: {
                lt: moment().toDate()
              },
              cancelAt: null
            }
          }
        }, {
          reservations: {
            every: {
              registerAt: {
                lt: moment().toDate()
              },
              cancelAt: {
                gte: moment().toDate()
              }
            }
          }
        }
      ]
    },
    include: {
      reservations: true
    }
  });
}

export async function tableExist(tableID: string) {
  return await prisma.tables.count({ where: { id: tableID } }) > 0;
}