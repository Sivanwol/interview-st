import { Card, CardBody } from "@chakra-ui/card";
import { Grid, GridItem, Text } from "@chakra-ui/react";

export default function TableIndexPage() {
  return (
    <Card>
      <CardBody>
        <Text>Table List</Text>
        <Grid templateColumns="repeat(5, 1fr)" gap={6}>
          <GridItem w="100%" h="10" bg="blue.500" />
          <GridItem w="100%" h="10" bg="blue.500" />
          <GridItem w="100%" h="10" bg="blue.500" />
          <GridItem w="100%" h="10" bg="blue.500" />
          <GridItem w="100%" h="10" bg="blue.500" />
        </Grid>
      </CardBody>
    </Card>);
}
