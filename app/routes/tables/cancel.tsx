import { cancelReservation } from "~/models/reservations.server";
import { ActionArgs, json, redirect } from "@remix-run/node";
import { generateResponse } from "~/utils/common";

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const id = formData.get("id") as string;
  const reservationId = formData.get("reservation_id") as string;
  console.log(formData, id, reservationId);
  try {
    await cancelReservation(id, reservationId);
    return redirect(`/tables/${id}`);
  } catch (e) {
    // @ts-ignore
    return json(generateResponse(null, e.toString()));

  }
}