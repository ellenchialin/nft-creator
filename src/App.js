import { useState } from 'react';

import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import MainContainer from './components/layout/MainContainer';

function App() {
  const [currentAccount, setCurrentAccount] = useState('');
  const [currentChainId, setCurrentChainId] = useState('');

  const handleConnectWallet = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        alert('Get ＭetaＭask connected first!');
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

  return (
    <>
      <Header
        currentAccount={currentAccount}
        currentChainId={currentChainId}
        handleConnectWallet={handleConnectWallet}
      />
      <MainContainer currentChainId={currentChainId} />
      <Footer />
    </>
  );
}

export default App;
