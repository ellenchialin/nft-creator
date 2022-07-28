import { FormControl, FormLabel, Input } from '@chakra-ui/react';

const TextInput = ({
  label,
  placeHolder,
  name,
  value,
  setValue,
  isRequired,
}) => {
  return (
    <FormControl isRequired={isRequired}>
      <FormLabel as="legend" fontSize="14px" fontWeight="bold" color="#FAFAFA">
        {label}
      </FormLabel>
      <Input
        type="text"
        name={name}
        placeholder={placeHolder}
        backgroundColor="#2B3954"
        color="white"
        border="none"
        py="14px"
        px="16px"
        value={value}
        onChange={e => setValue(e.target.value)}
      />
    </FormControl>
  );
};

export default TextInput;
