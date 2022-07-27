import React, { useContext } from 'react';
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon';

import { UserContext } from '../../contexts/UserContext';

const SIZE_LIST = {
  large: 40,
  medium: 30,
  small: 20,
};

const StyledAvatar = ({ size }) => {
  const { currentAccount } = useContext(UserContext);
  return (
    <Jazzicon
      diameter={SIZE_LIST[size]}
      seed={jsNumberForAddress(currentAccount)}
    />
  );
};

export default React.memo(StyledAvatar);
