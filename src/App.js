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
      const accounts = await ethereum.request({ method: 'eth_accounts' });

      if (accounts.length !== 0) {
        const account = accounts[0];
        setCurrentAccount(account);
        setCurrentChainId(chainId);
      } else {
        alert('Please connect to wallet.');
        console.log('Please connect to wallet.');
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

      console.log('Connected to account: ', accounts[0]);

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
        setCurrentChainId={setCurrentChainId}
        currentAccount={currentAccount}
      />
      <Footer />
    </>
  );
}

export default App;
