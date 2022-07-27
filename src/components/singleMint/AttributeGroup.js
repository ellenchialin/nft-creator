// prettier-ignore
import { FormControl, FormLabel, Table, Tbody, TableContainer, Button, Flex, Tr, Td, Input } from '@chakra-ui/react';
import { v4 as uuidv4 } from 'uuid';

const AttributeGroup = ({ label, attributes, setAttributes }) => {
  const handleChange = (id, event) => {
    const newAttributes = attributes.map(att => {
      if (id === att.id) {
        att[event.target.name] = event.target.value.trim();
      }
      return att;
    });

    setAttributes(newAttributes);
  };

  const handleAddMore = () => {
    setAttributes(prev => [...prev, { id: uuidv4() }]);
  };

  const handleDelete = deletedId => {
    if (attributes.length === 1) {
      setAttributes([{ id: uuidv4(), trait_type: '', value: '' }]);
    } else {
      const newAttributes = attributes.filter(att => att.id !== deletedId);
      setAttributes(newAttributes);
    }
  };

  return (
    <FormControl>
      <FormLabel as="legend" fontSize="14px" fontWeight="bold" color="#FAFAFA">
        {label}
      </FormLabel>
      <TableContainer mb="4">
        <Table
          variant="unstyled"
          css={{ borderCollapse: 'separate', borderSpacing: '0 10px' }}
        >
          <Tbody>
            {attributes.map(att => (
              <Tr key={att.id}>
                <Td p="0">
                  <Input
                    type="text"
                    placeholder="e.g. “Artist name”"
                    name="trait_type"
                    w="260px"
                    backgroundColor="#2B3954"
                    color="white"
                    border="none"
                    py="14px"
                    px="16px"
                    value={att.type}
                    onChange={event => handleChange(att.id, event)}
                  />
                </Td>
                <Td p="0">
                  <Input
                    type="text"
                    placeholder="e.g. “David”"
                    name="value"
                    w="260px"
                    backgroundColor="#2B3954"
                    color="white"
                    border="none"
                    py="14px"
                    px="16px"
                    value={att.value}
                    onChange={event => handleChange(att.id, event)}
                  />
                  <Button
                    variant="unstyled"
                    _hover={{ color: 'white' }}
                    onClick={() => handleDelete(att.id)}
                  >
                    X
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <Flex gap="10px">
        <Button onClick={handleAddMore}>Add more</Button>
      </Flex>
    </FormControl>
  );
};

export default AttributeGroup;
