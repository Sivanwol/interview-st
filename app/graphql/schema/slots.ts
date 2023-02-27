import { Prisma, RestTable } from "@prisma/client";
import type { Slots } from "@prisma/client";
import { t } from "./type-factory";
import { RestTableType } from "~/graphql/schema/restTable";
import moment from "moment";

export const SlotsType = t.objectType<Slots & { table: RestTable }>({
  name: "slots",
  fields: () => [
    t.field({ name: "id", type: t.NonNull(t.ID) }),
    t.field({ name: "total", type: t.NonNull(t.Int) }),
    t.field({
      name: "reservationAt", type: t.NonNull(t.String), resolve({ reservationAt }) {
        return moment(reservationAt).format("dd-mm-YYYY H:M:s");
      }
    }),
    t.field({ name: "table", type: t.NonNull(RestTableType) })
  ]
});

export enum OrderSlotsBy {
  reservationAt
}

export const OrderRestTableByEnum = t.enumType({
  name: "OrderRestTableBy",
  values: [
    { name: "reservation", value: OrderSlotsBy.reservationAt }
  ]
});


