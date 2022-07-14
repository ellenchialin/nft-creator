import { useState } from 'react';
// prettier-ignore
import { Tr, Td, Input, Button } from '@chakra-ui/react';

const Attribute = ({ id, handleDelete }) => {
  const [typeInput, setTypeInput] = useState('');
  const [valueInput, setValueInput] = useState('');
  const [singleAttribute, setSingleAttribute] = useState({});

  const handleChange = e => {
    const { name, value } = e.target;

    if (name === 'type') {
      setTypeInput(value.trim());
    }
    if (name === 'value') {
      setValueInput(value.trim());
    }

    if (typeInput !== '' && valueInput !== '') {
      console.log('typeInput: ', typeInput);
      setSingleAttribute({ [typeInput]: valueInput });
    }
  };

  console.log('id: ', id);

  return (
    <Tr>
      <Td p="0">
        <Button variant="unstyled" onClick={handleDelete}>
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
          onChange={handleChange}
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
          onChange={handleChange}
        />
      </Td>
    </Tr>
  );
};

export default Attribute;
