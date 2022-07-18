import {
  Flex,
  ButtonGroup,
  Button,
  Menu,
  MenuButton,
  Text,
  Avatar,
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';

import { helper } from '../../utils/helper';

const CHAINS_LIST = [
  { id: '0x1', name: 'ETH Mainnet' },
  { id: '0x137', name: 'Polygon' },
  { id: '0x56', name: 'BNB' },
  { id: '0x4', name: 'Rinkeby' },
];

const HeaderNav = ({ currentAccount, currentChainId, handleConnectWallet }) => {
  const displayChain = chainId => {
    const chain = CHAINS_LIST.filter(chain => chain.id === chainId);
    return chain[0].name;
  };

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
          <Flex w="400px" align="center" justify="space-between">
            <Flex gap="2">
              <Avatar size="md" />
              <Flex w="200px" direction="column">
                <Text fontWeight="bold" color="white">
                  MetaMask (Injected)
                </Text>
                <Text>{helper.formatDisplayAccount(currentAccount)}</Text>
              </Flex>
            </Flex>
            <Text fontSize="12.8px" color="#617293">
              {displayChain(currentChainId)}
            </Text>
          </Flex>
        )}
      </ButtonGroup>
    </Flex>
  );
};

export default HeaderNav;
