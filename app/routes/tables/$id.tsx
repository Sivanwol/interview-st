import invariant from "tiny-invariant";
import { LoaderArgs } from "@remix-run/server-runtime";
import { Link, useCatch, useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";
import { generateResponse } from "~/utils/common";
import { getReservations } from "~/models/reservations.server";
import { Card, CardBody, CardFooter, CardHeader } from "@chakra-ui/card";
import {
  Button,
  ButtonGroup,
  Center,
  Divider,
  Heading,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr
} from "@chakra-ui/react";
import moment from "moment";

export async function loader({ request, params }: LoaderArgs) {
  invariant(params.id, "id not found");


  try {
    console.log("request");
    const entities = await getReservations(params.id);
    if (entities)
      return json(generateResponse({ reservations: entities }));
    throw json(generateResponse(null, "no data"), 500);
  } catch (e) {
    // @ts-ignore
    throw json(generateResponse(null, e.toString()), 500);

  }
}

export default function ReservationsListPage() {
  const data = useLoaderData<typeof loader>();

  return (
    <Card>
      <CardHeader>
        <Center>
          <Heading size="md">Table Reservations</Heading>
        </Center>
      </CardHeader>
      <CardBody>
      </CardBody>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Register</Th>
              <Th>Sit</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>

            {data?.reservations?.length > 0 ? data?.reservations?.map((entity: any) => (
              <Tr>
                <Td>{moment(entity.registerAt).format("MMMM Do YYYY, h:mm:ss a")}</Td>
                <Td>{moment(entity.sitAt).format("MMMM Do YYYY, h:mm:ss a")}</Td>
                <Td>
                  <Button variant="solid" colorScheme="blue">
                    Cancel
                  </Button>
                </Td>
              </Tr>)) : <Tr><Td colSpan={3}> <Center>No Reservations not found</Center></Td></Tr>}
          </Tbody>
        </Table>
      </TableContainer>
      <Divider h={50} />
      <CardFooter>
        <ButtonGroup spacing="2">
          <Link to={"/tables/"}>
            <Button variant="solid" colorScheme="blue">
              Back
            </Button>
          </Link>
          <Button variant="ghost" colorScheme="blue">
            Cancel All Reservations
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);

  return <div>An unexpected error occurred: {error.message}</div>;
}

export function CatchBoundary() {
  const caught = useCatch();

  if (caught.status === 404) {
    return <div>Table not found</div>;
  }

  throw new Error(`Unexpected caught response with status: ${caught.status}`);
}