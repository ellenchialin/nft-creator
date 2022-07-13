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
      h="248px"
      position="fixed"
      zIndex={2}
      bottom="0"
      justify="center"
      align="center"
      px="115px"
    >
      <Flex w="1210px">
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
