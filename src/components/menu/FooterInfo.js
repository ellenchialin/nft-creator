import { Flex, Text, Link } from '@chakra-ui/react';

const FooterInfo = () => {
  return (
    <Flex w="full" direction="column" mr="180px">
      <Text color="white" fontWeight="bold" mb="23px">
        Select a Language
      </Text>
      <Flex gap="12px" fontSize="12.8px" mb="20px">
        {['English', '日本語', '中文-台灣'].map(lan => (
          <Text
            key={lan}
            color="#BEC3CD"
            cursor="pointer"
            _hover={{ color: 'white' }}
          >
            {lan}
          </Text>
        ))}
      </Flex>
      <Text color="#909CB1" fontSize="12.8px" mb="10px">
        Copyright 2021 Lootex Technology Co., Ltd.
      </Text>
      <Flex gap="12px" mb="20px">
        {['Terms of Use', 'Privacy Policy'].map(term => (
          <Link
            key={term}
            href="#"
            color="#D0D3DA"
            fontSize="14px"
            fontWeight="bold"
            _hover={{ color: 'white' }}
          >
            {term}
          </Link>
        ))}
      </Flex>
      <Text color="#909CB1" fontSize="12.8px">
        Version: v2.15.12
      </Text>
    </Flex>
  );
};

export default FooterInfo;
