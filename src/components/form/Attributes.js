import {
  FormControl,
  FormLabel,
  Table,
  Tbody,
  Tr,
  Td,
  Input,
  TableContainer,
  Button,
} from '@chakra-ui/react';

const Attributes = ({ label }) => {
  return (
    <FormControl>
      <FormLabel as="legend" fontSize="14px" fontWeight="bold" color="#FAFAFA">
        {label}
      </FormLabel>
      <TableContainer mb="4">
        <Table variant="unstyled">
          <Tbody>
            <Tr>
              <Td p="0">
                <Input
                  type="text"
                  placeholder="e.g. “Artist name”"
                  w="295px"
                  backgroundColor="#2B3954"
                  color="white"
                  border="none"
                  py="14px"
                  px="16px"
                />
              </Td>
              <Td p="0">
                <Input
                  type="text"
                  placeholder="e.g. “David”"
                  w="295px"
                  backgroundColor="#2B3954"
                  color="white"
                  border="none"
                  py="14px"
                  px="16px"
                />
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
      <Button>Add more</Button>
    </FormControl>
  );
};

export default Attributes;
