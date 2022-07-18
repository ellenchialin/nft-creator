import { Heading } from '@chakra-ui/react';

const PageTitle = ({ title }) => {
  return (
    <Heading color="white" fontSize="41.88px" mb="8">
      {title}
    </Heading>
  );
};

export default PageTitle;
