import { FormControl, FormLabel, Flex } from '@chakra-ui/react';

import ChainCard from './ChainCard';

const CHAIN_LIST = [
  { id: '0x1', name: 'Ethereum', image: '/assets/ethereum.png' },
  { id: '0x137', name: 'Polygon', image: '/assets/polygon-matic.png' },
  { id: '0x56', name: 'BNB', image: '/assets/binance-coin-bnb.png' },
];

const ChainOptions = ({ currentChainId }) => {
  const checkConnectedChain = id => {
    const isConnected = id === currentChainId;
    return isConnected;
  };

  return (
    <FormControl as="fieldset" mb="8">
      <FormLabel as="legend" fontSize="14px" fontWeight="bold" color="#FAFAFA">
        Current chain based on connected wallet
      </FormLabel>
      <Flex gap="16px">
        {CHAIN_LIST.map(chain => (
          <ChainCard
            key={chain.id}
            name={chain.name}
            imageUrl={chain.image}
            isConnected={checkConnectedChain(chain.id)}
          />
        ))}
      </Flex>
    </FormControl>
  );
};

export default ChainOptions;
