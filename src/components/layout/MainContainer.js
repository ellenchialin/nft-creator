import { Box, Flex } from '@chakra-ui/react';

import PageTitle from '../PageTitle';
import Form from '../form/Form';

const MainContainer = () => {
  return (
    <Box
      as="main"
      w="full"
      h="100%"
      backgroundColor="#33415B"
      pt="82px"
      px="24px"
    >
      <Flex
        w="full"
        maxW="1100px"
        direction="column"
        my="0"
        mx="auto"
        pb="300px"
      >
        <PageTitle title="Create collectible" />
        <Form />
      </Flex>
    </Box>
  );
};

export default MainContainer;
