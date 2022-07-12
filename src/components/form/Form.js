import { useState } from 'react';
import { Flex } from '@chakra-ui/react';

import ChainOptions from './ChainOptions';
import FileUpload from './FileUpload';
import FormInput from './FormInput';
import Preview from './Preview';

const Form = () => {
  const [walletChainId, setWalletChainId] = useState(null);
  const [file, setFile] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [seriesName, setSeriesName] = useState('');
  const [attributes, setAttributes] = useState([]);

  return (
    <Flex w="full" justify="space-between" mt="53px">
      <Flex w="600px" direction="column" gap="40px">
        <ChainOptions chainId={walletChainId} />
        <FileUpload />
        <FormInput
          label="Name"
          placeHolder="e.g. “Ready? Go!”"
          value={name}
          setValue={setName}
        />
        <FormInput
          label="Description"
          placeHolder="e.g. “First NFT of Party Animals series”"
          value={description}
          setValue={setDescription}
        />
        <FormInput
          label="Series name (optional)"
          placeHolder="e.g. “Party Animals”"
          value={seriesName}
          setValue={setSeriesName}
        />
      </Flex>

      <Preview image={file} name={name} />
    </Flex>
  );
};

export default Form;
