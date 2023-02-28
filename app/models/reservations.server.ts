import { prisma } from "~/utils/db.server";
import moment from "moment";
import { TableAction } from "~/utils/common";
import { tableExist } from "~/models/table.server";


export async function getReservations(tableId: string) {
  const data = await prisma.reservations.findMany({
    where: {
      tableId,
      registerAt: {
        lt: moment().add(9, "hour").startOf("hour").toDate(),
        gt: moment().startOf("hour").toDate()
      },
      cancelAt: null
    }
  });
  return data;
}

export async function getReservation(tableId: string, reservationId: string) {
  if (!(await tableExist(tableId))) throw new Error("invalid table id");
  return prisma.reservations.findFirstOrThrow({
    where: {
      id: reservationId,
      cancelAt: null
    }
  });

}

export async function createReservation(tableId: string, reservationAt: Date, action: TableAction) {
  if (moment(reservationAt) < moment()) throw new Error("invalid date");
  if (!(await tableExist(tableId))) throw new Error("invalid table id");
  await prisma.reservations.create({
    data: {
      tableId,
      registerAt: reservationAt,
      sitAt: (action === TableAction.SitAndLeave || action === TableAction.Sit) ? reservationAt : null,
      leaveAt: action === TableAction.SitAndLeave ? reservationAt : null,
      cancelAt: null
    }
  });
}

export async function leaveReservation(tableId: string, reservationId: string) {
  const reservation = await getReservation(tableId, reservationId);
  if (reservation) {
    await prisma.reservations.update({
      where: {
        id: reservationId
      },
      data: {
        leaveAt: moment().toDate()
      }
    });
  }
}


export async function cancelReservation(tableId: string, reservationId: string) {
  const reservation = await getReservation(tableId, reservationId);
  if (reservation) {
    await prisma.reservations.update({
      where: {
        id: reservationId
      },
      data: {
        cancelAt: moment().toDate()
      }
    });
  }
}