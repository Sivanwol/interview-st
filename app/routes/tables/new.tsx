import { createReservation } from "~/models/reservations.server";
import { ActionArgs, json, redirect } from "@remix-run/node";
import { generateResponse, TableAction } from "~/utils/common";
import moment from "moment";

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const id = formData.get("id") as string;

  try {
    await createReservation(id, moment().toDate(), TableAction.SitAndLeave);
    return json(generateResponse({}));
  } catch (e) {
    // @ts-ignore
    return json(generateResponse(null, e.toString()));

    return redirect(`/tables/${id}`);
  }
}