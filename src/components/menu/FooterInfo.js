import { Flex, Text, Link } from '@chakra-ui/react';

const FooterInfo = () => {
  return (
    <Flex w="full" direction="column" mr="200px">
      <Text color="white" fontWeight="bold" mb="23px">
        Select a Language
      </Text>
      <Flex gap="12px" fontSize="12.8px" mb="20px">
        <Text fontWeight="bold" color="#D0D3DA">
          English
        </Text>
        <Text color="#BEC3CD">日本語</Text>
        <Text color="#BEC3CD">中文-台灣</Text>
      </Flex>
      <Text color="#909CB1" fontSize="12.8px" mb="10px">
        Copyright 2021 Lootex Technology Co., Ltd.
      </Text>
      <Flex gap="12px" mb="20px">
        <Link href="#" color="#D0D3DA" fontSize="14px" fontWeight="bold">
          Terms of Use
        </Link>
        <Link href="#" color="#D0D3DA" fontSize="14px" fontWeight="bold">
          Privacy Policy
        </Link>
      </Flex>
      <Text color="#909CB1" fontSize="12.8px">
        Version: v2.15.12
      </Text>
    </Flex>
  );
};

export default FooterInfo;
