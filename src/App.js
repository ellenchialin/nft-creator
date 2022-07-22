import { useState, useEffect } from 'react';
import { useToast } from '@chakra-ui/react';

import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import MainContainer from './components/layout/MainContainer';

function App() {
  const [currentAccount, setCurrentAccount] = useState('');
  const [currentChainId, setCurrentChainId] = useState('');

  const toast = useToast();

  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        toast({
          description: 'Please connect to wallet first.',
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
      } else {
        toast({
          description: 'Please connect to wallet first.',
          status: 'warning',
          duration: 3000,
          isClosable: true,
        });
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

  const handleConnectWallet = async () => {
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
    <>
      <Header
        currentAccount={currentAccount}
        currentChainId={currentChainId}
        handleConnectWallet={handleConnectWallet}
      />
      <MainContainer
        currentChainId={currentChainId}
        setCurrentChainId={setCurrentChainId}
        currentAccount={currentAccount}
      />
      <Footer />
    </>
  );
}

export default App;
