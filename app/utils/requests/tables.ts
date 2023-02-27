import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { getTables } from "~/models/table.server";
import { generateResponse } from "~/utils/common";

export async function getTablesList({ request }: LoaderArgs) {
  try {
    const tables = await getTables();
    return json(generateResponse({ tables }));
  } catch (e) {
    // @ts-ignore
    return json(generateResponse(null, e.toString()));
  }
}