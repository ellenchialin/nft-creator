import { useRef } from 'react';
// prettier-ignore
import { Flex, Text, Icon, VisuallyHidden, Input, FormControl, FormLabel } from '@chakra-ui/react';
import { FaCloudUploadAlt } from 'react-icons/fa';

const BatchUpload = ({ handleChange }) => {
  const fileInputRef = useRef();

  return (
    <FormControl as="fieldset">
      <FormLabel as="legend" fontSize="14px" fontWeight="bold" color="#FAFAFA">
        Upload your NFTs
      </FormLabel>
      <Flex w="md" direction="column" gap="4">
        <Flex
          fontSize="sm"
          direction="column"
          justify="center"
          align="center"
          gap="12px"
          p={16}
          rounded="md"
          color="#617293"
          backgroundColor="#2B3954"
          cursor="pointer"
          onClick={() => fileInputRef.current.click()}
        >
          <Text fontSize="14px">
            File must be .csv file. Click to select file.
          </Text>
          <Icon as={FaCloudUploadAlt} boxSize={8} />

          <VisuallyHidden>
            <Input
              ref={fileInputRef}
              type="file"
              accept=".csv"
              onChange={handleChange}
              isRequired
            />
          </VisuallyHidden>
        </Flex>
      </Flex>
    </FormControl>
  );
};

export default BatchUpload;
