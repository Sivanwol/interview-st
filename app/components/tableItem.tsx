import {
  Button,
  ListItem,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  UnorderedList,
  useDisclosure
} from "@chakra-ui/react";
import { Link, useFetcher } from "@remix-run/react";
import { tables } from ".prisma/client";

export function TableItem({
                            item
                          }: {
  item: Pick<tables, "id" | "size" | "type">
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const fetcher = useFetcher();

  const onClick = () => {
    fetcher.submit({
      id: item.id
    }, {
      action: `/tables/new`,
      method: "post"
    });
    onClose();
  };
  return (<>

    <UnorderedList>
      <ListItem>Table Type {item.type}</ListItem>
      <ListItem>Table Size {item.size}</ListItem>
      <Link to={`/tables/${item.id}`}><Button variant="ghost">
        Reservation List
      </Button>
      </Link>
      <Button variant="ghost" onClick={onOpen}>
        Make Reservation
      </Button>
    </UnorderedList>
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create Reservation</ModalHeader>
        <ModalCloseButton />

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
          <Button variant="ghost" onClick={onClick}>Submit</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  </>);
};