import { Flex, ButtonGroup, Button, Menu, MenuButton } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';

const HeaderNav = () => {
  return (
    <Flex color="#D0D3DA">
      <Button variant="ghost" _hover={{ color: 'white' }}>
        Home
      </Button>
      <Button variant="ghost" _hover={{ color: 'white' }}>
        Drops
      </Button>
      <Menu isLazy>
        <MenuButton
          as={Button}
          variant="ghost"
          rightIcon={<ChevronDownIcon />}
          _hover={{ color: 'white' }}
        >
          Marketplace
        </MenuButton>
      </Menu>
      <ButtonGroup gap="4">
        <Button
          backgroundColor="#475571"
          fontSize="14px"
          _hover={{ color: '#475571', bg: '#D0D3DA' }}
        >
          Create
        </Button>
        <Button
          backgroundColor="#3C53A4"
          fontSize="14px"
          _hover={{ color: '#3C53A4', bg: '#D0D3DA' }}
        >
          Connect Wallet
        </Button>
      </ButtonGroup>
    </Flex>
  );
};

export default HeaderNav;
