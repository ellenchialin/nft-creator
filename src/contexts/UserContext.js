import { useState, useEffect, createContext } from 'react';
import { useToast } from '@chakra-ui/react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState(null);
  const [currentChainId, setCurrentChainId] = useState(null);

  const toast = useToast();

  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        toast({
          description: 'Please install MetaMask first.',
          status: 'warning',
          duration: 3000,
          isClosable: true,
        });
        return;
      }

      const chainId = await ethereum.request({ method: 'eth_chainId' });
      const accounts = await ethereum.request({ method: 'eth_accounts' });

      if (accounts.length !== 0) {
        const account = accounts[0];
        setCurrentAccount(account);
        setCurrentChainId(chainId);
      }
    } catch (error) {
      toast({
        description: 'Something went wrong. Please try again.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const connectWallet = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        toast({
          description: 'No crypto wallet found.',
          status: 'warning',
          duration: 3000,
          isClosable: true,
        });
        return;
      }

      const accounts = await ethereum.request({
        method: 'eth_requestAccounts',
      });
      const chainId = await ethereum.request({ method: 'eth_chainId' });

      console.log('Connected to account: ', accounts[0]);

      setCurrentAccount(accounts[0]);
      setCurrentChainId(chainId);
    } catch (error) {
      if (error.code === 4001) {
        toast({
          description: 'Connect to MetaMask has been cancelled.',
          status: 'warning',
          duration: 3000,
          isClosable: true,
        });
      }
      console.log(error);
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  return (
    <UserContext.Provider
      value={{
        currentAccount,
        connectWallet,
        currentChainId,
        setCurrentChainId,
        checkIfWalletIsConnected,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
