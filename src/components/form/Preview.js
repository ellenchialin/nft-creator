import { Flex, Text } from '@chakra-ui/react';

const Preview = ({ image, name }) => {
  return (
    <Flex direction="column">
      <Text fontSize="14px" fontWeight="bold" color="#FAFAFA" mb="8px">
        Preview
      </Text>

      <Flex
        direction="column"
        w="243px"
        h="435px"
        justify="center"
        align="center"
        p="24px"
        backgroundColor="#2B3954"
        rounded="md"
      >
        {image !== '' || name !== '' ? (
          <Text>preview content</Text>
        ) : (
          <Text color="#7786A3" fontSize="14px">
            Preview of your new collectible
          </Text>
        )}
      </Flex>
    </Flex>
  );
};

export default Preview;
