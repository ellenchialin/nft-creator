import { FormControl, FormLabel, Flex } from '@chakra-ui/react';

import ChainCard from './ChainCard';
import { networks } from '../utils/helper';

const ChainOptions = ({ currentChainId, setCurrentChainId }) => {
  const checkConnectedChain = id => {
    const isConnected = id === currentChainId;
    return isConnected;
  };

  const handleChangeChain = async networkName => {
    console.log(`Changing to ${networkName}...`);

    const { ethereum } = window;

    const selectedChainId = networks.find(chain => chain.name === networkName)
      .params.chainId;

    try {
      await ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: selectedChainId }],
      });
    } catch (switchError) {
      if (switchError.code === 4902) {
        try {
          await ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                ...networks[networkName].params,
              },
            ],
          });
        } catch (error) {
          alert('User rejected the request.');
        }
      }
    } finally {
      checkNetwork();
    }
  };

  const checkNetwork = async () => {
    const { ethereum } = window;

    if (!ethereum) {
      alert('Please make sure you have ＭetaＭask.');
      return;
    }

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
