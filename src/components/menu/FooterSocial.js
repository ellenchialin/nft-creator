import { Flex, Text, Link, Icon } from '@chakra-ui/react';
import { FaFacebookF, FaMedium, FaTelegramPlane } from 'react-icons/fa';

const SOCIAL_CHANNELS = [
  { name: 'faceboook', icon: FaFacebookF },
  { name: 'medium', icon: FaMedium },
  { name: 'telegram', icon: FaTelegramPlane },
];

const FooterSocial = () => {
  return (
    <Flex w="full" direction="column">
      <Text color="white" fontWeight="bold" mb="23px">
        Find us on
      </Text>
      <Flex gap="30px">
        {SOCIAL_CHANNELS.map(channel => (
          <Link key={channel.name}>
            <Icon
              as={channel.icon}
              boxSize="22px"
              color="#BEC3CD"
              _hover={{ color: 'white' }}
            />
          </Link>
        ))}
      </Flex>
    </Flex>
  );
};

export default FooterSocial;
