import { Prisma, reservationSlots, RestTable, Slots } from "@prisma/client";
import { t } from "./type-factory";
import { RestTableType } from "~/graphql/schema/restTable";
import moment from "moment";
import { SlotsType } from "~/graphql/schema/slots";

export const ReservationSlotsType = t.objectType<reservationSlots & { table: RestTable, slot: Slots }>({
  name: "reservationSlots",
  fields: () => [
    t.field({ name: "id", type: t.NonNull(t.ID) }),
    t.field({
      name: "registerAt", type: t.NonNull(t.String), resolve({ registerAt }) {
        return moment(registerAt).format("dd-mm-YYYY H:M:s");
      }
    }),
    t.field({
      name: "sitAt", type: t.String, resolve({ sitAt }) {
        return sitAt?moment(sitAt).format("dd-mm-YYYY H:M:s"): null;
      }
    }),
    t.field({
      name: "leaveAt", type: t.String, resolve({ leaveAt }) {
        return leaveAt?moment(leaveAt).format("dd-mm-YYYY H:M:s"): null;
      }
    }),
    t.field({
      name: "cancelAt", type: t.String, resolve({ cancelAt }) {
        return cancelAt?moment(cancelAt).format("dd-mm-YYYY H:M:s"): null;
      }
    }),
    t.field({ name: "table", type: t.NonNull(RestTableType) }),
    t.field({ name: "slot", type: t.NonNull(SlotsType) })
  ]
});

export enum OrderReservationBy {
  sitAt,
  cancelAt
}

export const OrderReservationByEnum = t.enumType({
  name: "OrderReservationBy",
  values: [
    { name: "sitAt", value: OrderReservationBy.sitAt },
    { name: "cancelAt", value: OrderReservationBy.cancelAt }
  ]
});

type CreateReservationFields = { table: string; slot: string };


type CreateFieldErrors = { name?: string; content?: string };

export const CreateFieldErrorsType = t.objectType<CreateFieldErrors>({
  name: "CreateFieldErrors",
  fields: () => [
    t.field({
      name: "name",
      type: t.String,
      resolve({ name }) {
        return name;
      },
    }),
    t.field({
      name: "content",
      type: t.String,
      resolve({ content }) {
        return content;
      },
    }),
  ],
});

type CreateReservationResult = {
  fieldErrors?: CreateFieldErrors;
  fields?: CreateReservationFields;
  reservation?: reservationSlots & { table: RestTable, slot: Slots };
};

type CancelReservationResult = {
  fieldErrors?: CreateFieldErrors;
  fields?: CreateReservationFields;
  status?: boolean;
};
type CancelReservationFields = { status: boolean };
export const CreateReservationType = t.objectType<CreateReservationFields>({
  name: "CreateReservationFields",
  fields: () => [
    t.field({ name: "table", type: t.NonNull(t.String) }),
    t.field({ name: "slot", type: t.NonNull(t.String) }),
  ],
});

export const CancelReservationType = t.objectType<CancelReservationFields>({
  name: "CreateReservationFields",
  fields: () => [
    t.field({ name: "status", type: t.Boolean }),
  ],
});
export const CreateReservationResultType = t.objectType<CreateReservationResult>({
  name: "CreateReservationResult",
  fields: () => [
    t.field({
      name: "fieldErrors",
      type: CreateFieldErrorsType,
      resolve({ fieldErrors }) {
        return fieldErrors;
      },
    }),
    t.field({
      name: "fields",
      type: CreateReservationType,
      resolve({ fields }) {
        return fields;
      },
    }),
    t.field({
      name: "reservation",
      type: ReservationSlotsType,
      resolve({ reservation }) {
        return reservation;
      },
    }),
  ],
});

export const CancelReservationResultType = t.objectType<CancelReservationResult>({
  name: "CancelReservationResult",
  fields: () => [
    t.field({
      name: "fieldErrors",
      type: CreateFieldErrorsType,
      resolve({ fieldErrors }) {
        return fieldErrors;
      },
    }),
    t.field({
      name: "fields",
      type: CreateReservationType,
      resolve({ fields }) {
        return fields;
      },
    }),
    t.field({
      name: "cancel",
      type: CancelReservationType,
      resolve({ status }) {
        return null;
      },
    }),
  ],
});