import { useState, useRef } from 'react';
// prettier-ignore
import { FormControl, FormLabel, Table, Tbody, TableContainer, Button, Flex } from '@chakra-ui/react';

import Attribute from './Attribute';

const AttributeGroup = ({ label, attributes, setAttributes }) => {
  const tableRef = useRef();

  const handleDelete = deletedId => {
    if (attributes.length === 1) {
      setAttributes([{ id: 1 }]);
    } else {
      const updatedAttributes = attributes.filter(att => att.id !== deletedId);
      setAttributes(updatedAttributes);
    }
  };

  const handleAddMore = () => {
    const nextId = attributes.length + 1;
    setAttributes(prev => [...prev, { id: nextId }]);
  };

  const handleSave = () => {
    console.log('click save');
  };

  console.log('Table Ref: ', tableRef.current);

  return (
    <FormControl>
      <FormLabel as="legend" fontSize="14px" fontWeight="bold" color="#FAFAFA">
        {label}
      </FormLabel>
      <TableContainer mb="4">
        <Table variant="unstyled" ref={tableRef}>
          <Tbody>
            {attributes.map(att => (
              <Attribute
                key={att.id}
                id={att.id}
                setAttributes={setAttributes}
                handleDelete={() => handleDelete(att.id)}
              />
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
