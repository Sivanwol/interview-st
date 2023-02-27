import { Prisma } from "@prisma/client";
import type { RestTable } from "@prisma/client";
import { t } from "./type-factory";

export const RestTableType = t.objectType<RestTable>({
  name: "table",
  fields: () => [
    t.field({ name: "id", type: t.NonNull(t.ID) }),
    t.field({ name: "size", type: t.NonNull(t.Int) }),
    t.field({ name: "type", type: t.NonNull(t.String) }),
  ],
});
export enum OrderRestTableBy {
  size,
  type
}

export const OrderRestTableByEnum = t.enumType({
  name: "OrderRestTableBy",
  values: [
    { name: "type", value: OrderRestTableBy.type },
    { name: "size", value: OrderRestTableBy.size }
  ],
})

export const OrderDirectionEnum = t.enumType({
  name: "OrderDirection",
  values: [
    { name: "asc", value: Prisma.SortOrder.asc },
    { name: "desc", value: Prisma.SortOrder.desc },
  ],
});

