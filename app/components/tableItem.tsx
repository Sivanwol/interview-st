import { Button, ListItem, UnorderedList } from "@chakra-ui/react";
import { Link } from "@remix-run/react";
import { tables } from ".prisma/client";

export function TableItem({
                            item
                          }: {
  item: Pick<tables, "id" | "size" | "type">
}) {
  return (
    <UnorderedList>
      <ListItem>Table Type {item.type}</ListItem>
      <ListItem>Table Size {item.size}</ListItem>
      <Link to={`/tables/${item.id}`}><Button variant="ghost">
        Reservation List
      </Button>
      </Link>
      <Button variant="ghost">
        Make Reservation
      </Button>
    </UnorderedList>);
};