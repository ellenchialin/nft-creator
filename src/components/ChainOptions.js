import { FormControl, FormLabel, Flex, useToast } from '@chakra-ui/react';

import ChainCard from './ChainCard';
import { networks } from '../utils/helper';

const ChainOptions = ({ currentChainId, setCurrentChainId }) => {
  const toast = useToast();

  const checkConnectedChain = id => {
    const isConnected = id === currentChainId;
    return isConnected;
  };

  const handleChangeChain = async networkName => {
    const { ethereum } = window;

    if (!ethereum) {
      toast({
        description: 'Please connect to wallet first.',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
    }

    const selectedChain = networks.find(chain => chain.name === networkName);

    try {
      await ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [
          {
            ...selectedChain.params,
          },
        ],
      });
    } catch (switchError) {
      toast({
        description: 'Switch network has been cancelled.',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      checkNetwork();
    }
  };

  const checkNetwork = async () => {
    const { ethereum } = window;
    const chainId = await ethereum.request({ method: 'eth_chainId' });

    setCurrentChainId(chainId);
  };

  return (
    <FormControl as="fieldset" mb="8">
      <FormLabel as="legend" fontSize="14px" fontWeight="bold" color="#FAFAFA">
        Current connected network. Click to switch.
      </FormLabel>
      <Flex gap="16px">
        {networks.map(network => (
          <ChainCard
            key={network.name}
            name={network.displayName}
            imageUrl={network.imageUrl}
            isConnected={checkConnectedChain(network.params.chainId)}
            handleChangeChain={() => handleChangeChain(network.name)}
          />
        ))}
      </Flex>
    </FormControl>
  );
};

export default ChainOptions;
