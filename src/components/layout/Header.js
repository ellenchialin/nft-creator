import { Box, Flex, Image } from '@chakra-ui/react';

import HeaderNav from '../menu/HeaderNav';

const Header = () => {
  return (
    <Flex
      backgroundColor="rgba(51, 65, 91, 0.96)"
      boxShadow="md"
      w="full"
      h="80px"
      px="14px"
      justify="space-between"
      align="center"
    >
      <Box w="210px">
        <Image src="assets/LOOTEX.png" alt="Lootex logo" />
      </Box>

      <HeaderNav />
    </Flex>
  );
};

export default Header;
