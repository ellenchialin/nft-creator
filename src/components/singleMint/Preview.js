import { useContext } from 'react';
import { Flex, Text, Image } from '@chakra-ui/react';

import StyledAvatar from '../shared/StyledAvatar';
import { UserContext } from '../../contexts/UserContext';
import { formatDisplayAccount } from '../../utils/helper';

const Preview = ({ fileUrl, name }) => {
  const { currentAccount } = useContext(UserContext);

  return (
    <Flex direction="column">
      <Text fontSize="14px" fontWeight="bold" color="#FAFAFA" mb="8px">
        Preview
      </Text>

      <Flex
        direction="column"
        w="243px"
        h="435px"
        justify="center"
        align="center"
        p="24px"
        backgroundColor="#2B3954"
        rounded="md"
      >
        {name !== '' ? (
          <Flex direction="column" gap="5px">
            {fileUrl !== '' && (
              <Image
                rounded="md"
                fit="cover"
                src={fileUrl}
                alt="media preview"
                mb="20px"
              />
            )}
            <Text fontSize="14px" color="white" fontWeight="bold">
              {name}
            </Text>
            <Flex align="center" gap="5.25px">
              <StyledAvatar size="small" />
              <Text fontSize="10.5px" color="#D0D3DA">
                {formatDisplayAccount(currentAccount)}
              </Text>
            </Flex>
          </Flex>
        ) : (
          <Text color="#7786A3" fontSize="14px">
            Preview of your new collectible
          </Text>
        )}
      </Flex>
    </Flex>
  );
};

export default Preview;
