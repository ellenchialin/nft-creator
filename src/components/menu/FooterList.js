import { Flex, Text, Link } from '@chakra-ui/react';

const FooterList = ({ title, items }) => {
  return (
    <Flex w="full" direction="column">
      <Text color="white" fontWeight="bold" mb="23px">
        {title}
      </Text>
      <Flex direction="column" gap="14px" w="max-content">
        {items.map(item => (
          <Link
            key={item}
            href="#"
            color="#BEC3CD"
            fontSize="14px"
            fontWeight="bold"
            _hover={{ color: 'white' }}
          >
            {item}
          </Link>
        ))}
      </Flex>
    </Flex>
  );
};

export default FooterList;
