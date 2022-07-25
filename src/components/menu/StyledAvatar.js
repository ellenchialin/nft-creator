import React, { useContext } from 'react';
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon';

import { UserContext } from '../../contexts/UserContext';

const StyledAvatar = () => {
  const { currentAccount } = useContext(UserContext);
  return <Jazzicon diameter={40} seed={jsNumberForAddress(currentAccount)} />;
};

export default React.memo(StyledAvatar);
