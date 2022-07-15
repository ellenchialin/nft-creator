import { useState, useEffect } from 'react';

import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import MainContainer from './components/layout/MainContainer';

function App() {
  const [currentAccount, setCurrentAccount] = useState('');
  const [currentChainId, setCurrentChainId] = useState('');

  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert('Please make sure you have ＭetaＭask.');
        return;
      }

      const chainId = await ethereum.request({ method: 'eth_chainId' });
      const rinkebyChainId = '0x4';
      if (chainId !== rinkebyChainId) {
        alert('Please connected to the Rinkeby Test Network.');
        return;
      }

      const accounts = await ethereum.request({ method: 'eth_accounts' });
      if (accounts.length !== 0) {
        const account = accounts[0];
        setCurrentAccount(account);
        setCurrentChainId(chainId);
      } else {
        alert('No authorized account found');
        console.log('No authorized account found');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleConnectWallet = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        alert('Please make sure you have ＭetaＭask.');
        return;
      }

      const accounts = await ethereum.request({
        method: 'eth_requestAccounts',
      });
      const chainId = await ethereum.request({ method: 'eth_chainId' });

      console.log('Connected', accounts[0]);
      console.log('chainId', chainId);
      setCurrentAccount(accounts[0]);
      setCurrentChainId(chainId);
    } catch (error) {
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
        currentAccount={currentAccount}
      />
      <Footer />
    </>
  );
}

export default App;
