// prettier-ignore
import { Flex, ButtonGroup, Button, Menu, MenuButton, Text, Avatar } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';

import { formatDisplayAccount } from '../../utils/helper';

const HeaderNav = ({ currentAccount, handleConnectWallet }) => {
  return (
    <Flex as="nav" align="center" color="#D0D3DA">
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
      <ButtonGroup alignItems="center" gap="4">
        <Button
          backgroundColor="#475571"
          fontSize="14px"
          _hover={{ color: '#475571', bg: '#D0D3DA' }}
        >
          Create
        </Button>
        {currentAccount === '' ? (
          <Button
            backgroundColor="#3C53A4"
            fontSize="14px"
            _hover={{ color: '#3C53A4', bg: '#D0D3DA' }}
            onClick={handleConnectWallet}
          >
            Connect Wallet
          </Button>
        ) : (
          <Flex w="300px" align="center" justify="center" gap="4">
            <Avatar size="md" />
            <Flex w="200px" direction="column">
              <Text fontWeight="bold" color="white">
                MetaMask (Injected)
              </Text>
              <Text>{formatDisplayAccount(currentAccount)}</Text>
            </Flex>
          </Flex>
        )}
      </ButtonGroup>
    </Flex>
  );
};

export default HeaderNav;
