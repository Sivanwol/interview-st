import { buildGraphQLSchema } from "gqtx";
import { GraphQLError } from "graphql";
import { ErrorCode } from "~/utils/error-codes";
import { prisma } from "~/utils/db.server";
import {
  createUserSession,
  getUser,
  logout,
  requireUserId,
} from "~/utils/session.server";

import { t } from "./type-factory";
import { CreateRestTableQuery, RestTable } from "~/graphql/types";
import { OrderDirectionEnum, OrderRestTableByEnum, RestTableType } from "~/graphql/schema/restTable";

const Query = t.queryType({
  fields: () => [
    t.field({
      name: "table",
      args: { id: t.arg(t.NonNullInput(t.ID)) },
      type: RestTableType,
      async resolve(_root, args) {
        return null;
      },
    }),
    t.field({
      name: "tables",
      args: {
        take: t.arg(t.Int),
        skip: t.arg(t.Int),
        orderBy: t.arg(OrderRestTableByEnum),
        orderDirection: t.arg(OrderDirectionEnum),
      },
      type: t.NonNull(t.List(t.NonNull(RestTableType))),
      async resolve(_root, args) {
        return [];
      },
    }),
  ],
});

const Mutation = t.mutationType({
  fields: () => [
    t.field({
      name: "createReservation",
      args: {
        tableId: t.arg(t.NonNullInput(t.ID)),
      },
      type: CreateRestTableQuery,
      async resolve(_root, args, ctx) {
        return;
      },
    }),
  ],
});

export const schema = buildGraphQLSchema({ query: Query, mutation: Mutation });