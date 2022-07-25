import { useState, useContext } from 'react';

import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import MainContainer from './components/layout/MainContainer';
import { UserContext } from './contexts/UserContext';

function App() {
  const [currentChainId, setCurrentChainId] = useState('');
  const { currentAccount } = useContext(UserContext);

  return (
    <>
      <Header currentChainId={currentChainId} />
      <MainContainer
        currentChainId={currentChainId}
        setCurrentChainId={setCurrentChainId}
      />
      <Footer />
    </>
  );
}

export default App;
