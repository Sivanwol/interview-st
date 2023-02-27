import { cancelReservation, createReservation, getReservations, leaveReservation } from "~/models/reservations.server";
import { generateResponse, TableAction } from "~/utils/common";
import { ActionArgs, json, LoaderArgs } from "@remix-run/node";
import invariant from "tiny-invariant";
import moment from "moment";

export async function getReservationsList({ request, params }: LoaderArgs) {
  try {
    invariant(params.tableId, "tableId not found");
    const entities = await getReservations(params.tableId);
    return json(generateResponse({ reservations: entities }));
  } catch (e) {
    // @ts-ignore
    return json(generateResponse(null, e.toString()));
  }
}


export async function cancelReservationTable({ request, params }: LoaderArgs) {
  try {
    invariant(params.tableId, "tableId not found");
    invariant(params.id, "id not found");
    await cancelReservation(params.tableId, params.id);
    return json(generateResponse({}));
  } catch (e) {
    // @ts-ignore
    return json(generateResponse(null, e.toString()));
  }
}

export async function leaveReservationTable({ request, params }: LoaderArgs) {
  try {
    invariant(params.tableId, "tableId not found");
    invariant(params.id, "id not found");
    await leaveReservation(params.tableId, params.id);
    return json(generateResponse({}));
  } catch (e) {
    // @ts-ignore
    return json(generateResponse(null, e.toString()));
  }
}


export async function getReservationsTable({ request, params }: LoaderArgs) {
  try {
    invariant(params.tableId, "tableId not found");
    const entities = await getReservations(params.tableId);
    return json(generateResponse({ reservations: entities }));
  } catch (e) {
    // @ts-ignore
    return json(generateResponse(null, e.toString()));
  }
}

export async function createReservationTable({ request, params }: ActionArgs) {
  try {
    invariant(params.tableId, "tableId not found");
    invariant(params.action, "action not found");
    const action = TableAction[parseInt(params.action)] ?? TableAction.Register;
    const entity = await createReservation(params.tableId, moment().toDate(), TableAction[action as keyof typeof TableAction]);
    return json(generateResponse({ reservation: entity }));
  } catch (e) {
    // @ts-ignore
    return json(generateResponse(null, e.toString()));
  }
}