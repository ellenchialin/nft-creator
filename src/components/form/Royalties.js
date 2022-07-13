import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from '@chakra-ui/react';
import { FaPercent } from 'react-icons/fa';

const Royalties = ({ label }) => {
  return (
    <FormControl>
      <FormLabel as="legend" fontSize="14px" fontWeight="bold" color="#FAFAFA">
        {label}
      </FormLabel>
      <InputGroup mb="8px">
        <Input
          type="number"
          placeholder="1"
          backgroundColor="#2B3954"
          color="white"
          border="none"
          py="14px"
          px="16px"
          disabled
        />
        <InputRightElement
          children={<FaPercent color="#D6D9E5" fontSize="12px" />}
        />
      </InputGroup>
      <Text fontSize="12.8px" color="#D0D3DA">
        You will recieve the royalites from any trades in Lootex.
        <br />
        Lootex will not charge any fee when minting.
      </Text>
    </FormControl>
  );
};

export default Royalties;
