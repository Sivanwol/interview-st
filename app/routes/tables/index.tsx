import { Card, CardBody } from "@chakra-ui/card";
import { Grid, GridItem, Text } from "@chakra-ui/react";
import { Outlet, useLoaderData } from "@remix-run/react";
import { getTablesList } from "~/utils/requests/tables";
import { TableItem } from "~/components/tableItem";

export default function TableIndexPage() {
  const data = useLoaderData<typeof getTablesList>();
  return (
    <Card>
      <CardBody>
        <Text>Table List</Text>
        <Grid templateColumns="repeat(5, 1fr)" gap={6}>
          {(data && !data.error && data.data) && data.data.map((item: any) => (
            <GridItem w="100%" h="50" bg="blue.500">
              <TableItem item={item} />
            </GridItem>))}

        </Grid>
        <div>
          <Outlet />
        </div>
      </CardBody>
    </Card>);
}
