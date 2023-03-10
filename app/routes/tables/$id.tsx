import invariant from "tiny-invariant";
import { LoaderArgs } from "@remix-run/server-runtime";
import { Link, useCatch, useFetcher, useLoaderData, useParams } from "@remix-run/react";
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
  let { id } = useParams();
  const data = useLoaderData<typeof loader>();
  const fetcher = useFetcher();
  const reservations = data?.data?.reservations || [];

  const onClick = (id: any, reservation_id: any) => {
    console.log({
      id,
      reservation_id
    })
    fetcher.submit({
      id,
      reservation_id
    }, {
      action: `/tables/cancel`,
      method: "post"
    });
  };
  console.log(JSON.stringify(data));
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

            {reservations.length > 0 ? reservations.map((entity: any) => (
              <Tr>
                <Td>{moment(entity.registerAt).format("MMMM Do YYYY, h:mm:ss a")}</Td>
                <Td>{moment(entity.sitAt).format("MMMM Do YYYY, h:mm:ss a")}</Td>
                <Td>
                  <Button variant="solid" colorScheme="blue" onClick={() => onClick(id, entity.id)}>
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