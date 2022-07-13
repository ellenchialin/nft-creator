import { FormControl, FormLabel, Flex } from '@chakra-ui/react';

import ChainCard from './ChainCard';

const CHAIN_LIST = [
  { id: 1, name: 'Ethereum', image: '/assets/ethereum.png' },
  { id: 4, name: 'Polygon', image: '/assets/polygon-matic.png' },
  { id: 56, name: 'BNB', image: '/assets/binance-coin-bnb.png' },
];

const ChainOptions = ({ chainId }) => {
  return (
    <FormControl as="fieldset">
      <FormLabel as="legend" fontSize="14px" fontWeight="bold" color="#FAFAFA">
        Current chain based on connected wallet
      </FormLabel>
      <Flex gap="16px">
        {CHAIN_LIST.map(chain => (
          <ChainCard key={chain.id} name={chain.name} imageUrl={chain.image} />
        ))}
      </Flex>
    </FormControl>
  );
};

export default ChainOptions;
