import { useState } from 'react';
// prettier-ignore
import { Box, Flex, ButtonGroup, Button } from '@chakra-ui/react';
import { FaFileUpload, FaPlus } from 'react-icons/fa';

import PageTitle from '../PageTitle';
import ChainOptions from '../ChainOptions';
import Form from '../singleMint/Form';
import BatchForm from '../batchMint/BatchForm';

const MainContainer = () => {
  const [selectedERCStandard, setSelectedERCStandard] = useState(null);
  const [selectedMintType, setSelectedMintType] = useState(null);

  return (
    <Box
      as="main"
      w="full"
      h="100%"
      backgroundColor="#33415B"
      pt="82px"
      px="24px"
    >
      <Flex
        w="full"
        maxW="1100px"
        direction="column"
        my="0"
        mx="auto"
        pb="100px"
      >
        <PageTitle title="Create collectible" />
        <ChainOptions />

        <ButtonGroup mb="6">
          <Button
            colorScheme="linkedin"
            variant={selectedERCStandard === '721' ? 'solid' : 'outline'}
            onClick={() => setSelectedERCStandard('721')}
          >
            ERC721
          </Button>
          <Button
            colorScheme="linkedin"
            variant={selectedERCStandard === '1155' ? 'solid' : 'outline'}
            onClick={() => setSelectedERCStandard('1155')}
          >
            ERC1155
          </Button>
        </ButtonGroup>

        {selectedERCStandard && (
          <ButtonGroup mb="6">
            <Button
              colorScheme="linkedin"
              variant={selectedMintType === 'batch' ? 'solid' : 'outline'}
              leftIcon={<FaFileUpload />}
              onClick={() => setSelectedMintType('batch')}
            >
              Batch Upload
            </Button>
            <Button
              colorScheme="linkedin"
              variant={selectedMintType === 'single' ? 'solid' : 'outline'}
              leftIcon={<FaPlus />}
              onClick={() => setSelectedMintType('single')}
            >
              Mint
            </Button>
          </ButtonGroup>
        )}

        {selectedMintType === 'batch' && <BatchForm />}
        {selectedMintType === 'single' && (
          <Form selectedERCStandard={selectedERCStandard} />
        )}
      </Flex>
    </Box>
  );
};

export default MainContainer;
