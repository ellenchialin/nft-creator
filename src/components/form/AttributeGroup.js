import { useState, useRef } from 'react';
// prettier-ignore
import { FormControl, FormLabel, Table, Tbody, TableContainer, Button, Flex, Tr, Td, Input } from '@chakra-ui/react';
import { v4 as uuidv4 } from 'uuid';

const AttributeGroup = ({ label, attributes, setAttributes }) => {
  const handleChange = (id, event) => {
    // console.log(
    //   'id: ',
    //   id,
    //   'name: ',
    //   event.target.name,
    //   'value: ',
    //   event.target.value
    // );

    const newAttributes = attributes.map(att => {
      if (id === att.id) {
        att[event.target.name] = event.target.value.trim();
      }
      return att;
    });

    setAttributes(newAttributes);
  };

  const handleSave = () => {
    console.log('click save');
  };

  const handleAddMore = () => {
    setAttributes(prev => [...prev, { id: uuidv4() }]);
  };

  const handleDelete = deletedId => {
    if (attributes.length === 1) {
      setAttributes([{ id: uuidv4(), type: '', value: '' }]);
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
        <Table variant="unstyled">
          <Tbody>
            {attributes.map((att, index) => (
              <Tr key={index}>
                <Td p="0">
                  <Button
                    variant="unstyled"
                    onClick={() => handleDelete(att.id)}
                  >
                    X
                  </Button>
                  <Input
                    type="text"
                    placeholder="e.g. “Artist name”"
                    name="type"
                    w="270px"
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
                    w="270px"
                    backgroundColor="#2B3954"
                    color="white"
                    border="none"
                    py="14px"
                    px="16px"
                    value={att.value}
                    onChange={event => handleChange(att.id, event)}
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <Flex gap="10px">
        <Button onClick={handleAddMore}>Add more</Button>
        <Button onClick={handleSave}>Save</Button>
      </Flex>
    </FormControl>
  );
};

export default AttributeGroup;
