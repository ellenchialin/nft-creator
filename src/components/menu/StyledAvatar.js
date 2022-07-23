import React from 'react';
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon';

const StyledAvatar = ({ currentAccount }) => {
  return <Jazzicon diameter={40} seed={jsNumberForAddress(currentAccount)} />;
};

export default React.memo(StyledAvatar);
