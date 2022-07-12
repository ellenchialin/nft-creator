import { Flex, Text, Link, Icon } from '@chakra-ui/react';
import { FaFacebookF, FaMedium, FaTelegramPlane } from 'react-icons/fa';

const FooterSocial = () => {
  return (
    <Flex w="full" direction="column">
      <Text color="white" fontWeight="bold" mb="23px">
        Find us on
      </Text>
      <Flex gap="30px">
        <Link>
          <Icon as={FaFacebookF} boxSize="22px" color="#BEC3CD" />
        </Link>
        <Link>
          <Icon as={FaMedium} boxSize="22px" color="#BEC3CD" />
        </Link>
        <Link>
          <Icon as={FaTelegramPlane} boxSize="22px" color="#BEC3CD" />
        </Link>
      </Flex>
    </Flex>
  );
};

export default FooterSocial;
