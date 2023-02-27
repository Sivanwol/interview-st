import { json } from "@remix-run/node";

export const loader = async () => {
  return json([
    { id: "1", name: "Pants" },
    { id: "2", name: "Jacket" }
  ]);
};