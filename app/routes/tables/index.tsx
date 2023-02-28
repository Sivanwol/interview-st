import { Card, CardBody } from "@chakra-ui/card";
import { Grid, GridItem, Text } from "@chakra-ui/react";
import { Outlet, useLoaderData, useRevalidator } from "@remix-run/react";
import { TableItem } from "~/components/tableItem";
import { useEffect, useRef, useState } from "react";
import { getFreeTables } from "~/models/table.server";
import { json } from "@remix-run/node";
import { generateResponse } from "~/utils/common";

export async function loader() {
  try {
    console.log("request");
    const tables = await getFreeTables();
    if (tables)
      return json(generateResponse({ tables }));
    throw json(generateResponse(null, "no data"), 500);
  } catch (e) {
    // @ts-ignore
    throw json(generateResponse(null, e.toString()), 500);
  }
}
export default function TableIndexPage() {
  const isLoaded = useRef(false);
  const revalidator = useRevalidator();
  const data = useLoaderData<typeof loader>();
  const [tableList, setTableList] = useState({ tables: [] });
  useEffect(() => {
    if (data && !data.error) {
      setTableList(data.data);
    }
    if (!isLoaded.current) {
      isLoaded.current = true;
      revalidator.revalidate();
    }
  }, [data, isLoaded, setTableList]);
  return (
    <main className="relative min-h-screen bg-white sm:flex sm:items-center sm:justify-center">
      <Card>
        <CardBody>
          <Text>Table List</Text>
          <Grid templateColumns="repeat(5, 1fr)" gap={6}>

            {(tableList?.tables?.length > 0) && tableList.tables.map((item: any) => (
              <GridItem w="100%" h="150" bg="blue.500" key={item.id}>
                <TableItem item={item} />
              </GridItem>))}

          </Grid>
          <div>
            <Outlet />
          </div>
        </CardBody>
      </Card>
    </main>);
}
