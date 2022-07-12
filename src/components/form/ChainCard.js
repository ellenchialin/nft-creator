import { Flex, Text, Image } from '@chakra-ui/react';

const ChainCard = ({ name, imageUrl }) => {
  return (
    <Flex
      w="170px"
      p="16px"
      rounded="md"
      direction="column"
      justify="center"
      align="center"
      border="2px solid #3E4B64"
    >
      <Flex
        w="56px"
        h="56px"
        justify="center"
        align="center"
        backgroundColor="white"
        rounded="full"
        mb="16px"
      >
        <Image src={imageUrl} />
      </Flex>
      <Text color="white">{name}</Text>
      <Text color="#617293">ERC-721</Text>
    </Flex>
  );
};

export default ChainCard;
