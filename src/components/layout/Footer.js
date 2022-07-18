import { Flex } from '@chakra-ui/react';

import FooterInfo from '../menu/FooterInfo';
import FooterList from '../menu/FooterList';
import FooterSocial from '../menu/FooterSocial';

const Footer = () => {
  return (
    <Flex
      as="footer"
      backgroundColor="#3E4B64"
      w="full"
      bottom="0"
      justify="center"
      align="center"
      py="50px"
      px="115px"
    >
      <Flex w="1210px" direction={{ md: 'column', lg: 'row' }}>
        <FooterInfo />
        <FooterList title="Explore" items={['Home', 'Marketplace', 'Vault']} />
        <FooterList
          title="More Info"
          items={['About Lootex', 'What is NFT?', 'Tutorial']}
        />
        <FooterSocial />
      </Flex>
    </Flex>
  );
};

export default Footer;
